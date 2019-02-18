// import { Request, Response } from "express";
const { Request, Response } = require("express");
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const keys =  require('../config/keys.ts');
// Verification Token
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
// Load Input Validation
import * as validateRegisterInput from "../validation/register";
import * as validateLoginInput from "../validation/login";
// Load User model
import * as User from '../models/User';

export class CompanyAuthController {
    
}