const express=require('express')
const usercontroller=require('../Controllers/userController')



const router=new express.Router()

router.post('/register',usercontroller.registerUser);


module.exports=router;