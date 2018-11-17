import { AuthController } from '../controllers/authController';
import * as passport from 'passport';

export class Routes {
    public authController: AuthController = new AuthController();
    public routes(app): void {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


        app.route('/api/register')
            // POST endpoint
            .post(this.authController.addNewUser)
        app.route('/api/login')
            // POST endpoint
            .post(this.authController.loginUser)
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current)
    }
}