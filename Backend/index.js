require('dotenv').config()
const express=require('express')
const cors=require('cors')
const Port=3000||process.env.PORT

require('./database/dbconnection')
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/uploads/images', express.static('./uploads/images'));

app.use('/uploads/videos', express.static( './uploads/videos'));

const router=require('./Routes/route')
app.use(router)

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}/ ,is running`)
})


