"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const passport = require("passport");
class Routes {
    constructor() {
        this.authController = new authController_1.AuthController();
    }
    routes(app) {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
        app.post('/api/register', this.authController.addNewUser);
        app.post('/api/login', this.authController.loginUser);
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=authRoutes.js.map