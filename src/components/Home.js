import React, { Component } from 'react';
import AppAction from '../actions/app.action'
import appStoreInstance from '../stores/app.store';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: appStoreInstance.games
    }
  }

  componentDidMount () {
    AppAction.getAllGames();

    appStoreInstance.addChangeListener(() => {
      this.setState({
        games: appStoreInstance.games
      })
    })
  }

  createGame() {
    let gameName = document.getElementById("new-game-name").value,
      interval = document.getElementById("new-game-interval").value;

   AppAction.createGame(gameName, interval);
  }

  render() {
    let games = this.state.games,
      games_list = [];

    games.forEach((game, index) => {
      games_list.push(<div className="game-list-item" key={'game-list-' + index.toString()}>
        <div className="game-list-item-title">{game.name}</div>
        <div> Interval: {game.details.interval} secs</div>
        <div>Status: {game.status}</div>
        <div>Hosted by: {game.owner.name}</div>
      </div>)
    });

    return (
      <div className="home">
        <div>
          <input id="new-game-name" placeholder="Game name" className="create-game-name" type="text" />
          <input id="new-game-interval" placeholder="interval" className="create-game-interval" type="number" />
          <input className="create-game-button button" type="button" value="Create" onClick={this.createGame.bind(this)} />
        </div>
        <div className="row wrap">{games_list}</div>
      </div>
    );
  }
}

export default Home;
