import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';
import AppService from '../services/app.service'

class AdminPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false,
      isPaused: false,
      gameId: undefined
    }
  }

  componentDidMount () {
    appStoreInstance.addChangeListener(() => {
      this.setState({
        isAdmin: appStoreInstance.isGameAdmin,
        isPaused: appStoreInstance.gamePaused,
        gameId: appStoreInstance.game.id
      })
    })
  }

  render() {
    if (this.state.isAdmin === false) {
      return false;
    }

    return (
      <div className="admin-panel field is-grouped">
        <p className="control">
          <a className="button is-small is-danger" onClick={this.togglePause.bind(this)}>
            {this.state.isPaused?
              <div><i className="fa fa-icon fa-play"></i></div>: 
              <div><i className="fa fa-icon fa-pause"></i></div>}
          </a>
        </p>
      </div>
    )
  }

  togglePause() {
    if (this.state.isPaused) {
      AppService.resumeGame(this.state.gameId);
    } else {
      AppService.pauseGame(this.state.gameId);
    }
  }
}

export default AdminPanel;
