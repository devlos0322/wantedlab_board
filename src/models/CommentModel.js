"use strict"
const { map } = require("../../app");
const db = require("../utils/db");

class Comment {
    constructor() {

    }
    //댓글 추가
    create = async (post_id, comment_content, author) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            //댓글을 달 게시글 존재 확인
            let res = await conn.query(`
                SELECT id
                 FROM post_tb
                WHERE id = ?
            `, [post_id]);
            if(!res.length) {
                if (conn) conn.release();
                return resolve([{message: "not_found"}, null]);
            } 
            //댓글 추가
            res = await db.query(`
                INSERT INTO comment_tb (post_id, comment_content, author, depth, created_at)
                VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP);
                `, [post_id, comment_content, author]);
            if (conn) conn.release();
            if(res.affectedRows) resolve([null, {id: res.insertId}]);
            resolve([{message: "create error"}, null]);
        });
    }
    //댓글 조회
    findAll = async (post_id, page, pageSize) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                SELECT id, comment_content, parent_id, author, depth, created_at
                  FROM comment_tb
                 WHERE post_id = ?
                 ORDER BY IF(ISNULL(parent_id), id, parent_id), created_at 
                 LIMIT ?, ?;
                `, [post_id, parseInt(page)-1, parseInt(pageSize)]);
            if (conn) conn.release();
            if (res.length) {
                let result = []
                let last_parent_idx;
                //하위 댓글 은 부모 댓글의 child_comments 필드에 추가하여 응답
                res.map((tuple, tuple_idx) => {
                    if(tuple.depth === 1) {
                        result.push({
                            id : tuple.id,
                            comment_content : tuple.comment_content,
                            author : tuple.author,
                            created_at : tuple.created_at,
                            child_comments: []
                        });
                        last_parent_idx = tuple_idx;
                    } else {
                        result[last_parent_idx].child_comments.push({
                            id : tuple.id,
                            comment_content : tuple.comment_content,
                            author : tuple.author,
                            created_at : tuple.created_at,
                            parent_id : tuple.parent_id
                        });
                    }
                });
                if(res.length) resolve([null, result]);
            }
            resolve([{message: "not_found"}, null]);
        });
    }
    //하위 댓글 추가
    createChild = async (parent_id, post_id, comment_content, author) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            //게시글 존재 확인
            let res = await conn.query(`
                SELECT id
                FROM comment_tb
                WHERE post_id = ?
            `, [post_id]);
            if(!res.length) {
                if (conn) conn.release();
                return resolve([{message: "not_found_post_id"}, null]);
            } 
            //게시글의 상위 댓글 존재 확인
            res = await conn.query(`
                SELECT id
                FROM comment_tb
                WHERE post_id = ?
                  AND parent_id = ?
                `, [post_id, parent_id]);
            if(!res.length) {
                if (conn) conn.release();
                return resolve([{message: "not_found_parent_id"}, null]);
            } 
            //대댓글 추가
            res = await db.query(`
                INSERT INTO comment_tb (post_id, comment_content, author, parent_id, depth, created_at)
                VALUES (?, ?, ?, ?, 2, CURRENT_TIMESTAMP);
                `, [post_id, comment_content, author, parent_id]);
            if (conn) conn.release();
            if(res.affectedRows) resolve([null, {id: res.insertId}]);
            resolve([{message: "create_error"}, null]);
        });
    }
}
module.exports  = new Comment();