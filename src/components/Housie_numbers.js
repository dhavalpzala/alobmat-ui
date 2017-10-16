import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';
import GamePanel from './GamePanel';

class HousieNumbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedHousieNumbers: appStoreInstance.selectedHousieNumbers,
      newPick: appStoreInstance.newPick,
      timeToPick: appStoreInstance.timeToPick,
      paused: appStoreInstance.gamePaused
    }
  }

  componentDidMount () {
    appStoreInstance.addChangeListener(() => {
      this.setState({
        selectedHousieNumbers: appStoreInstance.selectedHousieNumbers,
        newPick: appStoreInstance.newPick,
        timeToPick: appStoreInstance.timeToPick,
        paused: appStoreInstance.gamePaused
      })
    })
  }

  render() {
    const TOTAL_HOUSIE_NUMBERS = 90;
    let housie_numbers = [],
      overlay,
      timer,
      selectedHousieNumbers = this.state.selectedHousieNumbers,
      newPick = this.state.newPick,
      timeToPick = this.state.timeToPick,
      minutes = parseInt(timeToPick / 60, 10),
      seconds = parseInt(timeToPick % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    for (let index = 1; index <= TOTAL_HOUSIE_NUMBERS; index++) {
      let classNames = `housie-number is-warning ${selectedHousieNumbers.indexOf(index) > -1 ? 'selected' : ''} ${index === newPick ? 'new-pick' : ''}`;
      housie_numbers.push(<div key={'housie-number' + index.toString()} className={ classNames }><span>{index}</span></div>);
    }

    if(!isNaN(minutes) || !isNaN(seconds)) {
      timer = <div className="timer">{`${minutes}:${seconds}`}</div>
    }

    if (this.state.paused) {
      overlay = (
        <div className="board-overlay">
          <article className="message">
            Paused
          </article>
        </div>
      )
    } else {
      overlay = false
    }

    return (
      <div className="board-container">
        <div className="board">
          <GamePanel />
          <div className="housie-number-container row wrap">
            { housie_numbers }
          </div>
        </div>
        {overlay}
      </div>
    );
  }
}

export default HousieNumbers;
