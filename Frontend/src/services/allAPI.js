import commonAPI from "./commonAPI"

export const userRegistration=async (reqbody)=>{
    return await  commonAPI('post','register',reqbody)
}

export const Userlogin=async (reqbody)=>{
    return await commonAPI('post','login',reqbody)
}