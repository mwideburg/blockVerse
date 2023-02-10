import axios from 'axios';


export const getWorlds = (userId) => {
  // debugger
  return axios.get(`/users/${userId}/worlds`);
};