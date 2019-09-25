import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import SavedLyrics from './components/SavedLyrics';
import Home from './components/Home';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/saved">Saved Lyrics</Link></li>
          </ul>
          <Route exact path="/saved" render={() => <SavedLyrics />} />
          <Route exact path="/" render={() => <Home />} />
        </div>
      </Router>
    )
  }
}




