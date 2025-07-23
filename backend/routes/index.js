const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const blogController = require('../controller/blogController');
const auth = require('../middlewares/auth');
// user
// register
router.post('/register', authController.register );
// login
router.post('/login', authController.login );
// logout
router.post('/logout', auth,  authController.logout);
// refresh
router.get('/refresh', authController.refresh);

// blog
// CRUD
// create
router.post('/blog', auth, blogController.create);
// read all blogs
router.get('/blog', auth, blogController.getAll);
// read one blog by id
router.get('/blog/:id', auth, blogController.getById);
// update
router.put('/blog', auth, blogController.update);
// delete
router.delete('/blog', auth, blogController.delete);

// comment
// create comment
// read comments by blog id

module.exports = router;