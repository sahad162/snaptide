const mongoose=require('mongoose')
const connection_string=process.env.MONGO_CONNECTION_STRING

mongoose.connect(connection_string).then(()=>{
    console.log("✅ MongoDB connected successfully")
}
).catch((err)=>{
    console.log("❌ MongoDB connection failed:", err.message)
})