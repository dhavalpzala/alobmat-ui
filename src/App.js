import React, { Component } from 'react';
import HousieNumbers from './components/Housie_numbers';
import Prizes from './components/Prizes';
import Notifications from './components/Notifications';
import Chats from './components/Chats';
import './App.css';
import AppAction from './actions/app.action'
class App extends Component {
  render() {
    AppAction.joinGame("game1");
    return ( <div className = "content row" >
      <div className = "column left-content" >
        <Prizes / >
      </div>
      <div className = "center-content" >
        <HousieNumbers / >
      </div>
      <div className = "column right-content" >
        <Notifications / >
        <Chats / >
      </div>
      </div>
    );
  }
}

export default App;
