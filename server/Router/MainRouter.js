const express = require("express")
const MainController = require("../Controller/MainController")
const router = express.Router()


// =============================================================================

// Admin ROuter =========================================
// upload banner api =================================
router.post("/bannerupload",MainController.uploadBanner)
// /////////////////////////////////////////////////////


// ===========================================================




// Client page Router ================================================================================

// Banner Router api ===================
router.get("/getbanner",MainController.GetBannerImg)
// /////////////////////////////////////




// exporting a router module 
module.exports = router