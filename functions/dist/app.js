"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose_1 = require("mongoose");
const authRoutes_1 = require("./routes/authRoutes");
const keys = require('./config/keys');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
var cloudinary = require('cloudinary');
// import { Routes } from "./routes/todoRoutes";
// importing all routes of todo app
class App {
    // declare the express constructor into app and also called config methods
    constructor() {
        this.routePrv = new authRoutes_1.Routes();
        this.app = express();
        this.configSetup();
        this.configDatabase();
        // pass the app into routes file
        this.routePrv.routes(this.app);
    }
    configDatabase() {
        mongoose_1.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }
        // { useNewUrlParser: true }
        );
        const db = mongoose_1.connection;
        // check DB Connection
        db.once("open", () => {
            console.log("Connected to MongoDB");
        });
        // check DB Errors
        db.on("error", (err) => {
            console.log(err);
        });
    }
    configSetup() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({ secret: 'passport', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
        this.app.use(cors());
        cloudinary.config({
            cloud_name: keys.cloud_name,
            api_key: keys.api_key,
            api_secret: keys.api_secret
        });
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        // Passport middleware
        this.app.use(passport.initialize());
        // Passport Config
        require('./config/passport')(passport);
    }
}
// creating the App class instance and export it into server.ts
exports.default = new App().app;
//# sourceMappingURL=app.js.map