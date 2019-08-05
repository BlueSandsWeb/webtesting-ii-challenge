import React, { Component } from 'react';
import './App.css';

import Display from './components/Display/Display';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  state = {
    strikes: 0,
    balls: 0,
    outs: 0,
    innings: 0
  }

  render() {
    return (
      <div className="App">
        <Display {...this.state} />
        <Dashboard handleStrike={this.handleStrike} handleBall={this.handleBall} handleFoul={this.handleFoul} handleHit={this.handleHit} />
      </div>
    );
  }
  handleStrike = () => {
    if (this.state.strikes >= 2 && this.state.outs >= 2) {
      this.setState({ strikes: 0, outs: 0, balls: 0 });
    } else {
      if (this.state.strikes >= 2) {
        this.setState(prevState => ({ ...prevState, outs: prevState.outs + 1, strikes: 0 }));
      } else {
        this.setState(prevState => ({ ...prevState, strikes: prevState.strikes + 1 }));
      }
    }
  }

  handleFoul = () => {
    if (this.state.strikes < 2) {
      this.setState(prevState => ({ ...prevState, strikes: prevState.strikes + 1 }));
    }
  }

  handleBall = () => {
    if (this.state.balls >= 3) {
      this.setState(prevState => ({ ...prevState, balls: 0, strikes: 0 }));
    } else {
      this.setState(prevState => ({ ...prevState, balls: prevState.balls + 1 }));
    }
  }

  handleHit = () => {
    this.setState(prevState => ({ ...prevState, balls: 0, strikes: 0 }));
  }
}

export default App;
