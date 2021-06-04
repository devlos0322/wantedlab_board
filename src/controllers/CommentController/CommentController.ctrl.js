'use strict'
const Comment = require('../../models/CommentModel');

exports.create = async (req, res) => {
    if ([req.params.post_id, req.body.comment_content, req.body.author].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });
    }
    const [err, data] = await Comment.create(req.params.post_id, req.body.comment_content, req.body.author);
    if(err) {
        if(err.message === "not_found") {
            res.status(404).send({
                message: `Not found post by post id, post id: ${req.params.post_id}.`
            });
        } else {
            // 500 에러 처리
            res.status(500).send({
                message: "Internal server error."
            });
        }
    } else {
        res.status(201).send(data);
    }
}

exports.findAll = async (req, res) => {
    if ([req.query.page, req.query.page_size].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });
    }
    const [err, data] = await Comment.findAll(req.params.post_id, req.query.page, req.query.page_size);
    if(err) {
        if(err.message === "not_found") {
            res.status(404).send({
                message: "Not found comments."
            });
        } else {
            // 500 에러 처리
            res.status(500).send({
                message: "Internal server error."
            });
        }
    } else {
        res.send(data);
    }
}
exports.createChild = async (req, res) => {
    if ([req.params.post_id, req.params.parent_id, req.body.comment_content, req.body.author].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });
    }
    const [err, data] = await Comment.createChild(req.params.parent_id, req.params.post_id, req.body.comment_content, req.body.author);
    if(err) {
        if(err.message === 'not_found_post_id') {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found post id. post id: ${req.params.post_id}`
            });
        } else if(err.message === 'not_found_parent_id') {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found parent comment. parent id: ${req.params.parent_id}`
            });
        } else {
            // 500 에러 처리
            res.status(500).send({
                message: "Internal server error."
            });
        }
    } else {
        res.status(201).send(data);
    }
}