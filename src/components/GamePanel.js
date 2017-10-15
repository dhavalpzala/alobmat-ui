import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';

class GamePanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalPicked: appStoreInstance.selectedHousieNumbers.length,
      timeToPick: appStoreInstance.timeToPick,
      currentPick: appStoreInstance.newPick
    }
  }

  componentDidMount () {
      appStoreInstance.addChangeListener(() => {
        this.setState({
          totalPicked: appStoreInstance.selectedHousieNumbers.length,
          timeToPick: appStoreInstance.timeToPick,
          currentPick: appStoreInstance.newPick
        })
      })
    }

  render() {
    let timeToPick = this.state.timeToPick,
      minutes = parseInt(timeToPick / 60, 10),
      seconds = parseInt(timeToPick % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (isNaN(minutes) || isNaN(seconds)) {
      minutes = '--';
      seconds = '--';
    }

    return (
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Coins picked</span>
            <span className="tag is-link">{this.state.totalPicked}</span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Last Number Picked</span>
            <span className="tag is-link">{this.state.currentPick}</span>
          </div>
        </div>

        <div className="control" style={{"margin-left": "auto"}}>
          <div className="tags has-addons">
            <span className="tag is-dark">Timer</span>
            <span className="tag is-warning">{minutes}:{seconds}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePanel;
