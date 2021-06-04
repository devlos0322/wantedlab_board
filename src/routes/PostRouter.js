const express = require('express')
const router = express.Router()

const { PostController } = require('../controllers/PostController');

// 게시글 기능 라우팅
router.post('/post/', PostController.create);
router.get('/post', async (req, res) => {
    if(!(req.query.title == undefined)) {
        PostController.findByTitle(req, res);
    } else if (!(req.query.author == undefined)) {
        PostController.findByAuthor(req, res);
    } else {
        PostController.findAll(req,res);    
    }
});
router.get('/post/:id', PostController.findById);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.remove);




module.exports = router;