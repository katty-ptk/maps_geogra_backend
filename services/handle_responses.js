class ResponseService {
    handleError(error_msg) {
        console.error(`error is being handled: ${error_msg}`);
    }

    checkForUndefinedParam( place ) {
        const { title, climate, nature, tourism, economy, borders } = place;

        if ( title == undefined ) {
            return "TITLE"
        }

        if ( climate == undefined ) {
            return "CLIMATE"
        }

        if ( nature == undefined ) {
            return "NATURE"
        }

        if ( tourism == undefined ) {
            return "TOURISM"
        }

        if ( economy == undefined ) {
            return "ECONOMY"
        }

        if ( borders == undefined ) {
            return "BORDERS"
        }

        return "ALL_GOOD";
    }
}

module.exports = ResponseService;