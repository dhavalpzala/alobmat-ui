import React, { Component } from 'react';

class HousieNumbers extends Component {
  render() {
    const TOTAL_HOUSIE_NUMBERS = 90;
    let housie_numbers = [];

    for (var index = 1; index <= TOTAL_HOUSIE_NUMBERS; index++) {
      housie_numbers.push(<div key={'housie-number' + index.toString()} className='housie-number'><span>{index}</span></div>);
    }
    return (
      <div className="housie-number-container row wrap">
        { housie_numbers }
      </div>
    );
  }
}

export default HousieNumbers;
