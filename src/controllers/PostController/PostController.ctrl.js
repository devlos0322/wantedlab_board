'use strict'
const Post = require('../../models/PostModel');

exports.create = async (req, res) => {
    if ([req.body.title, req.body.content, req.body.author, req.body.password].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });
    }
    const [err, data] = await Post.create(req.body.title, req.body.content, req.body.author, req.body.password);
    if(err) {
        // 500 에러 처리
        res.status(500).send({
            message: "Internal server error."
        });
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
    const [err, data] = await Post.findAll(req.query.page, req.query.page_size);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: "Not found posts."
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

exports.findById = async (req, res) => {
    const [err, data] = await Post.findById(req.params.id);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found post by id, id: ${req.params.id}.`
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

exports.findByTitle = async (req, res) => {
    if ([req.query.title, req.query.page, req.query.page_size].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });          
    }
    const [err, data] = await Post.findByTitle(req.query.title, req.query.page, req.query.page_size);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found posts by title, title: ${req.query.title}.`
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

exports.findByAuthor = async (req, res) => {
    if ([req.query.author, req.query.page, req.query.page_size].includes(undefined)){
        return res.status(400).send({
            message: "check your parameter."
        });          
    }
    const [err, data] = await Post.findByAuthor(req.query.author, req.query.page, req.query.page_size);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found posts by author, author: ${req.query.author}.`
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

exports.update = async (req, res) => {
    const [err, data] = await Post.update(req.params.id, req.body.title, req.body.content, req.body.password);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found post by id, id: ${req.params.id}.`
            });
        } else if(err.message === "incorrect_password"){
            // 401 에러 처리
            res.status(401).send({
                message: `Incorrect password, id: ${req.params.id}, password: ${req.body.password}.`
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

exports.remove = async (req, res) => {
    const [err, data] = await Post.remove(req.params.id, req.body.password);
    if(err) {
        if(err.message === "not_found") {
            // 404 에러 처리
            res.status(404).send({
                message: `Not found post by id, id: ${req.params.id}.`
            });
        } else if(err.message === "incorrect_password"){
            // 401 에러 처리
            res.status(401).send({
                message: `Incorrect password, id: ${req.params.id}, password: ${req.body.password}.`
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