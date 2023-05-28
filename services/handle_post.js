const express = require('express');
const Place = require('../models/Place');
const ResponseService = require('../services/handle_responses');

class PostReq {
    async createNewPlace(place_info) {
        let response;

        const place = new Place({
            title: place_info.title, 
            snippet: place_info.snippet ? place_info.snippet : "",
            images: place_info.images ? place_info.images : [],
            climate: place_info.climate,
            nature: place_info.nature,
            tourism: place_info.tourism,
            economy: place_info.economy,
            borders: place_info.borders
       }); 

       try {
            const savedPlace = await place.save();
            response = savedPlace;
       } catch ( err ) {
            const validation = new ResponseService().checkForUndefinedParam(place);

            if ( validation != "ALL_GOOD" ) {
                response = {
                    missingParam: validation,
                    message: "Make sure you enter text for: " + validation
                };
            } else {
                response = {
                    message: err
                }
            }
       }

       return response;
    }
}

module.exports = PostReq;