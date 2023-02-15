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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);