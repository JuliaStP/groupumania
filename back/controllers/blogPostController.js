const { BlogPost } = require('../models');

exports.createBlogPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const url = req.protocol + '://' + req.get('host');
        const blogPost = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            img: url + '/images/' + req.file.filename,
        });
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (blogPost) {
            res.status(200).json(blogPost);
        } else {
            res.status(404).json({ error: 'BlogPost not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (blogPost) {
            await blogPost.update(req.body);
            res.status(200).json(blogPost);
        } else {
            res.status(404).json({ error: 'BlogPost not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (blogPost) {
            await blogPost.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'BlogPost not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};