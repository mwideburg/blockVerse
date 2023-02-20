import ApiBaseCredentialsRoute from '../api/withCredentialsApi';


export const getWorlds = (user) => {
  // debugger
  const userId = user.id
  const accessToken = user.accessToken
  console.log("userid", userId)
  console.log("acceessToken", accessToken)
  return ApiBaseCredentialsRoute.get(`/users/${userId}/worlds`, { headers: {'Authorization': `Bearer ${accessToken}`}});
};