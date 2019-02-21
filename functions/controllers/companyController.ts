import { Request, Response } from "express";
// const { Request, Response } = require("express");
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const keys =  require('../config/keys.ts');
// Verification Token
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
// Load Input Validation
import * as validateCompanyProfileInput from "../validation/companyprofile";
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
            .catch((err)=>console.log("Error from create company Profile: ",err));
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
                .catch((err)=>console.log("Error from verify: ",err));
              }
            })
            .catch((err)=>console.log("Error from create Profile: ",err));
          }
        });
      }
}