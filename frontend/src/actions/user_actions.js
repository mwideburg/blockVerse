// import * as APIUtil from '../util/user_api_util';

// export const RECIEVE_WORLDS = "RECIEVE_WORLDS";

// export const recieveUserWorlds = worlds => ({
//     type: RECIEVE_WORLDS,
//     worlds
// });

// export const getUserWorlds = (userId) => dispatch => {
//     return APIUtil.getUserWorlds(userId).then((res) => {
//         if (res.data.length === 0){
//             return false
//         }
//         return dispatch(recieveUserWorlds(res.data))
//     });
// };