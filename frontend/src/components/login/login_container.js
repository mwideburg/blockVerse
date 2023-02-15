import{connect} from 'react-redux'
import {registerUser, loginUser} from "../../actions/session_actions"
import LoginComponent from './login';

const mapStateToProps = (state) => {
    return {
        userData: state.session.userData,
        worlds: state.user.worlds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(registerUser(user)),
        login: (user) => dispatch(loginUser(user)),
        // getUserWorlds: (user) => dispatch(getWorlds(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);