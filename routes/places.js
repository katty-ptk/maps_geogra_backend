const express = require('express');
const router = express.Router();

const Place = require('../models/Place');

// get all posts
router.get('/', async ( req, res ) => {
    try {

        const places = await Place.find();
        res.json(places);

    } catch ( err ) {
        res.json({message: err})
    }
});

// get specific place
router.get('/:placeID', async ( req, res ) => {
    console.log("place id: " + req.params.placeID);

    const place = await Place.findById(req.params.placeID);
    res.json(place);
});


// insert a post
router.post('/', async ( req, res ) => {
   const place = new Place({
        title: req.body.title, 
        snippet: req.body.snippet ? req.body.snippet : "",
        images: req.body.images ? req.body.images : [],
        climate: req.body.climate,
        nature: req.body.nature,
        tourism: req.body.tourism,
        economy: req.body.economy,
        borders: req.body.borders
   }); 

   try {

        const savedPlace = await place.save();
        res.json(savedPlace);

   } catch ( err ) {
        res.json({message: err})
   }
})


// delete specific post
router.delete('/:placeID', async ( req, res ) => {
    await Place.deleteOne({_id: req.params.placeID});

    res.json({message: "deleted successfluy"});
})

module.exports = router;