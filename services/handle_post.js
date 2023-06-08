const Place = require('../models/Place');
const ResponseService = require('../services/handle_responses');
const PendingPlace = require('../models/PendingPlace');

class PostReq {
    async createNewPlace(place_info) {
        let response;

        const place = new PendingPlace({
            title: place_info.title, 
            snippet: place_info.snippet ? place_info.snippet : "",
            lat: place_info.lat,
            lng: place_info.lng,
            images: place_info.images ? place_info.images : [
                "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"
            ],
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