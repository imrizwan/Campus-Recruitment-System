import { AuthController } from '../controllers/authController';
import { CompanyAuthController } from '../controllers/companyController';
import * as passport from 'passport';

export class Routes {
    public authController: AuthController = new AuthController();
    public companycontroller: CompanyAuthController = new CompanyAuthController();
    public routes(app): void {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


        app.get('/api/testing', this.authController.testing)
        app.post('/api/register', this.authController.addNewUser)
        app.post('/api/login', this.authController.loginUser)
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current)
        app.post('/api/createprofile', passport.authenticate("jwt", { session: false }), this.authController.createprofile)
        app.post('/api/createprofile/education', passport.authenticate("jwt", { session: false }), this.authController.education)
        app.post('/api/createprofile/language', passport.authenticate("jwt", { session: false }), this.authController.language)
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
        app.post('/api/applyforvaccancy', passport.authenticate("jwt", { session: false }), this.authController.applyForVaccancy)
        // Company Routes
        app.post('/api/createcompanyprofile', passport.authenticate("jwt", { session: false }), this.companycontroller.createcompanyprofile)
        app.get('/api/companyprofile', passport.authenticate("jwt", { session: false }), this.companycontroller.currentCompanyProfile)
        app.post('/api/createcompanyprofile/project', passport.authenticate("jwt", { session: false }), this.companycontroller.project)
        app.post('/api/createcompanyprofile/vaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.vaccancy)        
        app.get('/api/deletevaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.deleteVaccany)        
        app.post('/api/updatevaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.updateVaccancy)        
        // It will be used by student
        app.get('/api/getcompanies', passport.authenticate("jwt", { session: false }), this.companycontroller.getCompanies)
        
    }
}