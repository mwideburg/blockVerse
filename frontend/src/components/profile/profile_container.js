import{connect} from 'react-redux'
import ProfileComponent from './profile'
import {getUserWorlds} from '../../actions/user_actions'
import { logOutUser } from '../../actions/session_actions';
const mapStateToProps = (state) => {
    return {
        userData: state.session.userData,
        worlds: state.user.worlds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getWorlds: (user) => dispatch(getUserWorlds(user)),
        logoutUser: (user) => dispatch(logOutUser(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);