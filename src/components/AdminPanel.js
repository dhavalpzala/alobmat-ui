import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';
import AppAction from '../actions/app.action'

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
          <a className="button is-small is-info" onClick={this.togglePause.bind(this)}>
            {this.state.isPaused ? 'Resume': 'Pause'}
          </a>
        </p>
      </div>
    )
  }

  togglePause() {
    if (this.state.isPaused) {
      AppAction.resumeGame(this.state.gameId);
    } else {
      AppAction.pauseGame(this.state.gameId);
    }
  }
}

export default AdminPanel;
