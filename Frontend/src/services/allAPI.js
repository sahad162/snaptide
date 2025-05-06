import commonAPI from "./commonAPI"

export const userRegistration=async (reqbody)=>{
    return await  commonAPI('post','register',reqbody)
}

export const Userlogin=async (reqbody)=>{
    return await commonAPI('post','login',reqbody)
}

export const addPost = async (reqbody,reqHeader)=>{
    return await commonAPI('post','addpost',reqbody,reqHeader)
}

export const getusers= async (reqHeader)=>{
    return await commonAPI('get','getusers',"",reqHeader)
}

export const togglefollow = async (reqbody,reqHeader)=>{
    return await commonAPI('post','togglefollow',reqbody,reqHeader)
}

export const allposts= async (reqHeader)=>{
    return await commonAPI('get','allposts',"",reqHeader)
}