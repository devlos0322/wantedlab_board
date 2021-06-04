"use strict"
const db = require("../utils/db");

class Post {
    constructor() {

    }
    //게시글 추가
    create = async (title, content, author, password) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                INSERT INTO post_tb (title, content, author, password, created_at, updated_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `, [title, content, author, password]);
            if (conn) conn.release();
            if(res.affectedRows) resolve([null, {id: res.insertId}]);
            resolve([{message: "create_error"}, null]);
        });
    }
    //게시글 전체 검색
    findAll = async (page, page_size) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                SELECT id, title, content, author, password, created_at, updated_at
                  FROM post_tb
                 ORDER BY created_at DESC 
                 LIMIT ?, ?;
                `, [parseInt(page)-1, parseInt(page_size)]);
            if (conn) conn.release();
            if(res.length) resolve([null, res]);
            resolve([{message: "not_found"}, null]);
        });
    }
    //게시글 개별 검색
    findById = (id) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                SELECT id, title, content, author, password, created_at, updated_at
                  FROM post_tb
                 WHERE id = ?;
            `, id);
            if (conn) conn.release();
            if(res.length) resolve([null, res[0]]);
            resolve([{message: "not_found"}, null]);
        });
    }
    //게시글 제목으로 검색
    findByTitle = (title, page, page_size) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                SELECT id, title, content, author, password, created_at, updated_at
                  FROM post_tb
                 WHERE title LIKE CONCAT ('%', ?, '%')
                 ORDER BY created_at DESC 
                 LIMIT ?, ?;
            `, [title, parseInt(page)-1, parseInt(page_size)]);
            if (conn) conn.release();
            if(res.length) resolve([null, res]);
            resolve([{message: "not_found"}, null]);
        });
    }
    //게시글 작성자로 검색
    findByAuthor = (author, page, page_size) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            const res = await db.query(`
                SELECT id, title, content, author, password, created_at, updated_at
                  FROM post_tb
                 WHERE author = ?
                 ORDER BY created_at DESC 
                 LIMIT ?, ?;
            `, [author, parseInt(page)-1, parseInt(page_size)]);
            if (conn) conn.release();
            if(res.length) resolve([null, res]);
            resolve([{message: "not_found"}, null]);
        });
    }
    //게시글 업데이트
    update = (id, title, content, password) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            //게시글 존재 확인
            let res = await conn.query(`
                SELECT id
                FROM post_tb
                WHERE id = ?
            `, id);
            if(!res.length) {
                if (conn) conn.release();
                return resolve([{message: "not_found"}, null]);
            } 
            res = await db.query(`
                UPDATE post_tb 
                   SET title = ?,
                       content = ?,
                       updated_at = CURRENT_TIMESTAMP
                 WHERE id = ?
                   AND password = ?;
            `, [title, content, id, password]);
            if (conn) conn.release();
            if(res.affectedRows) {
                //정상 수정
                resolve([null, {id: id}]);
            } else {
                //게시글 작성자 인증 실패
                resolve([{message: "incorrect_password"}, null]);
            }
        });
    }
    //게시글 삭제
    remove = (id, password) => {
        return new Promise(async (resolve) => {
            const conn = await db.getConnection();
            //게시글 존재 확인
            let res = await conn.query(`
                SELECT id
                FROM post_tb
                WHERE id = ?
            `, id);
            if(!res.length) {
                if (conn) conn.release();
                return resolve([{message: "not_found"}, null]);
            } 
            res = await db.query(`
                DELETE FROM post_tb
                 WHERE id = ?
                   AND password = ?;
            `, [id, password]);
            if (conn) conn.release();
            if(res.affectedRows) {
                //정상 삭제
                resolve([null, {id: id}]);
            } else {
                //게시글 작성자 인증 실패
                resolve([{message: "incorrect_password"}, null]);
            }
            resolve([{message: "not_found"}, null]);
        });
    }
}
module.exports  = new Post();