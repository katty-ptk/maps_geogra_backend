const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    snippet: {
        type: String,
        required: false,
        default: ""
    },

    images: {
        type: Array,
        required: false,
        default: []
    },

    climate: {
        type: String,
        required: true
    },

    nature: {
        type: String,
        required: true
    },

    tourism: {
        type: String,
        required: true
    },

    economy: {
        type: String,
        required: true
    },

    borders: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Places', PlaceSchema);