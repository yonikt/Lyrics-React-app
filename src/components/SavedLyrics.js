import React, { Component } from 'react';
const axios = require('axios');


export default class SavedLyrics extends Component {

    constructor() {
        super()
        this.state = { SavedLyrics:[] }
    }

    componentDidMount = async () => {
        const response = await axios.get("http://localhost:6008/saved")
        this.setState({ SavedLyrics: response.data })
        console.log(this.state.SavedLyrics)
    }

    removeLyrics = (x) => {
        let title = this.state.SavedLyrics.filter(i=>i.title===x).map(i=>i.title)
        console.log(title)
        axios.delete(`http://localhost:6008/lyrics/${title}`)
            .then(res => { console.log("deleted " + title) })
            this.setState({SavedLyrics: this.state.SavedLyrics.filter(i=>i.title!==x)})
    }
   
    render() {

        return (
            <div>
             {this.state.SavedLyrics.map(i=> <div> <h3>{i.artist.charAt(0).toUpperCase()+ i.artist.slice(1)} - {i.title.charAt(0).toUpperCase()+ i.title.slice(1)}</h3> <p>{i.lyrics}</p> 
                <button className="delete" onClick={()=>this.removeLyrics(i.title)}>Delete</button>
              <hr></hr> </div>)}
            </div>
        )
    }
}

