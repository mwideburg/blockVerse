import axios from "axios";
import axiosRetry from "axios-retry";

const apiBaseRoute = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/"
      : "https://alluring-bryce-canyon-75245.herokuapp.com/api/v1/restaurants",
  timeout: 5000,
});

axiosRetry(apiBaseRoute, { retries: 3 });

export default apiBaseRoute;