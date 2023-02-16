
import React from 'react';

class ProfileComponent extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            worlds: []
        }
        this.getWorlds = this.getWorlds.bind(this)
    }
    async getWorlds(){
        await this.props.getWorlds(this.props.userData)
        this.setState({worlds: this.props.worlds})
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
        console.log("STATE RENDER", this.props)
        let worlds
        if(this.props.worlds){
            worlds = this.props.worlds.map((world) => {
                return (<li key={world.id}>{world.name}</li>)
            })
        }

        return (
            <div>
                <div>
                    username: {this.props.userData.userName}
                    <br/>
                    <button onClick={this.getWorlds}> Get Worlds</button>
                    <button onClick={this.getWorlds}> Create World</button>
                </div>
                <div>
                    <ul>
                        {worlds}
                    </ul>
                </div>
            </div>
        );
    }
}


export default ProfileComponent