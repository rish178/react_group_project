import React, {Component} from 'react';
import './Login.css';
import Header from '../../common/header/Header'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const access_token = '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    formControl: {
        margin: theme.spacing,
        minWidth: 260,
        maxWidth: 260
     },
     title: {
        color: theme.palette.primary.light,
     }
});

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username : "",
            password: "",
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            validUser : "user",
            validPassword : "user@123"
        };
    }
    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        console.log(this.state.username);
        console.log(this.state.password);

        if(this.state.username === this.state.validUser && this.state.password === this.state.validPassword ){    
            localStorage.setItem("access_token", access_token);        
            this.props.history.push('/home/');
        }       
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="container">
                <Header />
                <div className="login">
                    <Card className={classes.card}>
                        <CardContent>
                        <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="userName">User Name</InputLabel>
                                <Input id="userName" type="text" onChange={this.inputUsernameChangeHandler}/>
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl> <br/><br/>
                            <FormControl required  className={classes.formControl}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="Password" onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl><br/><br/>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Login);