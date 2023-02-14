
import React from 'react';

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
            <div className="login-container">
                <button onClick={this.toggleLogin}>
                    Switch to {this.state.loginText}
                </button>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-center">
                        <input type="text"
                            className="input-field"
                            value={this.state.userName}
                            onChange={this.update('userName')}
                            placeholder="UserName"
                        />
                        <br />
                        {/* <input type="text"
                            className="input-field"
                            value={this.state.firstName}
                            onChange={this.update('firstName')}
                            placeholder="first name"
                        />
                        <br />
                        <input type="text"
                            className="input-field"
                            value={this.state.lastName}
                            onChange={this.update('lastName')}
                            placeholder="last name"
                        />
                        <br /> */}
                        <input type="password"
                            className="input-field"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="submit" className="submit-button" value="Submit" />
                        {/* {this.renderErrors()} */}
                
                    </div>
                </form>
            </div>
        );
    }
}


export default LoginComponent