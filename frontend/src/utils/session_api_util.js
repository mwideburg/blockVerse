import ApiBaseRoute from '../api/apiUtil';

export const register = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/register`, user);
};

export const login = (user) => {
  // debugger
  console.log("user", user)
  return ApiBaseRoute.post(`authentication/log-in`, user);
};

export const getUser = (userId) => {
  // debugger
  console.log("user", userId)
  return ApiBaseRoute.post(`users`, userId);
};
export const logout = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/log-out`, user);
};