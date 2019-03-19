import React, { Component } from 'react';
import './App.css';
import Runes from './Runes/Runes';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PoxRaze</h1>
        </header>    
        
        <div id="runesPlacement">
          <Runes />
        </div>
      
      </div>
    );
  }
}

export default App;
