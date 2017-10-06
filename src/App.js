import React, { Component } from 'react';
import HousieNumbers from './Housie_numbers';
import Prizes from './Prizes';
import Notifications from './Notifications';
import Chats from './Chats';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="content row">
        <div className="column left-content">
          <Prizes/>
        </div>
        <div className="center-content">
          <HousieNumbers/>
        </div>
        <div className="column right-content">
          <Notifications/>
          <Chats/>
        </div>
      </div>
    );
  }
}

export default App;
