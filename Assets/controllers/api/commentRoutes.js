const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!comment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
