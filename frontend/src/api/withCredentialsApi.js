import axios from "axios";
import axiosRetry from "axios-retry";

const ApiBaseCredentialsRoute = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/"
      : "https://alluring-bryce-canyon-75245.herokuapp.com/api/v1/restaurants",
  timeout: 5000,
//   withCredentials: true,
  headers: {
    'Content-Type': 'application/json=v1',
  },
});

axiosRetry(ApiBaseCredentialsRoute, { retries: 3 });

export default ApiBaseCredentialsRoute;