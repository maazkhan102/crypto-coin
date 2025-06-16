const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// user
// register
router.post('/register', authController.register );
// login
router.post('/login', authController.login );
// logout
// refresh

// blog
// CRUD
// create
// read all blogs
// read one blog by id
// update
// delete

// comment
// create comment
// read comments by blog id

module.exports = router;