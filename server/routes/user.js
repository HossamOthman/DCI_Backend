const express = require("express");
const router = express.Router();

const controller = require("../controllers/userControllers");

router.post('/register', controller.userRegister);


router.get('/login', controller.login)
module.exports = router;
