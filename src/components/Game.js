import React, { Component } from 'react';
import HousieNumbers from './Housie_numbers';
import Prizes from './Prizes';
import Notifications from './Notifications';
import Chats from './Chats';
import Header from './Header';
import AppAction from '../actions/app.action'

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
            <Prizes/>
          </div>
          <div className="column is-half">
            <HousieNumbers/>
          </div>
          <div className="column">
            <Notifications/>
            <Chats/>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
