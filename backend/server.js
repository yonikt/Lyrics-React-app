const port = process.env.PORT || 6008
const express = require('express')
const request = require('request')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const lyricsModel = require('./models/lyricsModel')

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.get('/:artist/:title', function (req, res) {
    const title = req.params.title
    const artist = req.params.artist
    request.get(`https://api.lyrics.ovh/v1/${artist}/${title}`, function (error, response) {
        let resp = JSON.parse(response.body)
        res.json(resp)
    })
})

app.get('/saved', function (req, res) { //getting all saved lyrics
    lyricsModel.find({}, function (err, data) {
        res.send(data)
    })
})

app.post('/save', (req, res) => { //save lyrics
    const c2 = new lyricsModel(req.body)
    c2.save(() => res.json({ success: true }))
})


app.delete('/lyrics/:title', function (req, res) {
    const title = req.params.title
    lyricsModel.findOneAndRemove({ 'title': title }).then(function () { })
    res.end()
})






app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lyrics', { useNewUrlParser: true }).then(() => {
    app.listen(process.env.PORT || port, () => console.log(`Running server on port ${port}`))
})
