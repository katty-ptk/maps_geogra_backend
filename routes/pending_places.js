const express = require('express');
const router = express.Router();

const Pending_Place = require('../models/PendingPlace');

const GetReq = require('../services/handle_get');
const PostReq = require('../services/handle_post');

const Paths = require('../services/paths');

// get all posts
router.get('/', async ( req, res ) => {
    const response = await new GetReq().getAllPendingPlaces();
    res.json(response);
});

// get specific place
router.get('/:placeID', async ( req, res ) => {
    console.log("place id: " + req.params.placeID);

    const response = await new GetReq().getSpecificPendingPlace(req.params.placeID);
    res.json(response);
});


// insert a post
router.post('/', async ( req, res ) => {
   const response = await new PostReq().createNewPlace(req.body, new Paths().PendingPlaces);
   res.json(response);
})

// delete specific post
router.delete('/:placeID', async ( req, res ) => {
    await Pending_Place.deleteOne({_id: req.params.placeID});

    res.json({message: "deleted successfluy"});
})

// move a post from Pending to Places ( on PendingPost approval ) 
router.post('/approve/:placeID', async ( req, res ) => {
    // fetch pending post
    const post = await new GetReq().getSpecificPendingPlace(req.params.placeID);

    // insert into places
    const place = await new PostReq().createNewPlace(post, new Paths().SavedPlaces);

    // delete from Pending post
    const response = await Pending_Place.deleteOne({_id: req.params.placeID})
    res.json({
        "message": "deleted it",
        "body deleted": response,
        "body plcae": place
    })
})

module.exports = router;