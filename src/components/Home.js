import React, { Component } from 'react';
import AppAction from '../actions/app.action'
import appStoreInstance from '../stores/app.store';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: appStoreInstance.games
    }
  }

  componentDidMount () {
    AppAction.joinLobby();

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
          <div className="row active-game">
            <div>
              <p className="active-game-title">{game.name}</p>
              <div>{moment.duration(moment(new Date()).diff(game.started_at)).humanize()} ago</div>
            </div>
            <div>
              <span style={{"opacity": ".7"}}>by </span><img className="avatar image is-32x32" src={game.owner.avatar_url} alt="Placeholder image" />
              {game.owner.name}
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
              Active Games
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
    <a className="panel-block" href="#" key="no-active-game">
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
