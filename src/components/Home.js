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
    AppAction.joinLobby();

    //AppAction.createGame("game1", 1)
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
      games_list.push(<a className="panel-block" href={ "/game/" + game.id} key={'game-list-' + index.toString()}>
        <div style={{"padding": "16px"}}>
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img className="is-circle" src={game.owner.avatar_url} alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{game.name}</p>
              <p className="subtitle is-6">by {game.owner.name}</p>
            </div>
          </div>
        </div>
      </a>)
    });

    if (games_list.length == 0) {
      games_list.push(getNoGameElement())
    }

    return (
      <div className="home">
        <div className="home-banner">
          <section className="hero is-small">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Tambola
                </h1>
                <h2 className="subtitle">
                  hosted by Funtagious
                </h2>
              </div>
            </div>
          </section>
          <a className="button is-danger is-bold is-large is-block">Host Game</a>
          <hr className="navbar-divider" />
          <nav className="panel" style={{"background": "#fff"}}>
            <p className="panel-heading has-text-centered is-3">
              Join Game
            </p>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input className="input is-small" type="text" placeholder="Search for game" disabled="disabled" />
                <span className="icon is-small is-left">
                  <i className="fa fa-search"></i>
                </span>
              </p>
            </div>
            <p className="panel-tabs">
              <a className="is-active">All</a>
              <a>Public</a>
              <a>Private</a>
              <a>Owned</a>
            </p>
            {games_list}
          </nav>
        </div>
      </div>
    );
  }
}

function getNoGameElement() {
  return (
    <a className="panel-block" href="#">
      <div style={{"padding": "16px", "width": "100%"}}>
        <div className="media is-block">
          <div className="media-content">
            <p className="title is-4 has-text-centered">No Active Games!</p>
            <p className="subtitle is-6 has-text-centered">So why not host one?</p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default Home;
