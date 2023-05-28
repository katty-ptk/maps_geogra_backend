const express = require('express');
const Place = require('../models/Place');
const ResponseService = require('../services/handle_responses');

class GetReq {

   async getAllPlaces() {
        let response;

        try {
            const places = await Place.find();
            response = places;

        } catch ( err ) {
            response = err;
        }

        return response;
   }
    
   async getSpecificPlace(placeID) {
        let response;

        try {     

            const place = await Place.findById(placeID);
            response = place;

        } catch ( err ) {
            new ResponseService().handleError(err);

            switch ( err.name ) {
                case "CastError":
                    response = {
                        message: "The place with the given ID does not exist. Please check again."
                    };       
                    break;

                default:
                    response = {
                        message: err
                    };
                    break;
            }
        }

        return response;
   }
}

module.exports = GetReq;