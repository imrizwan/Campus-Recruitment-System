"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateCompanyProfileInput = require("../validation/companyprofile");
const validateCompanyProjectInput = require("../validation/companyproject");
const validateCompanyVaccancyInput = require("../validation/companyvaccancy");
// Load User model
const CompanyProfile = require("../models/CompanyProfile");
const Profile = require("../models/Profile");
const Verify = require("../models/Verify");
const Selected = require("../models/Selected");
const isEmpty = require("../validation/is-empty");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const User = require("../models/User");
class CompanyAuthController {
    shortlistCandidate(req, res) {
        const { vaccancyid, studentMail, isChecked } = req.body;
        const errors = {
            shortlistcandidate: ""
        };
        if (!vaccancyid || !studentMail) {
            errors.shortlistcandidate = "Something went wrong";
            return res.status(404).json(errors);
        }
        Selected.findOne({ vaccancyid })
            .then((data) => {
            if (!isEmpty(data)) {
                // find studentMail in selected array
                // if studentMail found
                if (data.selected.includes(studentMail)) {
                    if (isChecked) {
                        console.log("Do nothing");
                        let valueToRemove = studentMail;
                        data.selected = data.selected.filter(item => item !== valueToRemove);
                        data
                            .save()
                            .then(deleted => res.status(200).json({ msg: "deleted" }))
                            .catch(err => console.log("Error from shortlistCandidate", err));
                    }
                    else {
                        // Delete Item
                        let valueToRemove = studentMail;
                        data.selected = data.selected.filter(item => item !== valueToRemove);
                        data
                            .save()
                            .then(deleted => res.status(200).json({ msg: "deleted" }))
                            .catch(err => console.log("Error from shortlistCandidate", err));
                    }
                }
                else {
                    // if studentid not found
                    // add studentid in selected array
                    data.selected.push(studentMail);
                    data
                        .save()
                        .then(profile => res.status(200).json({ msg: "added" }))
                        .catch(err => console.log("Error from shortlistCandidate", err));
                }
            }
            else {
                let selected = [studentMail];
                new Selected({
                    vaccancyid,
                    selected
                })
                    .save()
                    .then(student => res.status(200).json({ msg: "added" }))
                    .catch(err => console.log("Error from shortlistCandidate: ", err));
            }
        });
    }
    getShortlisted(req, res) {
        const { vaccancyid } = req.params;
        const errors = {
            getshortlisted: ""
        };
        if (isEmpty(vaccancyid)) {
            errors.getshortlisted = "Something went wrong";
            return res.status(500).json(errors);
        }
        Selected.findOne({ vaccancyid })
            .then((data) => res.status(200).json(data))
            .catch(err => res.status(404).json(err));
    }
    appointmentLetter(req, res) {
        const errors = {
            appointmentletter: ""
        };
        if (isEmpty(req.body.date) ||
            isEmpty(req.body.timing) ||
            isEmpty(req.body.info) ||
            isEmpty(req.body.studentemail) ||
            isEmpty(req.body.position) ||
            isEmpty(req.body.company) ||
            isEmpty(req.body.companyemail)) {
            errors.appointmentletter = "Something went wrong";
            return res.status(400).json(errors);
        }
        // Send the email
        var transporter = nodemailer.createTransport({
            service: keys.service,
            auth: { user: keys.user, pass: keys.pass }
        });
        var mailOptions = {
            from: "no-reply@localhost.com",
            to: req.body.studentemail,
            subject: "Appointment Letter",
            text: "Congratulations,\n\n" +
                "You have been selected for " +
                `${req.body.position} in ${req.body.company}` +
                "\n\nDetails: \n\n" +
                "Company Email: " +
                `${req.body.companyemail}\n\n` +
                "Office Timing: " +
                `${req.body.timing}\n\n` +
                "Starts from: " +
                `${req.body.date}\n\n` +
                `${req.body.info}\n\n` +
                `Thanks`
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            res.status(200).send({
                success: "An email has been sent to " + req.body.studentemail + "."
            });
        });
    }
    selectionEmail(req, res) {
        console.log(req.body);
        const errors = {
            selectionemail: ""
        };
        if (isEmpty(req.body.date) ||
            isEmpty(req.body.timing) ||
            isEmpty(req.body.info) ||
            isEmpty(req.body.studentemail) ||
            isEmpty(req.body.position) ||
            isEmpty(req.body.company) ||
            isEmpty(req.body.companyemail)) {
            errors.selectionemail = "Something went wrong";
            return res.status(400).json(errors);
        }
        // Send the email
        var transporter = nodemailer.createTransport({
            service: keys.service,
            auth: { user: keys.user, pass: keys.pass }
        });
        var mailOptions = {
            from: "no-reply@localhost.com",
            to: req.body.studentemail,
            subject: "Selection Email",
            text: "Congratulations,\n\n" +
                "You have been shortlisted for " +
                `${req.body.position} in ${req.body.company}` +
                "\n\nDetails: \n\n" +
                "Company Email: " +
                `${req.body.companyemail}\n\n` +
                "Interview Timing: " +
                `${req.body.timing}\n\n` +
                "Interview Date: " +
                `${req.body.date}\n\n` +
                `${req.body.info}\n\n` +
                `Thanks`
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            res.status(200).send({
                success: "An email has been sent to " + req.body.studentemail + "."
            });
        });
    }
    createcompanyprofile(req, res) {
        const { errors, isValid } = validateCompanyProfileInput(req.body);
        const profileFields = {
            company: "",
            website: "",
            location: "",
            user: "",
            industrytype: "",
            description: "",
            githubusername: "",
            numberofemployee: "",
            social: {
                youtube: "",
                twitter: "",
                facebook: "",
                linkedin: "",
                instagram: ""
            }
        };
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        // Get fields
        profileFields.user = req.user.id;
        if (req.body.company)
            profileFields.company = req.body.company;
        if (req.body.website)
            profileFields.website = req.body.website;
        if (req.body.location)
            profileFields.location = req.body.location;
        if (req.body.industrytype)
            profileFields.industrytype = req.body.industrytype;
        if (req.body.description)
            profileFields.description = req.body.description;
        if (req.body.numberofemployee)
            profileFields.numberofemployee = req.body.numberofemployee;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        // Social
        // profileFields.social = {};
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
        CompanyProfile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update
                CompanyProfile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile))
                    .catch(err => console.log("Error from create company Profile: ", err));
            }
            else {
                // Create
                // Save Profile
                new CompanyProfile(profileFields)
                    .save()
                    .then(profile => {
                    if (profile) {
                        Verify.findOneAndUpdate({ user: req.user.id }, { $set: { profilecreated: true } }, { new: true })
                            .then(success => res.json(profile))
                            .catch(err => console.log("Error from verify: ", err));
                    }
                })
                    .catch(err => console.log("Error from create Profile: ", err));
            }
        });
    }
    updatecompanyprofile(req, res) {
        const { errors, isValid } = validateCompanyProfileInput(req.body);
        const profileFields = {
            company: "",
            website: "",
            location: "",
            user: "",
            industrytype: "",
            description: "",
            githubusername: "",
            numberofemployee: "",
            social: {
                youtube: "",
                twitter: "",
                facebook: "",
                linkedin: "",
                instagram: ""
            }
        };
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        // Get fields
        profileFields.user = req.params.id;
        if (req.body.company)
            profileFields.company = req.body.company;
        if (req.body.website)
            profileFields.website = req.body.website;
        if (req.body.location)
            profileFields.location = req.body.location;
        if (req.body.industrytype)
            profileFields.industrytype = req.body.industrytype;
        if (req.body.description)
            profileFields.description = req.body.description;
        if (req.body.numberofemployee)
            profileFields.numberofemployee = req.body.numberofemployee;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        // Social
        // profileFields.social = {};
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
        CompanyProfile.findOne({ user: req.params.id }).then(profile => {
            if (profile) {
                User.findOneAndUpdate({ _id: req.params.id }, { $set: {
                        fullname: profileFields.company
                    } }, { new: true })
                    .then(profile => console.log(profile))
                    .catch(err => console.log("Error from create Profile 1: ", err));
                // Update
                CompanyProfile.findOneAndUpdate({ user: req.params.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile))
                    .catch(err => console.log("Error from create company Profile: ", err));
            }
            else {
                // Create
                // Save Profile
                new CompanyProfile(profileFields)
                    .save()
                    .then(profile => {
                    if (profile) {
                        Verify.findOneAndUpdate({ user: req.params.id }, { $set: { profilecreated: true } }, { new: true })
                            .then(success => res.json(profile))
                            .catch(err => console.log("Error from verify: ", err));
                    }
                })
                    .catch(err => console.log("Error from create Profile: ", err));
            }
        });
    }
    // @route   GET api/getCandidates
    // @desc    getCandidates
    // @access  Private
    getCandidates(req, res) {
        let errors = {
            getcandidates: ""
        };
        if (!req.body) {
            errors.getcandidates = "No candidates applied to your job";
            return res.status(404).json(errors);
        }
        Profile.find({ user: { $in: req.body } }).then(data => res.status(200).json(data));
    }
    // @route   GET api/updatevaccancy
    // @desc    updateVaccancy
    // @access  Private
    updateVaccancy(req, res) {
        const data = {
            position: "",
            degreerequired: "",
            jobtype: "",
            skillsrequired: "",
            description: "",
            contactno: ""
        };
        const { errors, isValid } = validateCompanyVaccancyInput({
            position: req.body.position,
            degreerequired: req.body.degreerequired,
            jobtype: req.body.jobtype,
            skillsrequired: req.body.skillsrequired.toString(),
            description: req.body.description,
            contactno: req.body.contactno
        });
        if (!req.body.id) {
            errors.noprofile = "Sorry, Something went wrong";
            return res.status(404).json(errors);
        }
        if (!isValid) {
            return res.status(400).json(errors);
        }
        if (req.body.position)
            data.position = req.body.position;
        if (req.body.degreerequired)
            data.degreerequired = req.body.degreerequired;
        if (req.body.jobtype)
            data.jobtype = req.body.jobtype;
        if (req.body.skillsrequired)
            data.skillsrequired = req.body.skillsrequired.toString();
        if (req.body.description)
            data.description = req.body.description;
        if (req.body.contactno)
            data.contactno = req.body.contactno;
        CompanyProfile.updateOne({ vaccancy: { $elemMatch: { _id: req.body.id } } }, {
            $set: {
                "vaccancy.$.position": data.position,
                "vaccancy.$.degreerequired": data.degreerequired,
                "vaccancy.$.jobtype": data.jobtype,
                "vaccancy.$.skillsrequired": data.skillsrequired,
                "vaccancy.$.description": data.description,
                "vaccancy.$.contactno": data.contactno
            }
        }, { multi: true }).then(data => {
            return res.status(200).json({ success: "Successfuly Deleted" });
        });
    }
    // @route   GET api/deleteVaccany
    // @desc    deleteVaccany
    // @access  Private
    deleteVaccany(req, res) {
        const errors = {
            deletevaccany: ""
        };
        if (!req.query.vaccancyid) {
            errors.deletevaccany = "Sorry, Something Went Wrong";
            return res.status(500).json(errors);
        }
        CompanyProfile.updateOne({ user: req.user.id }, { $pull: { vaccancy: { _id: req.query.vaccancyid } } }, { multi: true }).then(data => res.status(200).json({ success: "Successfuly Deleted" }));
    }
    // @route   GET api/deleteProject
    // @desc    deleteProject
    // @access  Private
    deleteProject(req, res) {
        const errors = {
            deleteproject: ""
        };
        if (!req.query.id) {
            errors.deleteproject = "Sorry, Something Went Wrong";
            return res.status(500).json(errors);
        }
        CompanyProfile.updateOne({ user: req.user.id }, { $pull: { project: { _id: req.query.id } } }, { multi: true }).then(data => res.status(200).json({ success: "Successfuly Deleted" }));
    }
    // @route   GET api/getcompanies
    // @desc    getCompanies
    // @access  Private
    getCompanies(req, res) {
        const errors = {
            noprofile: ""
        };
        CompanyProfile.find({ vaccancy: { $exists: true, $not: { $size: 0 } } })
            .then(profiles => {
            if (!profiles) {
                errors.noprofile = "Sorry, Companies are unavailable";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
            .catch(err => console.log("Error from getCompanies", err));
    }
    // @route   GET api/getcompanies
    // @desc    getCompanies
    // @access  Public
    getAllVaccancies(req, res) {
        const errors = {
            noprofile: ""
        };
        CompanyProfile.find({})
            .then(profiles => {
            if (!profiles) {
                errors.noprofile = "Sorry, Companies are unavailable";
                return res.status(404).json(errors);
            }
            let updatedProfile = [];
            profiles.map((data) => (updatedProfile.push(data.vaccancy)));
            updatedProfile = updatedProfile.reduce((acc, val) => acc.concat(val), []);
            return res.json(updatedProfile);
        })
            .catch(err => console.log("Error from getCompanies", err));
    }
    // @route   GET api/companyprofile/:id
    // @desc    Get user profile by id
    // @access  Public
    getCompanyProfileById(req, res) {
        const errors = {
            noprofile: ""
        };
        CompanyProfile.findOne({ user: req.params.id })
            .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
            .catch(err => console.log("Error from getCompanyProfileById", err));
    }
    // @route   GET api/profile
    // @desc    Get current users profile
    // @access  Private
    currentCompanyProfile(req, res) {
        const errors = {
            noprofile: ""
        };
        CompanyProfile.findOne({ user: req.user.id })
            .populate("user", ["fullname", "avatar"])
            .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
            .catch(err => console.log("Error from currentUserProfile", err));
    }
    project(req, res) {
        const { errors, isValid } = validateCompanyProjectInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        CompanyProfile.findOne({ user: req.user.id })
            .then(companyprofile => {
            const proData = {
                user: req.user.id,
                title: req.body.title,
                client: req.body.client,
                clientlocation: req.body.clientlocation,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
                skills: req.body.skills
            };
            // Add to exp array
            companyprofile.project.unshift(proData);
            companyprofile
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log("Error from project", err));
        })
            .catch(err => console.log("Error from project", err));
    }
    vaccancy(req, res) {
        const { errors, isValid } = validateCompanyVaccancyInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        CompanyProfile.findOne({ user: req.user.id })
            .then(companyprofile => {
            const vaccancyData = {
                user: req.user.id,
                position: req.body.position,
                degreerequired: req.body.degreerequired,
                skillsrequired: req.body.skillsrequired,
                jobtype: req.body.jobtype,
                description: req.body.description,
                contactno: req.body.contactno
            };
            // Add to exp array
            companyprofile.vaccancy.unshift(vaccancyData);
            companyprofile
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log("Error from vaccancy", err));
        })
            .catch(err => console.log("Error from vaccancy", err));
    }
}
exports.CompanyAuthController = CompanyAuthController;
//# sourceMappingURL=companyController.js.map