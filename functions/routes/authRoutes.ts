import { AuthController } from '../controllers/authController';
import * as passport from 'passport';

export class Routes {
    public authController: AuthController = new AuthController();
    public routes(app): void {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


        app.post('/api/register', this.authController.addNewUser)
        app.post('/api/login', this.authController.loginUser)
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current)
    }
}