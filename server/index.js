const express = require("express")
const moongose = require("mongoose")
const app = express()
const fileUpload = require("express-fileupload")

require("dotenv").config()


const MainRouter = require("./Router/MainRouter")
const { default: mongoose } = require("mongoose")

// ==================================================================================

// initialing fileuplaod
app.use(fileUpload())
app.use(express.static("Upload"))

// ==========================





// Routing ================

app.use("/api/naksa",MainRouter)

// END=================================


// Connting to database
mongoose.connect(process.env.MONGO_DB)
.then(()=>{ 
    console.log("successfully conntect to database")


    // after succesully connected to database run server ///////////////////////////////////////////////////////////
    app.listen(process.env.PORT,()=>{
        console.log("server is running on port " + process.env.PORT)
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})
.catch((err)=>{
        console.log(err.message)
})

// ==================

