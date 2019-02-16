import { Request, Response } from "express";
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as keys from '../config/keys.ts';

// Verification Token
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';


//import passport from 'passport';
// Load Input Validation
import * as validateRegisterInput from "../validation/register";
import * as validateLoginInput from "../validation/login";
import * as validateProfileInput from "../validation/profile";
import * as validateEducationInput from "../validation/education";
import * as validateExperienceInput from "../validation/experience";
import * as validateResend from "../validation/resend";

// Load User model
import * as User from '../models/User';
// Load Profile Model
const Profile = require('../models/Profile');
const Verify = require('../models/Verify');
const Token = require('../models/Token');

export class AuthController {

  public addNewUser(req: Request, res: Response) {
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
        } else if (user.email && user.email === req.body.email) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        }
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
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
            if (err) throw err;
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

                verify.save()
                  .then((created) => {
                    token.save()
                      .then(()=>{
                        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: "rizwanshaikh", pass: "Hello12345" } });
                        var mailOptions = { from: 'no-reply@localhost.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + token.token + '.\n' };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) { return res.status(500).send({ msg: err.message }); }
                            return res.status(200).send('A verification email has been sent to ' + user.email + '.');
                        });
                      })
                      .catch((err)=>{
                        console.log("Error from token", err);
                  });

                  
                  });

                // return res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });

  }

  public loginUser(req: Request, res: Response) {
    const { errors, isValid } = validateLoginInput(req.body);

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
          return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
        }
        

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //User Matched
              const payload = { id: user.id, fullname: user.fullname, avatar: user.avatar, username: user.username }
              //Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  Verify.findOne({ user: user.id })
                    .then((data) => { 
                      return res.json({
                        success: true,
                        profilecreated: data.profilecreated,
                        token: "Bearer " + token
                      });
                    } );
                })
            } else {
              errors.password = 'Password incorrect';
              return res.status(404).json(errors);
            }
          })
      })
  }

  public current(req: Request, res: Response) {
    res.json({
      id: req.user.id,
      fullname: req.user.fullname,
      username: req.user.username,
      email: req.user.email
    });
  }

  // @route   GET api/profile
  // @desc    Get current users profile
  // @access  Private

  public currentUserProfile(req: Request, res: Response) {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['fullname', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
  // @route   GET api/profile/all
  // @desc    Get all profiles
  // @access  Public

  public all(req: Request, res: Response) {
    const errors = {};

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

  public username(req: Request, res: Response) {
    const errors = {};

    Profile.findOne({ username: req.params.username })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }

  // @route   GET api/profile/user/:user_id
  // @desc    Get profile by user ID
  // @access  Public

  public user(req: Request, res: Response) {
    {
      const errors = {};

      Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
          }

          res.json(profile);
        })
        .catch(err =>
          res.status(404).json({ profile: 'There is no profile for this user' })
        );
    }
  }
  // education

  public experience(req: Request, res: Response) {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
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

      profile.save().then(profile => res.json(profile));
    });
  }
  // education

  public education(req: Request, res: Response) {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
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

      profile.save().then(profile => res.json(profile));
    });
  }

  public confirmationPost(req: Request, res: Response) {
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
        // if (!user.isVerified) {
        //   return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
        // }
        

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //User Matched
              const payload = { id: user.id, fullname: user.fullname, avatar: user.avatar, username: user.username }
              //Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, tokenjwt) => {
                  Verify.findOne({ user: user.id })
                  .then((data) => { 

                    Token.findOne({ token: req.params.token }, function (err, token) {
                      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
              
                      // If we found a token, find a matching user
                      User.findOne({ _id: token.user, email: req.body.email }, function (err, user) {
                          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
              
                          // Verify and save the user
                          user.isVerified = true;
                          user.save(function (err) {
                              if (err) { return res.status(500).send({ msg: err.message }); }
                              res.status(200).send("The account has been verified. Please log in.");
                          });
                      });
                  });
                    // return res.json({
                    //   success: true,
                    //   profilecreated: data.profilecreated,
                    //   token: "Bearer " + tokenjwt
                    // });
                  });
                })
            } else {
              errors.password = 'Password incorrect';
              return res.status(404).json(errors);
            }
          })
      })
  }

  public resendTokenPost(req: Request, res: Response) {

    const { errors } = validateLoginInput(req.body);
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ user: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'rizwanshaikh', pass: 'Hello12345' } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
  }


  public profilecreated(req: Request, res: Response) {

    Verify.findOne({ user: req.user.id })
      .then((data) => res.json(data));
  }

  // createprofile

  public createprofile(req: Request, res: Response) {
    const { errors, isValid } = validateProfileInput(req.body);
    const profileFields = {};

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if username exists
        //Profile.findOne({ username: profileFields.username }).then(profile => {
        //  if (profile) {
        //    errors.username = 'That username already exists';
        //    res.status(400).json(errors);
        //  }

        // Save Profile
        new Profile(profileFields).save().then(profile => {

          if (profile) {
            Verify.findOneAndUpdate(
              { user: req.user.id },
              { $set: { profilecreated: true } },
              { new: true }
            ).then(success => res.json(profile));
          }
        });
        //});
      }
    });
  }
}