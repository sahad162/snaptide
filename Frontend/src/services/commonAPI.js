import axios from 'axios';
import baseURL from './BaseURL';

const commonAPI = async (httpMethod, endPoint, requestBody,reqHeader) => {
  const payload = {
    method: httpMethod,
    url: baseURL + endPoint,
    data: requestBody,
    headers: reqHeader
      ? reqHeader
      : {
          "Content-Type": "application/json",
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
