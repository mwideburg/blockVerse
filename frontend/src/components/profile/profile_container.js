import{connect} from 'react-redux'
import ProfileComponent from './profile'
import {getUserWorlds} from '../../actions/user_actions'
const mapStateToProps = (state) => {
    return {
        userData: state.session.userData,
        worlds: state.user.worlds
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getWorlds: (user) => dispatch(getUserWorlds(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);