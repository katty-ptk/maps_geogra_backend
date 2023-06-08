const express = require('express');
const router = express.Router();

const Pending_Place = require('../models/Place');

const ResponseService = require('../services/handle_responses');
const GetReq = require('../services/handle_get');
const PostReq = require('../services/handle_post');

// get all posts
router.get('/', async ( req, res ) => {
    const response = await new GetReq().getAllPendingPlaces();
    res.json(response);
});

// get specific place
router.get('/:placeID', async ( req, res ) => {
    console.log("place id: " + req.params.placeID);

    const response = await new GetReq().getSpecificPlace(req.params.placeID);
    res.json(response);
});


// insert a post
router.post('/', async ( req, res ) => {
   const response = await new PostReq().createNewPlace(req.body);
   res.json(response);
})


// delete specific post
router.delete('/:placeID', async ( req, res ) => {
    await Place.deleteOne({_id: req.params.placeID});

    res.json({message: "deleted successfluy"});
})

module.exports = router;