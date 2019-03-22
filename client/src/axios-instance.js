import axios from "axios";

const apiURL = process.env.REACT_APP_BIRTHRIDE_API_URL;

const instance = axios.create({
  baseURL: apiURL
});

instance.interceptors.request.use(function(options) {
  options.headers.authorization = "token";
  return options;
});

export default instance;
