import * as express from "express";
import * as bodyParser from "body-parser";
import { connect, connection } from "mongoose";
import { Routes } from "./routes/authRoutes";
const keys = require('./config/keys');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
var cloudinary = require('cloudinary');

// import { Routes } from "./routes/todoRoutes";
// importing all routes of todo app

class App {
  // declaring and initializing
  public app: express.Application;
  public routePrv: Routes = new Routes();
  // declare the express constructor into app and also called config methods
  constructor() {
    this.app = express();
    this.configSetup();
    this.configDatabase();
    // pass the app into routes file
    this.routePrv.routes(this.app);
  }

  private configDatabase(): void {
    connect(
      keys.mongoURI,
      // { useNewUrlParser: true, useUnifiedTopology: true }
      { useNewUrlParser: true }
    );

    const db: any = connection;

    // check DB Connection
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    // check DB Errors
    db.on("error", (err) => {
      console.log(err);
    });
  }
  private configSetup(): void {
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
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });

    // Passport middleware
    this.app.use(passport.initialize());

    // Passport Config
    require('./config/passport')(passport);
  }
}

// creating the App class instance and export it into server.ts
export default new App().app;
