import { Request, Response } from "express";
// const { Request, Response } = require("express");
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const keys = require('../config/keys.ts');
// Verification Token
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
// Load Input Validation
import * as validateCompanyProfileInput from "../validation/companyprofile";
import * as validateCompanyProjectInput from "../validation/companyproject";
import * as validateCompanyVaccancyInput from "../validation/companyvaccancy";
// Load User model
import * as CompanyProfile from '../models/CompanyProfile';
import * as Verify from '../models/Verify';

export class CompanyAuthController {
  public createcompanyprofile(req: Request, res: Response) {
    const { errors, isValid } = validateCompanyProfileInput(req.body);
    const profileFields = {};

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    profileFields.user = req.user.id;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.industrytype) profileFields.industrytype = req.body.industrytype;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.numberofemployee) profileFields.numberofemployee = req.body.numberofemployee;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    CompanyProfile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        CompanyProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile))
          .catch((err) => console.log("Error from create company Profile: ", err));
      } else {
        // Create

        // Save Profile
        new CompanyProfile(profileFields).save().then(profile => {

          if (profile) {
            Verify.findOneAndUpdate(
              { user: req.user.id },
              { $set: { profilecreated: true } },
              { new: true }
            ).then(success => res.json(profile))
              .catch((err) => console.log("Error from verify: ", err));
          }
        })
          .catch((err) => console.log("Error from create Profile: ", err));
      }
    });
  }


  // @route   GET api/profile
  // @desc    getCompanies
  // @access  Private

  public getCompanies(req: Request, res: Response) {
    const errors = {};

    CompanyProfile.find({vaccancy: {$exists: true, $not: {$size: 0}}})
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'Sorry, Companies are unavailable';
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch((err) => console.log("Error from getCompanies", err));
  }

  // @route   GET api/profile
  // @desc    Get current users profile
  // @access  Private

  public currentCompanyProfile(req: Request, res: Response) {
    const errors = {};

    CompanyProfile.findOne({ user: req.user.id })
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

  public project(req: Request, res: Response) {
    const { errors, isValid } = validateCompanyProjectInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    CompanyProfile.findOne({ user: req.user.id }).then(companyprofile => {
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

      companyprofile.save()
        .then(profile => res.json(profile))
        .catch((err) => console.log("Error from project", err));
    })
      .catch((err) => console.log("Error from project", err));
  }



  public vaccancy(req: Request, res: Response) {
    const { errors, isValid } = validateCompanyVaccancyInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    CompanyProfile.findOne({ user: req.user.id }).then(companyprofile => {
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

      companyprofile.save()
        .then(profile => res.json(profile))
        .catch((err) => console.log("Error from vaccancy", err));
    })
      .catch((err) => console.log("Error from vaccancy", err));
  }
}