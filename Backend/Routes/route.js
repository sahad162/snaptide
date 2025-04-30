const express=require('express')
const usercontroller=require('../Controllers/userController')



const router=new express.Router()

router.post('/register',usercontroller.registerUser);
router.post('/login',usercontroller.loginUser);


module.exports=router;