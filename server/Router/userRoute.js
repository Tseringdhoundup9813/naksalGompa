const express = require("express")

const router = express.Router()
const UserController = require("../Controller/UserControler")
// login

router.post("/login",UserController.login)


// signup route
router.post("/signup",UserController.singup)



module.exports = router