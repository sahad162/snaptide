const express=require('express')
const usercontroller=require('../Controllers/userController')
const jwtmiddleware=require('../middlewares/Jwtmiddleware')
const multermiddle=require('../middlewares/multerMiddleware')
const postController=require('../Controllers/postController')



const router=new express.Router()

router.post('/register',usercontroller.registerUser);
router.post('/login',usercontroller.loginUser);
router.post('/addpost',jwtmiddleware,multermiddle,postController.addPost)

module.exports=router;