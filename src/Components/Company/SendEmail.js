import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {
    getProfileCreated,
    getShortlisted,
    getCurrentCompanyProfile,
    selectionEmail
} from "../../Actions/companyProfileActions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import compose from "recompose/compose";
import isEmpty from "../../validation/is-empty";
import Loader from "../Loader/Loader";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    textField: {
        width: "100%"
    },
    button: {
        width: "100%"
    },
    center: {
        margin: "0 auto",
        width: "60%"
    }
});

class SendEmail extends Component {
    state = {
        info: "",
        timing: "",
        date: "",
        errors: {},
        selectionLoader: false
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getProfileCreated();
            this.props.getCurrentCompanyProfile();
            this.props.getShortlisted(this.props.match.params.vaccancyid);
            //   this.props.getCurrentProfile();
            if (!isEmpty(this.props.profilecreated)) {
                if (!this.props.profilecreated.profilecreated) {
                    if (this.props.auth.user.userType === "student") {
                        this.props.history.push("/createprofile");
                    } else this.props.history.push("/createcompanyprofile");
                }
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
            errors: {}
        });
    };

    getQueryVariable = variable => {
        var query = this.props.location.search.substring(1);
        //"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    };

    onClick = e => {
        e.preventDefault();
        if (isEmpty(this.state.info)) {
            let errors = {};
            errors.info = "Information is required";
            this.setState({ errors });
        } else if (isEmpty(this.state.date)) {
            let errors = {};
            errors.date = "Interview Date is required";
            this.setState({ errors });
        } else if (isEmpty(this.state.timing)) {
            let errors = {};
            errors.timing = "Interview Timing is required";
            this.setState({ errors });
        } else {
            if (!isEmpty(this.props.getcurrentcompanyprofile)) {
                if (isEmpty(this.props.getshortlisted.selected) || isEmpty(this.props.getcurrentcompanyprofile.profile.vaccancy) || isEmpty(this.props.match.params.vaccancyid)) {
                    alert("Details are missing");
                } else {
                    let vaccancy = this.props.getcurrentcompanyprofile.profile.vaccancy.find(x => x._id === this.props.match.params.vaccancyid)
                    const data = {
                        studentemail: this.props.getshortlisted.selected,
                        position: vaccancy.position,
                        company: this.props.auth.user.fullname,
                        companyemail: this.props.auth.user.email,
                        info: this.state.info,
                        timing: this.state.timing,
                        date: this.state.date
                    };
                    this.setState({ selectionLoader: true, errors: {} });
                    this.props.selectionEmail(data, this.props.history);
                }
            }
        }
    };

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        if (isEmpty(this.props.profilecreated)) {
            return <Loader />;
        } else {
            return (
                <div className={classes.root}>
                    <br />
                    <Typography
                        variant="h3"
                        style={{ textAlign: "center" }}
                        className={classes.title}
                    >
                        Send Email
          </Typography>
                    <br />
                    <div className={classes.center}>
                        <TextField
                            id="info"
                            label="Information"
                            className={classes.textField}
                            margin="normal"
                            multiline
                            variant="outlined"
                            onChange={this.handleChangeInput("info")}
                        />
                        <br />
                        {errors.info ? (
                            <div style={{ color: "red" }}>{errors.info}</div>
                        ) : null}
                        <TextField
                            id="date"
                            label="Interview Date"
                            className={classes.textField}
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={this.handleChangeInput("date")}
                        />
                        <br />
                        {errors.date ? (
                            <div style={{ color: "red" }}>{errors.date}</div>
                        ) : null}
                        <TextField
                            id="select-timing"
                            select
                            label="Select Interview Timing"
                            className={classes.textField}
                            value={this.state.timing}
                            onChange={this.handleChangeInput("timing")}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin="normal"
                        >
                            {[
                                {
                                    value: "9am"
                                },
                                {
                                    value: "10am"
                                },
                                {
                                    value: "11am"
                                },
                                {
                                    value: "12pm"
                                },
                                {
                                    value: "1pm"
                                },
                                {
                                    value: "2pm"
                                },
                                {
                                    value: "3pm"
                                },
                                {
                                    value: "4pm"
                                },
                                {
                                    value: "5pm"
                                },
                                {
                                    value: "6pm"
                                },
                                {
                                    value: "7pm"
                                },
                                {
                                    value: "8pm"
                                }
                            ].map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.timing ? (
                            <div style={{ color: "red" }}>{errors.timing}</div>
                        ) : null}
                        <br />
                        <br />
                        {this.props.selectionemail === 200 ? (
                            <p style={{ color: "green" }}>An email has been sent</p>
                        ) : this.state.selectionLoader ? (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.onClick}
                                    >
                                        Send Now
              </Button>
                                )}
                        <br />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated,
    getshortlisted: state.profile.getshortlisted,
    selectionemail: state.selectionemail,
    getcurrentcompanyprofile: state.profile,
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { getProfileCreated, getShortlisted, getCurrentCompanyProfile, selectionEmail }
    )
)(withRouter(SendEmail));
