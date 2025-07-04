const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Create a blog
router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

module.exports = router;
