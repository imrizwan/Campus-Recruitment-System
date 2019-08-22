"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Verification Token
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// Load Input Validation
const validateRegisterInput = require("../validation/register");
const isEmpty = require("../validation/is-empty");
const validateLoginInput = require("../validation/login");
const validateProfileInput = require("../validation/profile");
const validateEducationInput = require("../validation/education");
const validateExperienceInput = require("../validation/experience");
const validateResend = require("../validation/resend");
const validateConfirmToken = require("../validation/validateConfirmToken");
const validateChangePassword = require("../validation/changepassword");
// Load User model
const User = require("../models/User");
// Load Profile Model
const Profile = require('../models/Profile');
// Load User Profile Verification Model
const Verify = require('../models/Verify');
// Load Verification Token Model
const Token = require('../models/Token');
// Load Password Token Model
const PasswordToken = require('../models/PasswordToken');
class AuthController {
    addNewUser(req, res) {
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        }).then(user => {
            if (user) {
                if (user.username && user.username === req.body.username) {
                    errors.username = 'Username already exists';
                    return res.status(400).json(errors);
                }
                else if (user.email && user.email === req.body.email) {
                    errors.email = 'Email already exists';
                    return res.status(400).json(errors);
                }
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm' // Default
                });
                const newUser = new User({
                    username: req.body.username,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    userType: req.body.userType,
                    avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                            const verify = new Verify({
                                user: user._id,
                                profilecreated: false
                            });
                            // Create a verification token for this user
                            var token = new Token({ user: user._id, token: crypto.randomBytes(16).toString('hex') });
                            token.save()
                                .then(() => {
                                var transporter = nodemailer.createTransport({ service: keys.service, auth: { user: keys.user, pass: keys.pass } });
                                var mailOptions = {
                                    from: 'no-reply@rizwanshaikh.me',
                                    to: user.email,
                                    subject: 'Account Verification Token',
                                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/confirmation\/' + token.token + '\n'
                                };
                                transporter.sendMail(mailOptions, function (err) {
                                    if (err) {
                                        return res.status(500).send({ msg: err.message });
                                    }
                                    //profilecreated verification
                                    verify.save()
                                        .then((done) => console.log(done))
                                        .catch((err) => console.log("Error from Verify: ", err));
                                    return res.status(200).send({ success: 'A verification email has been sent to ' + user.email + '.' });
                                });
                            })
                                .catch((err) => {
                                console.log("Error from token.save", err);
                            });
                            // return res.json(user);
                        })
                            .catch((err) => console.log("Error from addnewuser", err));
                    });
                });
            }
        });
    }
    loginUser(req, res) {
        const { errors } = validateLoginInput(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const userType = req.body.userType;
        User.findOne({ email })
            .then((user) => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            if (!userType) {
                errors.userType = 'User type not found';
                return res.status(404).json(errors);
            }
            if (user.userType !== userType) {
                errors.userType = 'User type does not match';
                return res.status(400).json(errors);
            }
            // Make sure the user has been verified
            if (!user.isVerified) {
                errors.email = "Your email has not been verified.";
                errors.resend = "Resend Verification Email";
                return res.status(401).send(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    const payload = { id: user.id, fullname: user.fullname, avatar: user.avatar, username: user.username, userType: user.userType };
                    //Sign Token
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        Verify.findOne({ user: user.id })
                            .then((data) => {
                            return res.json({
                                success: true,
                                profilecreated: data.profilecreated,
                                token: "Bearer " + token
                            });
                        })
                            .catch((err) => console.log("Error from loginUser", err));
                    });
                }
                else {
                    errors.password = 'Password incorrect';
                    return res.status(404).json(errors);
                }
            })
                .catch((err) => console.log("Error from loginUser", err));
        });
    }
    current(req, res) {
        res.json({
            id: req.user.id,
            fullname: req.user.fullname,
            username: req.user.username,
            email: req.user.email
        });
    }
    // @route   GET api/applyforvaccancy
    // @desc    student apply for vaccancy
    // @access  Private
    applyForVaccancy(req, res) {
        const errors = {
            applyforvaccancy: ""
        };
        let { companyid, vaccancyid } = req.body;
        if (!companyid || !vaccancyid) {
            errors.applyforvaccancy = 'Something went wrong';
            return res.status(404).json(errors);
        }
        Verify.findOne({ applied: { $elemMatch: { key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}` } } })
            .then((data) => {
            if (!isEmpty(data)) {
                if (!isEmpty(data.applied)) {
                    errors.applyforvaccancy = 'You have already applied';
                    return res.status(500).json(errors);
                }
            }
            if (isEmpty(data)) {
                Verify.findOne({ user: req.user.id })
                    .then((data) => {
                    // Add to exp array
                    data.applied.unshift({ key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}` });
                    // Add to company profilecreated applied array
                    Verify.findOne({ user: req.body.companyid })
                        .then((company) => {
                        if (!company) {
                            errors.applyforvaccancy = 'Company does not exist';
                            return res.status(404).json(errors);
                        }
                        company.applied.unshift({ key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}` });
                    })
                        .catch((err) => console.log("err from applyforVaccancy Company", err));
                    data.save()
                        .then(profile => res.json(profile))
                        .catch((err) => console.log("Error from applyForVaccancy2", err));
                })
                    .catch((err) => {
                    console.log("error from applyForVaccancy3", err);
                });
            }
        })
            .catch((err) => {
            console.log("error from applyForVaccancy2", err);
        });
    }
    // @route   GET api/profile
    // @desc    Get current users profile
    // @access  Private
    currentUserProfile(req, res) {
        const errors = {
            noprofile: ""
        };
        Profile.findOne({ user: req.user.id })
            .populate('user', ['fullname', 'avatar'])
            .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
            .catch((err) => console.log("Error from currentUserProfile", err));
    }
    // @route   GET api/profile/all
    // @desc    Get all profiles
    // @access  Public
    all(req, res) {
        const errors = {
            noprofile: ""
        };
        Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
            .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
    }
    // @route   GET api/profile/username/:username
    // @desc    Get profile by username
    // @access  Public
    username(req, res) {
        const errors = {
            noprofile: ""
        };
        Profile.findOne({ username: req.params.username })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
            .catch((err) => console.log("Error from username", err));
    }
    // @route   GET api/profile/user/:user_id
    // @desc    Get profile by user ID
    // @access  Public
    user(req, res) {
        {
            const errors = {
                noprofile: ""
            };
            Profile.findOne({ user: req.params.user_id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    res.status(404).json(errors);
                }
                res.json(profile);
            })
                .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
        }
    }
    // education
    experience(req, res) {
        const { errors, isValid } = validateExperienceInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        Profile.findOne({ user: req.user.id }).then(profile => {
            const newExp = {
                user: req.user.id,
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            // Add to exp array
            profile.experience.unshift(newExp);
            profile.save()
                .then(profile => res.json(profile))
                .catch((err) => console.log("Error from experience", err));
        })
            .catch((err) => console.log("Error from experience", err));
    }
    // education
    education(req, res) {
        const { errors, isValid } = validateEducationInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
                user: req.user.id,
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            // Add to exp array
            profile.education.unshift(newEdu);
            profile.save()
                .then(profile => res.json(profile))
                .catch((err) => console.log("Error from education", err));
        })
            .catch((err) => console.log("Error from education", err));
    }
    confirmationPost(req, res) {
        const { errors } = validateConfirmToken(req.body);
        const email = req.body.email;
        const password = req.body.password;
        // const userType = req.body.userType;
        User.findOne({ email })
            .then((user) => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                if (isMatch) {
                    Token.findOne({ token: req.params.token }, function (err, token) {
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }
                        if (!token)
                            return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
                        // If we found a token, find a matching user
                        User.findOne({ _id: token.user, email: req.body.email }, function (err, user) {
                            if (err) {
                                return res.status(500).send({ msg: err.message });
                            }
                            if (!user)
                                return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                            if (user.isVerified)
                                return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
                            // Verify and save the user
                            user.isVerified = true;
                            user.save(function (err) {
                                if (err) {
                                    return res.status(500).send({ msg: err.message });
                                }
                                return res.status(200).send({ type: 'verified', success: "The account has been verified." });
                            });
                        });
                    });
                }
                else {
                    errors.password = 'Password incorrect';
                    return res.status(404).json(errors);
                }
            })
                .catch((err) => console.log("Error from confirmationPost", err));
        })
            .catch((err) => console.log("Error from confirmationPost", err));
    }
    resendTokenPost(req, res) {
        const { errors } = validateResend(req.body);
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            if (!user)
                return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
            if (user.isVerified)
                return res.status(400).send({ msg: 'This account has already been verified.' });
            // Create a verification token, save it, and send email
            var token = new Token({ user: user._id, token: crypto.randomBytes(16).toString('hex') });
            // Save the token
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                // Send the email
                var transporter = nodemailer.createTransport({ service: keys.service, auth: { user: keys.user, pass: keys.pass } });
                var mailOptions = {
                    from: 'no-reply@localhost.com',
                    to: user.email,
                    subject: 'Account Verification Token',
                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/confirmation\/' + token.token + '\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }
                    res.status(200).send({ success: 'A verification email has been sent to ' + user.email + '.' });
                });
            });
        });
    }
    changePassword(req, res) {
        const { errors } = validateChangePassword(req.body);
        let password = req.body.password;
        // const password2 = req.body.password2;
        console.log(req.body);
        PasswordToken.findOne({ token: req.body.token })
            .then((tokenFound) => {
            if (!tokenFound) {
                errors.tokenerror = 'Request is invalid';
                return res.status(404).json(errors);
            }
            if (tokenFound.passwordchanged) {
                errors.tokenerror = 'This request has already been used';
                return res.status(404).json(errors);
            }
            // if token found then search user
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    password = hash;
                    User.findOneAndUpdate({ _id: tokenFound.user }, { $set: { password } }, { new: true })
                        .then((user) => {
                        if (!user) {
                            errors.tokenerror = 'User not found';
                            return res.status(404).json(errors);
                        }
                        // if user found then change his password
                        PasswordToken.findOneAndUpdate({ token: req.body.token }, { passwordchanged: true }, { token: req.body.token })
                            .then((done) => console.log(done))
                            .catch((err) => console.log("Error from Password Change Update: ", err));
                        return res.status(200).json({ success: "Password Changed Successfully" });
                    })
                        .catch((err) => console.log("Error from Password Update: ", err));
                });
            });
        })
            .catch((err) => console.log("Error from Password Token: ", err));
    }
    forgotPasswordEmail(req, res) {
        const { errors } = validateResend(req.body);
        User.findOne({ email: req.body.email }, function (err, user) {
            if (!user)
                return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
            // if (!user.isVerified) res.status(400).send({ msg: 'This account has not been verified.' });
            // Create a verification token, save it, and send email
            var passwordtoken = new PasswordToken({ user: user._id, token: crypto.randomBytes(16).toString('hex') });
            // Save the token
            passwordtoken.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                // Send the email
                var transporter = nodemailer.createTransport({ service: keys.service, auth: { user: keys.user, pass: keys.pass } });
                var mailOptions = {
                    from: 'no-reply@localhost.com',
                    to: user.email,
                    subject: 'Change Password',
                    text: 'Hello,\n\n' + 'Please change your account password by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/changepassword\/' + passwordtoken.token + '.\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message });
                    }
                    res.status(200).send({ success: 'An email has been sent to ' + user.email + '.' });
                });
            });
        });
    }
    profilecreated(req, res) {
        Verify.findOne({ user: req.user.id })
            .then((data) => res.json(data))
            .catch((err) => console.log("Error from create Profile: ", err));
    }
    // createprofile
    createprofile(req, res) {
        const { errors, isValid } = validateProfileInput(req.body);
        const profileFields = {
            user: "",
            company: "",
            website: "",
            location: "",
            bio: "",
            status: "",
            batch: "",
            githubusername: "",
            skills: "",
            social: {
                youtube: "",
                twitter: "",
                facebook: "",
                linkedin: "",
                instagram: "",
            }
        };
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        // Get fields
        profileFields.user = req.user.id;
        // if (req.body.username) profileFields.username = req.body.username;
        if (req.body.company)
            profileFields.company = req.body.company;
        if (req.body.website)
            profileFields.website = req.body.website;
        if (req.body.location)
            profileFields.location = req.body.location;
        if (req.body.bio)
            profileFields.bio = req.body.bio;
        if (req.body.status)
            profileFields.status = req.body.status;
        if (req.body.batch)
            profileFields.batch = req.body.batch;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        // Skills - Spilt into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }
        // Social
        if (req.body.youtube)
            profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter)
            profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook)
            profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin)
            profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram)
            profileFields.social.instagram = req.body.instagram;
        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile))
                    .catch((err) => console.log("Error from create Profile 1: ", err));
            }
            else {
                // Create
                // Save Profile
                new Profile(profileFields).save().then(profile => {
                    if (profile) {
                        Verify.findOneAndUpdate({ user: req.user.id }, { $set: { profilecreated: true } }, { new: true }).then(success => res.json(profile))
                            .catch((err) => console.log("Error from verify: ", err));
                    }
                })
                    .catch((err) => console.log("Error from create Profile 2: ", err));
            }
        })
            .catch((err) => console.log("Error from create Profile 3: ", err));
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map