import axios from 'axios';
import baseURL from './BaseURL';

const commonAPI = async (httpMethod, endPoint, requestBody) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  const payload = {
    method: httpMethod,
    url: baseURL + endPoint,
    data: requestBody,
    headers: {
      authorization: token && `Bearer ${token}` 
    },
  };

  try {
    const res = await axios(payload);
    return res;
  } catch (err) {
    return err.response || { error: "Unknown error" };
  }
};

export default commonAPI;
