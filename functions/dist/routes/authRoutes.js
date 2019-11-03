"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const companyController_1 = require("../controllers/companyController");
const passport = require("passport");
class Routes {
    constructor() {
        this.authController = new authController_1.AuthController();
        this.companycontroller = new companyController_1.CompanyAuthController();
    }
    routes(app) {
        app.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
        app.get('/api/testing', this.authController.testing);
        app.post('/api/register', this.authController.addNewUser);
        app.post('/api/login', this.authController.loginUser);
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current);
        app.post('/api/upload', passport.authenticate("jwt", { session: false }), this.authController.uploadPicture);
        app.post('/api/createprofile', passport.authenticate("jwt", { session: false }), this.authController.createprofile);
        app.post('/api/createprofile/projectstu', passport.authenticate("jwt", { session: false }), this.authController.projectStu);
        app.post('/api/createprofile/education', passport.authenticate("jwt", { session: false }), this.authController.education);
        app.get('/api/createprofile/deleteeducation', passport.authenticate("jwt", { session: false }), this.authController.deleteEducation);
        app.post('/api/createprofile/activities', passport.authenticate("jwt", { session: false }), this.authController.acitivties);
        app.post('/api/createprofile/language', passport.authenticate("jwt", { session: false }), this.authController.language);
        app.get('/api/createprofile/deletelanguage', passport.authenticate("jwt", { session: false }), this.authController.deleteLanguage);
        app.get('/api/createprofile/deleteproject', passport.authenticate("jwt", { session: false }), this.authController.deleteProject);
        app.post('/api/createprofile/experience', passport.authenticate("jwt", { session: false }), this.authController.experience);
        app.get('/api/createprofile/deleteexperience', passport.authenticate("jwt", { session: false }), this.authController.deleteExperience);
        app.get('/api/createprofile/deleteactivities', passport.authenticate("jwt", { session: false }), this.authController.deleteActivities);
        app.get('/api/user/:user_id', this.authController.user);
        app.get('/api/username/:username', this.authController.username);
        app.get('/api/all/', passport.authenticate("jwt", { session: false }), this.authController.all);
        app.get('/api/profile', passport.authenticate("jwt", { session: false }), this.authController.currentUserProfile);
        app.get('/api/profilecreated', passport.authenticate("jwt", { session: false }), this.authController.profilecreated);
        app.post('/api/confirmation/:token', this.authController.confirmationPost);
        app.post('/api/resend', this.authController.resendTokenPost);
        app.post('/api/forgotpasswordemail', this.authController.forgotPasswordEmail);
        app.post('/api/changepassword', this.authController.changePassword);
        app.post('/api/applyforvaccancy', passport.authenticate("jwt", { session: false }), this.authController.applyForVaccancy);
        // Company Routes
        app.get('/api/getshortlisted/:vaccancyid', passport.authenticate("jwt", { session: false }), this.companycontroller.getShortlisted);
        app.post('/api/selectionemail', passport.authenticate("jwt", { session: false }), this.companycontroller.selectionEmail);
        app.post('/api/appointmentletter', passport.authenticate("jwt", { session: false }), this.companycontroller.appointmentLetter);
        app.post('/api/shortlistcandidate', passport.authenticate("jwt", { session: false }), this.companycontroller.shortlistCandidate);
        app.post('/api/createcompanyprofile', passport.authenticate("jwt", { session: false }), this.companycontroller.createcompanyprofile);
        app.get('/api/companyprofile', passport.authenticate("jwt", { session: false }), this.companycontroller.currentCompanyProfile);
        app.get('/api/companyprofile/:id', this.companycontroller.getCompanyProfileById);
        app.post('/api/getcandidates', passport.authenticate("jwt", { session: false }), this.companycontroller.getCandidates);
        app.post('/api/createcompanyprofile/project', passport.authenticate("jwt", { session: false }), this.companycontroller.project);
        app.post('/api/createcompanyprofile/vaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.vaccancy);
        app.get('/api/deletevaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.deleteVaccany);
        app.get('/api/deleteproject', passport.authenticate("jwt", { session: false }), this.companycontroller.deleteProject);
        app.post('/api/updatevaccancy', passport.authenticate("jwt", { session: false }), this.companycontroller.updateVaccancy);
        // It will be used by student
        app.get('/api/getcompanies', passport.authenticate("jwt", { session: false }), this.companycontroller.getCompanies);
        app.get('/api/getallvaccancies', this.companycontroller.getAllVaccancies);
        app.get('/api/profilecreatedbyid/:id', passport.authenticate("jwt", { session: false }), this.authController.profilecreatedbyid);
        app.post('/api/updateprofile/:id', passport.authenticate("jwt", { session: false }), this.authController.updateprofile);
        app.post('/api/recommend/:id', passport.authenticate("jwt", { session: false }), this.authController.recommend);
        app.get('/api/getallprofilecreated', passport.authenticate("jwt", { session: false }), this.authController.getAllProfileCreated);
        app.post('/api/updatecompanyprofile/:id', passport.authenticate("jwt", { session: false }), this.companycontroller.updatecompanyprofile);
        app.get('/api/deleteuser/:id', passport.authenticate("jwt", { session: false }), this.authController.deleteUser);
        app.get('/api/verifyuser/:id', passport.authenticate("jwt", { session: false }), this.authController.verifyUser);
        app.post('/api/uploadbyid/:id', passport.authenticate("jwt", { session: false }), this.authController.uploadPictureById);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=authRoutes.js.map