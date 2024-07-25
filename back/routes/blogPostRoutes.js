const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const router = express.Router();

const multer = require('../config/multer-config');

router.post('/blogposts', multer, blogPostController.createBlogPost);
router.get('/blogposts', blogPostController.getBlogPosts);
router.get('/blogposts/:id', blogPostController.getBlogPostById);
router.put('/blogposts/:id', blogPostController.updateBlogPost);
router.delete('/blogposts/:id', blogPostController.deleteBlogPost);

module.exports = router;