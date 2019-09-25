import React, { Component } from 'react';
import swal from 'sweetalert';
const axios = require('axios');


export default class Home extends Component {

    constructor() {
        super()
        this.state = { artist: "", title: "", lyrics:  [] }
    }

    getLyrics = async () => {
        let artist = this.state.artist
        let title = this.state.title
        const response = await axios.get(`http://localhost:6008/${artist}/${title}`)
        if(response.data.lyrics){
            this.setState({ lyrics: response.data.lyrics })
        }
        else{
            swal("Song Doesn't Exist")
        }
    }

    saveLyrics = async () => {
        let lyrics = this.state.lyrics
        let artist = this.state.artist
        let title = this.state.title
        let savedLyrics = await axios.get("http://localhost:6008/saved")
        let exist = savedLyrics.data.find(i => i.lyrics === lyrics)

        if (!exist) {
            axios.post("http://localhost:6008/save", { artist, title, lyrics })
                .then(res => { console.log(res.data) })
        }
        else {
            swal(" Song Already Saved!")
        }
    }

    render() {
        return (
            <div>
                <input value={this.state.artist} onChange={(e) => this.setState({ artist: e.target.value })} placeholder="Artist"></input>
                <input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="Title"></input>
                <button className="search" onClick={this.getLyrics}>Search</button> <hr></hr>
                <p>{this.state.lyrics}</p>
                {this.state.lyrics.length === 0 ? null : <button className="save" onClick={this.saveLyrics}>Save</button>}
            </div>
        )
    }
}
