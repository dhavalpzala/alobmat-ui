import React, { Component } from 'react';
import HousieNumbers from './Housie_numbers';
import Prizes from './Prizes';
import Notifications from './Notifications';
import Chats from './Chats';
import AppAction from '../actions/app.action'

class Game extends Component {
  constructor(props) {
    super(props)

    const gameId = this.props.params.id;
    AppAction.joinGame(gameId);
    
  }

  render() {
    return (
      <div className = "content row" >
        <div className = "column left-content" >
          <Prizes/>
        </div>
        <div className = "center-content" >
          <HousieNumbers/>
        </div>
        <div className = "column right-content" >
          <Notifications/>
          <Chats/>
        </div>
      </div>
    );
  }
}

export default Game;
