const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const lyricsSchema = new Schema( {
    artist: String,
    title: String,
    lyrics: String
})

module.exports = lyricsSchema
