import {getWorlds} from '../utils/user_api_util'

export const RECIEVE_WORLDS = "RECIEVE_WORLDS";

export const recieveUserWorlds = worlds => ({
    type: RECIEVE_WORLDS,
    worlds
});

export const getUserWorlds = (user) => dispatch => {
    return getWorlds(user).then((res) => {

        return dispatch(recieveUserWorlds(res.data))
    }).catch(err => {
            
            console.log(err);
    })
};