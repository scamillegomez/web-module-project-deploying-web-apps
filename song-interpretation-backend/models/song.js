const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
}, { collection: 'Songs'});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
