import axios from "axios";

const apiURL = process.env.REACT_APP_BIRTHRIDE_API_URL;

// Note: Authorization header will be set in ./store/actions/auth
const instance = axios.create({
  baseURL: apiURL
});

export default instance;
