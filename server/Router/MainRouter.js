const express = require("express")
// import controller =====================================
const BannerController = require("../Controller/BannerController")
const NewsController = require("../Controller/NewsController")
// -//////////////////////////////////////////////////////////
const router = express.Router()


// =============================================================================

// Admin ROuter =========================================
// upload banner api =================================
router.post("/bannerupload",BannerController.uploadBanner)
// /////////////////////////////////////////////////////

// upload news api=======================================
router.post("/newsupload",NewsController.UploadNews)

// ////////////////////////////////////////////////////


// DELETE A NEWS DATA========================================
router.delete("/deletenews/:id",NewsController.DeleteNews)
// ///////////////////////////////////////////////////////////
// ===========================================================




// Client page Router ================================================================================

// Banner Router api ===================
router.get("/getbanner",BannerController.GetBannerImg)
// /////////////////////////////////////



// Get A News////////////////////////////////////
router.get("/getnews/",NewsController.GetNews)

// ////////////////////////////////////////////




// exporting a router module 
module.exports = router