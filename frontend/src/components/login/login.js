
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            userName: "",
            password: "",
            firstName: "test firstName",
            lastName: "test lastName",
            login: false,
            loginText: "Login"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.update = this.update.bind(this);
        this.renderErrors = this.renderErrors.bind(this);

    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    async toggleLogin(){
        console.log(this.state.login)
        const newState = !this.state.login
        if(!newState){
           await this.setState({login: newState, loginText: "Login"})
        }else{
            await this.setState({login: newState, loginText: "Register"})
        }
    }


    async handleSubmit(e) {
        e.preventDefault();

        let user = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };
        let login = {
             userName: this.state.userName,
            password: this.state.password,
        }
        await this.state.login ? this.props.login(login) : this.props.register(user)
        console.log(":::: PROPS", this.props)
        console.log(":::: State", this.state)
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        // debugger

        return (
            <div>
                
                <TextField id="standard-basic" label="Username" variant="standard" value={this.state.userName} placeholder="UserName" onChange={this.update('userName')}/>
                <br/>
                <TextField id="standard-basic" label="Password" variant="standard" type="password" value={this.state.password} placeholder="password" onChange={this.update('password')}/>
                <br/>
                <br/>
                <Button variant="contained" onClick={this.handleSubmit}>
                    Submit
                </Button>
                <br/>
                <br/>
                <Link href="#" onClick={this.toggleLogin} underline="hover" >
                    Switch to {this.state.loginText}
                </Link>
            </div>
        );
    }
}


export default LoginComponent