import * as express from "express";
import * as bodyParser from "body-parser";
//import { Routes } from "./routes/todoRoutes";
//importing all routes of todo app

class App {
  // declaring and initializing
  public app: express.Application;
  //public routePrv: Routes = new Routes();
  // declare the express constructor into app and also called config methods
  constructor() {
    this.app = express();
    this.configSetup();
    // pass the app into routes file
    //this.routePrv.routes(this.app);
  }

  private configSetup(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

// creating the App class instance and export it into server.ts
export default new App().app;
