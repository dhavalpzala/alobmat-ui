import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';

class HousieNumbers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedHousieNumbers: appStoreInstance.selectedHousieNumbers
    }
  }

  componentDidMount () {
      appStoreInstance.addChangeListener(() => {
        this.setState({
          selectedHousieNumbers: appStoreInstance.selectedHousieNumbers
        })
      })
    }

  render() {
    const TOTAL_HOUSIE_NUMBERS = 90;
    let housie_numbers = [];
    let selectedHousieNumbers = this.state.selectedHousieNumbers;
    for (var index = 1; index <= TOTAL_HOUSIE_NUMBERS; index++) {
      housie_numbers.push(<div key={'housie-number' + index.toString()} className={ selectedHousieNumbers.indexOf(index) > -1 ? 'housie-number selected': 'housie-number' }><span>{index}</span></div>);
    }
    return (
      <div className="housie-number-container row wrap">
        { housie_numbers }
      </div>
    );
  }
}

export default HousieNumbers;
