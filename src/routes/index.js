'use strict'
const express = require("express");
const router = express.Router();

const PostRouter = require('./PostRouter')
const CommentRouter = require('./CommentRouter')

router.use('/v1', PostRouter);
router.use('/v1', CommentRouter);

module.exports = router;