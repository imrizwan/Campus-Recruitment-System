"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys_js_1 = require("../config/keys.js");
// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
class AuthController {
    addNewUser(req, res) {
        console.log(req.body);
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm' // Default
                });
                const newUser = new User({
                    name: req.body.name,
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
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    loginUser(req, res) {
        const { errors, isValid } = validateLoginInput(req.body);
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email })
            .then((user) => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar };
                    //Sign Token
                    jwt.sign(payload, keys_js_1.default.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                }
                else {
                    errors.password = 'Password incorrect';
                    return res.status(404).json(errors);
                }
            });
        });
    }
    current(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map