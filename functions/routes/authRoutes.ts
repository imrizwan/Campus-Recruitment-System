import { AuthController } from '../controllers/authController';
import * as passport from 'passport';

export class Routes {
    public authController: AuthController = new AuthController();
    public routes(app): void {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


        app.post('/api/register', this.authController.addNewUser)
        app.post('/api/login', this.authController.loginUser)
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current)
        app.post('/api/createprofile', passport.authenticate("jwt", { session: false }), this.authController.createprofile)
        app.post('/api/createprofile/education', passport.authenticate("jwt", { session: false }), this.authController.education)
        app.post('/api/createprofile/experience', passport.authenticate("jwt", { session: false }), this.authController.experience)
        app.get('/api/user/:user_id', this.authController.user)
        app.get('/api/username/:username', this.authController.username)
        app.get('/api/all/', this.authController.all)
        app.get('/api/profile', passport.authenticate("jwt", { session: false }), this.authController.currentUserProfile)
        app.get('/api/profilecreated', passport.authenticate("jwt", { session: false }), this.authController.profilecreated)
        app.post('/api/confirmation/:token', this.authController.confirmationPost);
        app.post('/api/resend', this.authController.resendTokenPost);
        app.post('/api/forgotpasswordemail', this.authController.forgotPasswordEmail);
        app.post('/api/changepassword', this.authController.changePassword);
    }
}