import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';

class HousieNumbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedHousieNumbers: appStoreInstance.selectedHousieNumbers,
      newPick: appStoreInstance.newPick
    }
  }

  componentDidMount () {
      appStoreInstance.addChangeListener(() => {
        this.setState({
          selectedHousieNumbers: appStoreInstance.selectedHousieNumbers,
          newPick: appStoreInstance.newPick
        })
      })
    }

  render() {
    const TOTAL_HOUSIE_NUMBERS = 90;
    let housie_numbers = [],
      selectedHousieNumbers = this.state.selectedHousieNumbers,
      newPick = this.state.newPick;

    for (let index = 1; index <= TOTAL_HOUSIE_NUMBERS; index++) {
      let classNames = `housie-number ${selectedHousieNumbers.indexOf(index) > -1 ? 'selected' : ''} ${index === newPick ? 'new-pick' : ''}`;
      housie_numbers.push(<div key={'housie-number' + index.toString()} className={ classNames }><span>{index}</span></div>);
    }

    return (
      <div className="housie-number-container row wrap">
        { housie_numbers }
      </div>
    );
  }
}

export default HousieNumbers;
