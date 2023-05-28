const express = require("express")
const MainController = require("../Controller/MainController")
const router = express.Router()


// =============================================================================

router.post("/bannerupload",MainController.uploadBanner)







// exporting a router module 
module.exports = router