const lyricsSchema = require( './lyricsSchema' )
const mongoose = require( 'mongoose' )

const lyricsModel = mongoose.model( 'lyrics', lyricsSchema )



module.exports = lyricsModel
