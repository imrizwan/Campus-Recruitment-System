import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import TextField from "@material-ui/core/TextField";
import { registerUser } from "../../Actions/authActions"
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    textField: {
        width: "100%",
    },
});

class AddUser extends React.Component {

    state = {
        usernme: "",
        fullname: "",
        email: "",
        password: "",
        usertype: "",
        loader: false,
        errors: {},
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors, loader: false });
            if (nextProps.errors.success) {
                this.setState({
                    usernme: "",
                    fullname: "",
                    email: "",
                    password: "",
                    usertype: "",
                    loader: false
                })
            }
        }
    }

    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    onClick = (e) => {
        e.preventDefault();

        const {
            username,
            fullname,
            email,
            password,
            usertype
        } = this.state;

        const profileData = {
            username,
            fullname,
            email,
            password,
            password2: password,
            userType: usertype
        };

        this.props.registerUser(profileData, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ width: "50%", margin: "0 auto" }}>
                <Typography
                    variant="h3"
                    style={{ textAlign: "center" }}
                >
                    Sign In
                </Typography>
                {
                    this.state.loader ?
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : this.state.errors.success ? <Typography variant="h4" style={{ textAlign: "center" }} className={classes.success}>{this.state.errors.success}.</Typography> : null
                }
                <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChangeInput('username')}
                    margin="normal"
                    variant="outlined"
                />
                {
                    this.state.errors.username ? <div style={{ color: "red" }}>{this.state.errors.username}</div> : null
                }
                <TextField
                    id="fullname"
                    label="Fullname"
                    className={classes.textField}
                    value={this.state.fullname}
                    onChange={this.handleChangeInput('fullname')}
                    margin="normal"
                    variant="outlined"
                />
                {
                    this.state.errors.fullname ? <div style={{ color: "red" }}>{this.state.errors.fullname}</div> : null
                }
                <TextField
                    id="outlined-email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChangeInput('email')}
                    margin="normal"
                    variant="outlined"
                />
                {
                    this.state.errors.email ? <div style={{ color: "red" }}>{this.state.errors.email}</div> : null
                }
                <TextField
                    id="outlined-password"
                    label="Password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChangeInput('password')}
                    margin="normal"
                    variant="outlined"
                />
                {
                    this.state.errors.password ? <div style={{ color: "red" }}>{this.state.errors.password}</div> : null
                }
                {
                    this.state.errors.password2 ? <div style={{ color: "red" }}>{this.state.errors.password2}</div> : null
                }
                <TextField
                    id="select-usertype"
                    select
                    label="User Type"
                    className={classes.textField}
                    value={this.state.usertype}
                    onChange={this.handleChangeInput('usertype')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Select Account Type"
                    margin="normal"
                >
                    {[
                        {
                            label: "Student",
                            value: "student"
                        },
                        {
                            label: "Company",
                            value: "company"
                        }
                    ].map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onClick}
                >
                    Submit
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { registerUser }
    )
)(withRouter(AddUser));