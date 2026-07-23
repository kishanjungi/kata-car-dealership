const mongoose=require('mongoose')
const app=require('./src/app')
require('dotenv').config()

const port=process.env.PORT || 5000
const mongo_uri=process.env.MONGO_URI
mongoose.connect(mongo_uri).then(()=>{
    console.log("MongoDB Conneted")
    app.listen(port,()=>{
        console.log(`Server Running on port ${port}`)
    })
}).catch((err)=>{
    console.log("DB Connection failed: ",err)
    process.exit(1)
})