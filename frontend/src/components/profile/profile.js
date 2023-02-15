
import React from 'react';

class ProfileComponent extends React.Component {
    constructor(props){
        super(props)
        this.getWorlds = this.getWorlds.bind(this)
    }
    async getWorlds(){
        this.props.getWorlds(this.props.userData)
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
                <div>
                    username: {this.props.userData.userName}
                    <button onClick={this.getWorlds}> Get Worlds</button>
                </div>
            </div>
        );
    }
}


export default ProfileComponent