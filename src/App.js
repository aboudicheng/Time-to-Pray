import React, { Component } from 'react';
import Prayer from './components/Prayer/prayer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Time to Pray</h1>
        </header>
        <Prayer />
      </div>
    );
  }
}

export default App;
