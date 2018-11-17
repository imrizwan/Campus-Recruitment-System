import { Request, Response } from "express";
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as keys from '../config/keys.ts';
//import passport from 'passport';
// Load Input Validation
import * as validateRegisterInput from "../validation/register";
import * as validateLoginInput from "../validation/login";
// Load User model
import * as User from '../models/User';
import { userInfo } from "os";

export class AuthController {

    public addNewUser(req: Request, res: Response) {
      const { errors, isValid } = validateRegisterInput(req.body);
      console.log(req.body)
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
    
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default
          });
    
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
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

      User.findOne({email})
        .then((user)=>{
          if(!user){
            errors.email = 'User not found';
            return res.status(404).json(errors);
          }

          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if(isMatch){
                  //User Matched
                  const payload = { id: user.id, name: user.name, avatar: user.avatar }
                  //Sign Token
                  jwt.sign( 
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: 3600 }, 
                    (err, token) => {
                      res.json({ 
                        success: true,
                        token: "Bearer " + token
                       })
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
        name: req.user.name,
        email: req.user.email
      });
    }
}