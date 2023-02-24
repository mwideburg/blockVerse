
import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListButton from '@mui/material/ListItemButton';
class ProfileComponent extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            worlds: []
        }
        this.getWorlds = this.getWorlds.bind(this)
        this.logout = this.logout.bind(this)
    }

    async componentDidMount(){
        await this.getWorlds(this.props.userData)
    }
    async getWorlds(){
        await this.props.getWorlds(this.props.userData)
        this.setState({worlds: this.props.worlds})
    }
    async logout(){
        await this.props.logoutUser(this.props.userData)
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
        let worlds = []
        if(this.props.worlds){
            worlds = this.props.worlds
        }

        return (
            <div>
                <div>
                    <Button variant="contained" onClick={this.logout}> Log Out</Button>
                    <br/>
                    <br/>
                    <Button variant="contained" onClick={this.getWorlds}> Create World</Button>
                </div>
                <div>
                    <List>
                        {worlds.map((world) => (
                        <ListButton key={world.id} variant="contained" color="primary">
                            {world.name}
                        </ListButton>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}


export default ProfileComponent