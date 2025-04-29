import commonAPI from "./commonAPI"

export const userRegistration=async (reqbody)=>{
    return await  commonAPI('post','register',reqbody)
}