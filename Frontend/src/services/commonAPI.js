import axios from 'axios';
import baseURL from './BaseURL';
const commonAPI=async (httpMethod,endPoint,requestBody)=>{

    const payload={
        method:httpMethod,
        url:baseURL+endPoint,
        data:requestBody
    }

    return await axios(payload)
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return err;
    })
}

export default commonAPI;