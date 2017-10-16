import React, { Component } from 'react';
import HousieNumbers from './Housie_numbers';
import LeftPanel from './LeftPanel';
import Notifications from './Notifications';
import ChatPanel from './ChatPanel';
import Header from './Header';
import AppAction from '../actions/app.action'
import AdminPanel from './AdminPanel';

class Game extends Component {
  constructor(props) {
    super(props)

    const gameId = this.props.params.id;
    AppAction.joinGame(gameId);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="columns">
          <div className="column">
            <LeftPanel/>
          </div>
          <div className="column is-half">
            <HousieNumbers/>
            <AdminPanel />
          </div>
          <div className="column">
            <Notifications/>
            <ChatPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
