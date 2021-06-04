const express = require('express')
const router = express.Router()

const { CommentController } = require('../controllers/CommentController');

// 댓글 기능 라우팅
router.post('/post/:post_id/comment', CommentController.create);
router.get('/post/:post_id/comment', CommentController.findAll);

// 대댓글 기능 라우팅
router.post('/post/:post_id/comment/:parent_id', CommentController.createChild);


module.exports = router;