const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the dashboard with the user's posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the form to create a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  });
});

// Route to render the form to edit an existing post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(404).json({ message: 'No post found with this id' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
