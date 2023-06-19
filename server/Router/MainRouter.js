const express = require("express")
// import controller =====================================
const BannerController = require("../Controller/BannerController")
const NewsController = require("../Controller/NewsController")
const TeamController = require('../Controller/TeamController')
const StudentController = require("../Controller/StudentController")
const DirectorController = require("../Controller/DirectorController")
const FounderController = require("../Controller/FounderController")
const CategoryController = require("../Controller/CategoryController")
const GalleryController = require("../Controller/GalleryController")

// -//////////////////////////////////////////////////////////


const router = express.Router()


// =============================================================================

// ----------------------------------------------------------------------------------
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
// ------------------------------------------------------------
// 
// 
// 
// 
// 
// 
// /
// /

//TEAM ROUTE R=================================================================
////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------
// /upload team router
router.post('/uploadteam',TeamController.UploadTeam)
// /////////////
router.get("/getteam",TeamController.GetTeam)
// //////////////////////////////////////
router.delete("/deleteteam/:id",TeamController.DeleteTeam)
//////////////////////////////////////////////////////////
router.patch("/editteam/:id",TeamController.EditTeam)
//-------------------------------------------------------------------
// //////////////////////////////////////////////////////////////////
// 
// 
// 
// 
// 
// 
// /
// /

// student -------------------------------fasdfklsdfkl
router.post("/uploadstudent/",StudentController.UploadStudent)
router.get("/getStudent/",StudentController.GetStudent)
router.delete("/deletestudent/:id",StudentController.DeleteStudent)
router.patch("/editstudent/:id",StudentController.EditStudent)

// ***********************************************************************
// 
// 
// 
// 
// 
// 
// /
// /
// /Director ------------------------------------------------------
// // /////////////////////////////////////////////////////////
router.post("/uploaddirector",DirectorController.UploadDirector)
router.get("/getdirector",DirectorController.GetDirector)
router.delete("/deletedirector/:id",DirectorController.DeleteDirector)
router.patch("/editdirector/:id",DirectorController.EditDirector)


// ///////////////////////////////////////////////////////////////
// *****************************************************************

// founder------------------------------------------------------------
router.post("/uploadfounder",FounderController.UploadFounder)
router.get("/getfounder",FounderController.GetFounder)
router.delete("/deletefounder/:id",FounderController.DeleteFounder)
router.patch("/editfounder/:id",FounderController.EditFounder)

// ///////////////////////////////////////////////////////////////////




// Category--------------------------------------------------------
// //////////////////////////////////////////////////////////////////

router.post("/uploadCategory",CategoryController.UploadCategory)
router.get("/getcategory",CategoryController.GetCategory)
router.post("/replacecategory",CategoryController.ReplaceCategory)
router.delete("/deletecategory/:category/:index",CategoryController.DeleteCategory_Photo)
// ///////////////////////////////////////////////////



// gallery------------------------------------------------
router.post('/uploadgallery',GalleryController.UploadGallery)
router.get("/getgallery",GalleryController.GetGallery)
router.delete("/deletegallery/:id",GalleryController.DeleteGallery)

// ///////////////////
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