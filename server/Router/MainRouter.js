const express = require("express")
// import controller =====================================
const BannerController = require("../Controller/BannerController")
const NewsController = require("../Controller/NewsController")
const TeamController = require('../Controller/TeamController')

// -//////////////////////////////////////////////////////////
const router = express.Router()


// =============================================================================

// Admin ROuter =========================================
// upload banner api =================================
router.post("/bannerupload",BannerController.uploadBanner)
// ////////////////////////////////////////////////////

// upload news api=======================================
router.post("/newsupload",NewsController.UploadNews)
// ////////////////////////////////////////////////////
// DELETE A NEWS DATA========================================
router.delete("/deletenews/:id",NewsController.DeleteNews)
// ///////////////////////////////////////////////////////////
// ===========================================================

// GET A SINGLE NEWS DATA=======================================
router.get("/getnew/:id",NewsController.GetSingleNews)

// ///////////////////////////////////////////////////////////////

// UPDATE A NEWS
router.patch("/editnews/:id",NewsController.EditNews)

// /////////////////////////////

//TEAM ROUTE R=================================================================
////////////////////////////////////////////////////////////////////////////////////
// /upload team router
router.post('/uploadteam',TeamController.UploadTeam)
// /////////////
router.get("/getteam",TeamController.GetTeam)
// //////////////////////////////////////
router.delete("/deleteteam/:id",TeamController.DeleteTeam)
// /-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Client page Router ================================================================================
// ************************************************************************************************************************************************88


// Banner Router api ===================
router.get("/getbanner",BannerController.GetBannerImg)
// /////////////////////////////////////
// Get A News////////////////////////////////////
router.get("/getnews/",NewsController.GetNews)

// ////////////////////////////////////////////
// exporting a router module 
module.exports = router