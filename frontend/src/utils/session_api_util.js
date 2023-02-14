import ApiBaseRoute from '../api/apiUtil';

export const register = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/register`, user);
};

export const login = (user) => {
  // debugger
  return ApiBaseRoute.post(`authentication/log-in`, user);
};