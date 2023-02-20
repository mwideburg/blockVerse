import ApiBaseRoute from '../api/apiUtil';

export const register = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/register`, user);
};

export const login = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/log-in`, user);
};
export const logout = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/log-out`, user);
};