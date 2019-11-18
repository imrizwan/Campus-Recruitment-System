import { Request, Response } from "express";
import * as gravatar from "gravatar";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as keys from "../config/keys";
import "../../env";
// Verification Token
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";

// Load Input Validation
import * as validateRegisterInput from "../validation/register";
import * as isEmpty from "../validation/is-empty";
import * as validateLoginInput from "../validation/login";
import * as validateProfileInput from "../validation/profile";
import * as validateEducationInput from "../validation/education";
import * as validateLanguageInput from "../validation/language";
import * as validateAcitivties from "../validation/acitivties";
import * as validateProjectStu from "../validation/projectstu";
import * as validateExperienceInput from "../validation/experience";
import * as validateResend from "../validation/resend";
import * as validateConfirmToken from "../validation/validateConfirmToken";
import * as validateChangePassword from "../validation/changepassword";

var cloudinary = require("cloudinary");
var cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

// Load User model
import * as User from "../models/User";
import * as CompanyProfile from "../models/CompanyProfile";
// import * as Upload from "../models/Upload";
// Load Profile Model
const Profile = require("../models/Profile");
// Load User Profile Verification Model
const Verify = require("../models/Verify");
// Load Verification Token Model
const Token = require("../models/Token");
// Load Password Token Model
const PasswordToken = require("../models/PasswordToken");

export class AuthController {
  public testing(req: Request, res: Response) {
    res.json("Rozwam");
  }

