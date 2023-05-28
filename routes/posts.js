const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// get all posts
router.get('/', async ( req, res ) => {
    try {

        const posts = await Post.find();
        res.json(posts);

    } catch ( err ) {
        res.json({message: err})

    }
});

// get specific post
router.get('/:postID', async ( req, res ) => {
    console.log("post id: " + req.params.postID);

    const post = await Post.findById(req.params.postID);
    res.json(post);
});


// insert a post
router.post('/', async ( req, res ) => {
   const post = new Post({
        title: req.body.title, 
        description: req.body.description
   }); 

   try {

        const savedPost = await post.save();
        res.json(savedPost);

   } catch ( err ) {
        res.json({message: err})
   }
})


// delete specific post
router.delete('/:postID', async ( req, res ) => {
    await Post.deleteOne({_id: req.params.postID});

    res.json({message: "deleted successfluy"});
})

// update a post
router.patch('/:postID', async ( req, res ) => {
    const updatedPost = await Post.updateOne({_id: req.params.postID}, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    });

    res.json(updatedPost);
    
})

module.exports = router;