  public deleteUser(req: Request, res: Response) {
    User.deleteOne({ _id: req.params.id })
      .then(data => {
        Profile.deleteOne({ user: req.params.id })
        .then(item =>{
          console.log(item);
        })
        .catch(err => console.log("err from deleteUser", err));
        CompanyProfile.deleteOne({ user: req.params.id })
        .then(item =>{
          console.log(item);
        })
        .catch(err => console.log("err from deleteUser", err));
        return res.status(200).json({ success: "deleted" });
      })
      .catch(err => console.log("error from deleteUser", err));
  }
  public verifyUser(req: Request, res: Response) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isVerified: true } },
      { new: true }
    )
      .then(data => res.status(200).json({ success: "verified" }))
      .catch(err => {
        console.log(err);
      });
  }

  public addNewUser(req: Request, res: Response) {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    }).then(user => {
      if (user) {
        if (user.username && user.username === req.body.username) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (user.email && user.email === req.body.email) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        }
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
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
                var token = new Token({
                  user: user._id,
                  token: crypto.randomBytes(16).toString("hex")
                });

                token
                  .save()
                  .then(() => {
                    var transporter = nodemailer.createTransport({
                      service: process.env.service,
                      auth: { user: process.env.user, pass: process.env.pass }
                    });
                    var mailOptions = {
                      from: "no-reply@fyp-rizwan.herokuapp.com",
                      to: user.email,
                      subject: "Account Verification Token",
                      text:
                        "Hello,\n\n" +
                        "Please verify your account by clicking the link: \nhttp://" +
                        "fyp-rizwan.herokuapp.com" +
                        "/confirmation/" +
                        token.token +
                        "\n"
                    };
                    transporter.sendMail(mailOptions, function(err) {
                      if (err) {
                        return res.status(500).send({ msg: err.message });
                      }
                      //profilecreated verification
                      verify
                        .save()
                        .then(done => console.log(done))
                        .catch(err => console.log("Error from Verify: ", err));

                      return res.status(200).send({
                        success:
                          "A verification email has been sent to " +
                          user.email +
                          "."
                      });
                    });
                  })
                  .catch(err => {
                    console.log("Error from token.save", err);
                  });

                // return res.json(user);
              })
              .catch(err => console.log("Error from addnewuser", err));
          });
        });
      }
    });
  }

  public uploadPicture(req: Request, res: Response) {
    const errors = {
      url: ""
    };
    let storage = cloudinaryStorage({
      cloudinary,
      folder: "folder",
      allowedFormats: ["jpg", "png"],
      filename(req, file, cb) {
        cb(undefined, file.fieldname + "-" + req.user.id);
      }
    });

    const upload = multer({ storage }).single("selectedImage");

    upload(req, res, function(err) {
      // need to check if the req.file is set.
      if (req.file == null || req.file == undefined || req.file == "") {
        //redirect to the same url
        errors.url = "Image Not Found: Server error!!!";
        return res.status(404).json(errors);
        // return res.send({
        //   success: false,
        //   message: "Image Not Found: Server error!!!"
        // });
      }
      // An error occurred when uploading
      if (err) {
        console.log(err);
      } else {
        // Everything went fine
        //define what to do with the params
        //both the req.body and req.file(s) are accessble here
        //console.log(req.file);

        //store the file name to mongodb
        //we use the model to store the file.
        // const picture = new Upload({
        //   url: req.file.secure_url
        // });

        // cloudinary.uploader.upload(req.file, function (result) {
        //     console.log("Cloudinary: ", result)
        // });
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { url: req.file.secure_url } },
          { new: true }
        )
          .then(() => {
            return res.status(200).json({ success: true });
          })
          .catch(err => {
            console.log(err);
            errors.url = "Something went wrong";
            return res.status(404).json(errors);
          });
        //save the image
        // profile.update((err, user) => {
        //   if (err) {
        //     console.log(err);
        //     return res.send({
        //       success: false,
        //       message: err
        //     });
        //   }
        //   return res.send({
        //     success: true,
        //     message: "Success!!!"
        //   });
        // });
      }
    });
  }

  public uploadPictureById(req: Request, res: Response) {
    const errors = {
      url: ""
    };
    let storage = cloudinaryStorage({
      cloudinary,
      folder: "folder",
      allowedFormats: ["jpg", "png"],
      filename(req, file, cb) {
        cb(undefined, file.fieldname + "-" + req.params.id);
      }
    });

    const upload = multer({ storage }).single("selectedImage");

    upload(req, res, function(err) {
      // need to check if the req.file is set.
      if (req.file == null || req.file == undefined || req.file == "") {
        //redirect to the same url
        errors.url = "Image Not Found: Server error!!!";
        return res.status(404).json(errors);
        // return res.send({
        //   success: false,
        //   message: "Image Not Found: Server error!!!"
        // });
      }
      // An error occurred when uploading
      if (err) {
        console.log(err);
      } else {
        // Everything went fine
        //define what to do with the params
        //both the req.body and req.file(s) are accessble here
        //console.log(req.file);

        //store the file name to mongodb
        //we use the model to store the file.
        // const picture = new Upload({
        //   url: req.file.secure_url
        // });

        // cloudinary.uploader.upload(req.file, function (result) {
        //     console.log("Cloudinary: ", result)
        // });
        Profile.findOneAndUpdate(
          { user: req.params.id },
          { $set: { url: req.file.secure_url } },
          { new: true }
        )
          .then(() => {
            return res.status(200).json({ success: true });
          })
          .catch(err => {
            console.log(err);
            errors.url = "Something went wrong";
            return res.status(404).json(errors);
          });
        //save the image
        // profile.update((err, user) => {
        //   if (err) {
        //     console.log(err);
        //     return res.send({
        //       success: false,
        //       message: err
        //     });
        //   }
        //   return res.send({
        //     success: true,
        //     message: "Success!!!"
        //   });
        // });
      }
    });
  }

  public loginUser(req: Request, res: Response) {
    const { errors } = validateLoginInput(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      if (!userType) {
        errors.userType = "User type not found";
        return res.status(404).json(errors);
      }

      if (user.userType !== userType) {
        errors.userType = "User type does not match";
        return res.status(400).json(errors);
      }

      // Make sure the user has been verified
      if (!user.isVerified) {
        errors.email = "Your email has not been verified.";
        errors.resend = "Resend Verification Email";
        return res.status(401).send(errors);
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User Matched

            const payload = {
              id: user.id,
              fullname: user.fullname,
              username: user.username,
              email: user.email,
              userType: user.userType
            };
            //Sign Token
            jwt.sign(
              payload,
              process.env.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                Verify.findOne({ user: user.id })
                  .then(data => {
                    return res.json({
                      success: true,
                      profilecreated: data.profilecreated,
                      token: "Bearer " + token
                    });
                  })
                  .catch(err => console.log("Error from loginUser", err));
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(404).json(errors);
          }
        })
        .catch(err => console.log("Error from loginUser", err));
    });
  }

  public current(req: Request, res: Response) {
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

  public applyForVaccancy(req: Request, res: Response) {
    const errors = {
      applyforvaccancy: ""
    };
    let { companyid, vaccancyid } = req.body;
    if (!companyid || !vaccancyid) {
      errors.applyforvaccancy = "Something went wrong";
      return res.status(404).json(errors);
    }

    Verify.findOne({
      applied: {
        $elemMatch: {
          key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}`
        }
      }
    })
      .then(data => {
        if (!isEmpty(data)) {
          if (!isEmpty(data.applied)) {
            errors.applyforvaccancy = "You have already applied";
            return res.status(500).json(errors);
          }
        }

        if (isEmpty(data)) {
          Verify.findOne({ user: req.user.id })
            .then(data => {
              // Add to exp array
              data.applied.unshift({
                key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}`
              });

              // Add to company profilecreated applied array
              Verify.findOne({ user: req.body.companyid })
                .then(company => {
                  console.log("Company", company);
                  if (!company) {
                    errors.applyforvaccancy = "Company does not exist";
                    return res.status(404).json(errors);
                  }
                  company.applied.unshift({
                    key: `${req.user.id}${req.body.vaccancyid}${req.body.companyid}`
                  });

                  company
                    .save()
                    .then(com => console.log("Updated Company Applied"))
                    .catch(err =>
                      console.log("Error from applyForVaccancy3", err)
                    );
                })
                .catch(err =>
                  console.log("err from applyforVaccancy4 Company", err)
                );

              data
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log("Error from applyForVaccancy5", err));
            })
            .catch(err => {
              console.log("error from applyForVaccancy6", err);
            });
        }
      })
      .catch(err => {
        console.log("error from applyForVaccancy7", err);
      });
  }

  // @route   GET api/profile
  // @desc    Get current users profile
  // @access  Private

  public currentUserProfile(req: Request, res: Response) {
    const errors = {
      noprofile: ""
    };

    Profile.findOne({ user: req.user.id })
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
  // @route   GET api/profile/all
  // @desc    Get all profiles
  // @access  Public

  public all(req: Request, res: Response) {
    const errors = {
      noprofile: ""
    };

    User.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }
  // @route   GET api/getallstudent
  // @desc    getallstudent
  // @access  Public

  public getallstudent(req: Request, res: Response) {
    const errors = {
      noprofile: ""
    };

    Profile.find()
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }

  // @route   GET api/profile/username/:username
  // @desc    Get profile by username
  // @access  Public

  public username(req: Request, res: Response) {
    const errors = {
      noprofile: ""
    };

    Profile.findOne({ username: req.params.username })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => console.log("Error from username", err));
  }

  // @route   GET api/profile/user/:user_id
  // @desc    Get profile by user ID
  // @access  Public

  public user(req: Request, res: Response) {
    {
      const errors = {
        noprofile: ""
      };

      Profile.findOne({ user: req.params.user_id })
        .then(profile => {
          if (!profile) {
            errors.noprofile = "There is no profile for this user";
            res.status(404).json(errors);
          }

          res.json(profile);
        })
        .catch(err =>
          res.status(404).json({ profile: "There is no profile for this user" })
        );
    }
  }
  // experience

  public experience(req: Request, res: Response) {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          user: req.user.id,
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
          companyLink: req.body.companyLink,
          companyShortDetail: req.body.companyShortDetail
        };

        // Add to exp array
        profile.experience.unshift(newExp);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log("Error from experience", err));
      })
      .catch(err => console.log("Error from experience", err));
  }

  // project

  public projectStu(req: Request, res: Response) {
    console.log(req.body);
    const { errors, isValid } = validateProjectStu(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newProjects = {
          name: req.body.name,
          list: req.body.list
        };

        // Add to exp array
        profile.projects.unshift(newProjects);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log("Error from projectstu", err));
      })
      .catch(err => console.log("Error from projectstu", err));
  }

  // delete education
  public deleteEducation(req: Request, res: Response) {
    Profile.updateOne(
      { user: req.user.id },
      { $pull: { education: { _id: req.query.id } } },
      { multi: true }
    )
      .then(data => res.status(200).json({ success: 200 }))
      .catch(err => console.log("err from delete education", err));
  }

  // delete language
  public deleteLanguage(req: Request, res: Response) {
    Profile.updateOne(
      { user: req.user.id },
      { $pull: { language: { _id: req.query.id } } },
      { multi: true }
    )
      .then(data => res.status(200).json({ success: 200 }))
      .catch(err => console.log("err from delete language", err));
  }

  // deleteExperience
  public deleteExperience(req: Request, res: Response) {
    Profile.updateOne(
      { user: req.user.id },
      { $pull: { experience: { _id: req.query.id } } },
      { multi: true }
    )
      .then(data => res.status(200).json({ success: 200 }))
      .catch(err => console.log("err from delete experience", err));
  }
  // deleteActivities
  public deleteActivities(req: Request, res: Response) {
    Profile.updateOne(
      { user: req.user.id },
      { $pull: { activities: { _id: req.query.id } } },
      { multi: true }
    )
      .then(data => res.status(200).json({ success: 200 }))
      .catch(err => console.log("err from delete deleteActivities", err));
  }

  // delete project
  public deleteProject(req: Request, res: Response) {
    Profile.updateOne(
      { user: req.user.id },
      { $pull: { projects: { _id: req.query.id } } },
      { multi: true }
    )
      .then(data => res.status(200).json({ success: 200 }))
      .catch(err => console.log("err from delete project", err));
  }

  // education

  public education(req: Request, res: Response) {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
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

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log("Error from education", err));
      })
      .catch(err => console.log("Error from education", err));
  }

  public language(req: Request, res: Response) {
    const { errors, isValid } = validateLanguageInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newLang = {
          user: req.user.id,
          name: req.body.name,
          level: req.body.level
        };

        // Add to exp array
        profile.language.unshift(newLang);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log("Error from language", err));
      })
      .catch(err => console.log("Error from language", err));
  }

  public acitivties(req: Request, res: Response) {
    /*   const { errors, isValid } = validateAcitivties(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    } */
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newActivity = {
          title: req.body.title,
          description: req.body.description
        };

        // Add to exp array
        profile.activities.unshift(newActivity);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log("Error from acitivties", err));
      })
      .catch(err => console.log("Error from acitivties", err));
  }

  public confirmationPost(req: Request, res: Response) {
    const { errors } = validateConfirmToken(req.body);

    const email = req.body.email;
    const password = req.body.password;
    // const userType = req.body.userType;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              Token.findOne({ token: req.params.token }, function(err, token) {
                if (err) {
                  return res.status(500).send({ msg: err.message });
                }
                if (!token)
                  return res.status(400).send({
                    type: "not-verified",
                    msg:
                      "We were unable to find a valid token. Your token my have expired."
                  });

                // If we found a token, find a matching user
                User.findOne(
                  { _id: token.user, email: req.body.email },
                  function(err, user) {
                    if (err) {
                      return res.status(500).send({ msg: err.message });
                    }
                    if (!user)
                      return res.status(400).send({
                        msg: "We were unable to find a user for this token."
                      });
                    if (user.isVerified)
                      return res.status(400).send({
                        type: "already-verified",
                        msg: "This user has already been verified."
                      });

                    // Verify and save the user
                    user.isVerified = true;
                    user.save(function(err) {
                      if (err) {
                        return res.status(500).send({ msg: err.message });
                      }
                      return res.status(200).send({
                        type: "verified",
                        success: "The account has been verified."
                      });
                    });
                  }
                );
              });
            } else {
              errors.password = "Password incorrect";
              return res.status(404).json(errors);
            }
          })
          .catch(err => console.log("Error from confirmationPost", err));
      })
      .catch(err => console.log("Error from confirmationPost", err));
  }

  public resendTokenPost(req: Request, res: Response) {
    const { errors } = validateResend(req.body);

    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user with that email." });
      if (user.isVerified)
        return res
          .status(400)
          .send({ msg: "This account has already been verified." });

      // Create a verification token, save it, and send email
      var token = new Token({
        user: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });

      // Save the token
      token.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        // Send the email
        var transporter = nodemailer.createTransport({
          service: process.env.service,
          auth: { user: process.env.user, pass: process.env.pass }
        });
        var mailOptions = {
          from: "no-reply@fyp-rizwan.herokuapp.com",
          to: user.email,
          subject: "Account Verification Token",
          text:
            "Hello,\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            "fyp-rizwan.herokuapp.com" +
            "/confirmation/" +
            token.token +
            "\n"
        };
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          res.status(200).send({
            success: "A verification email has been sent to " + user.email + "."
          });
        });
      });
    });
  }

  public changePassword(req: Request, res: Response) {
    const { errors } = validateChangePassword(req.body);

    let password = req.body.password;
    // const password2 = req.body.password2;
    PasswordToken.findOne({ token: req.body.token })
      .then(tokenFound => {
        if (!tokenFound) {
          errors.tokenerror = "Request is invalid";
          return res.status(404).json(errors);
        }

        if (tokenFound.passwordchanged) {
          errors.tokenerror = "This request has already been used";
          return res.status(404).json(errors);
        }
        // if token found then search user

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;

            User.findOneAndUpdate(
              { _id: tokenFound.user },
              { $set: { password } },
              { new: true }
            )
              .then(user => {
                if (!user) {
                  errors.tokenerror = "User not found";
                  return res.status(404).json(errors);
                }
                // if user found then change his password
                PasswordToken.findOneAndUpdate(
                  { token: req.body.token },
                  { passwordchanged: true },
                  { token: req.body.token }
                )
                  .then(done => console.log(done))
                  .catch(err =>
                    console.log("Error from Password Change Update: ", err)
                  );
                return res
                  .status(200)
                  .json({ success: "Password Changed Successfully" });
              })
              .catch(err => console.log("Error from Password Update: ", err));
          });
        });
      })
      .catch(err => console.log("Error from Password Token: ", err));
  }

  public forgotPasswordEmail(req: Request, res: Response) {
    const { errors } = validateResend(req.body);

    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user with that email." });
      // if (!user.isVerified) res.status(400).send({ msg: 'This account has not been verified.' });

      // Create a verification token, save it, and send email
      var passwordtoken = new PasswordToken({
        user: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });

      // Save the token
      passwordtoken.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        // Send the email
        var transporter = nodemailer.createTransport({
          service: process.env.service,
          auth: { user: process.env.user, pass: process.env.pass }
        });
        var mailOptions = {
          from: "no-reply@fyp-rizwan.herokuapp.com",
          to: user.email,
          subject: "Change Password",
          text:
            "Hello,\n\n" +
            "Please change your account password by clicking the link: \nhttp://" +
            "fyp-rizwan.herokuapp.com" +
            "/changepassword/" +
            passwordtoken.token +
            ".\n"
        };
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }

          res
            .status(200)
            .send({ success: "An email has been sent to " + user.email + "." });
        });
      });
    });
  }

  public profilecreated(req: Request, res: Response) {
    Verify.findOne({ user: req.user.id })
      .then(data => res.json(data))
      .catch(err => console.log("Error from create Profile: ", err));
  }
  public profilecreatedbyid(req: Request, res: Response) {
    Verify.findOne({ user: req.params.id })
      .then(data => res.json(data))
      .catch(err => console.log("Error from create Profile: ", err));
  }

  // createprofile

  public createprofile(req: Request, res: Response) {
    console.log(req.body);
    const { errors, isValid } = validateProfileInput(req.body);
    const profileFields = {
      user: "",
      name: "",
      title: "",
      mail: "",
      phoneNumber: "",
      website: "",
      description: "",
      batch: "",
      semester: "",
      location: "",
      skills: "",
      interests: "",
      social: {
        youtube: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        github: ""
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
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.mail) profileFields.mail = req.body.mail;
    if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.batch) profileFields.batch = req.body.batch;
    if (req.body.semester) profileFields.semester = req.body.semester;
    if (req.body.location) profileFields.location = req.body.location;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Interests - Spilt into array
    if (typeof req.body.interests !== "undefined") {
      profileFields.interests = req.body.interests.split(",");
    }

    // Social
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.github) profileFields.social.github = req.body.github;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("Error from create Profile 1: ", err));
        } else {
          // Create

          // Save Profile
          new Profile(profileFields)
            .save()
            .then(profile => {
              if (profile) {
                Verify.findOneAndUpdate(
                  { user: req.user.id },
                  { $set: { profilecreated: true } },
                  { new: true }
                )
                  .then(success => res.json(profile))
                  .catch(err => console.log("Error from verify: ", err));
              }
            })
            .catch(err => console.log("Error from create Profile 2: ", err));
        }
      })
      .catch(err => console.log("Error from create Profile 3: ", err));
  }

  public getAllProfileCreated(req: Request, res: Response) {
    Verify.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log("err from getAllProfileCreated", err))
  }

  public recommend(req: Request, res: Response) {
    Verify.findOneAndUpdate(
      { user: req.params.id },
      {
        $set: {
          recommend: !req.body.isChecked
        }
      },
      { new: true }
    )
      .then(profile => res.status(200).json({ success: "Recommended" }))
      .catch(err => res.status(404).json(err));
  }

  public updateprofile(req: Request, res: Response) {
    const { errors, isValid } = validateProfileInput(req.body);
    const profileFields = {
      user: "",
      name: "",
      title: "",
      mail: "",
      phoneNumber: "",
      website: "",
      description: "",
      batch: "",
      semester: "",
      location: "",
      skills: "",
      interests: "",
      social: {
        youtube: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        github: ""
      }
    };

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    profileFields.user = req.params.id;
    // if (req.body.username) profileFields.username = req.body.username;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.mail) profileFields.mail = req.body.mail;
    if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.batch) profileFields.batch = req.body.batch;
    if (req.body.semester) profileFields.semester = req.body.semester;
    if (req.body.location) profileFields.location = req.body.location;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Interests - Spilt into array
    if (typeof req.body.interests !== "undefined") {
      profileFields.interests = req.body.interests.split(",");
    }

    // Social
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.github) profileFields.social.github = req.body.github;

    Profile.findOne({ user: req.params.id })
      .then(profile => {
        if (profile) {
          User.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                email: profileFields.mail,
                fullname: profileFields.name
              }
            },
            { new: true }
          )
            .then(profile => console.log(profile))
            .catch(err => console.log("Error from create Profile 1: ", err));
          // Update
          Profile.findOneAndUpdate(
            { user: req.params.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("Error from create Profile 1: ", err));
        } else {
          // Create

          // Save Profile
          new Profile(profileFields)
            .save()
            .then(profile => {
              if (profile) {
                Verify.findOneAndUpdate(
                  { user: req.params.id },
                  { $set: { profilecreated: true } },
                  { new: true }
                )
                  .then(success => res.json(profile))
                  .catch(err => console.log("Error from verify: ", err));
              }
            })
            .catch(err => console.log("Error from create Profile 2: ", err));
        }
      })
      .catch(err => console.log("Error from create Profile 3: ", err));
  }
}
