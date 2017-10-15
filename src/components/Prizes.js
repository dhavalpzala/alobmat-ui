import React, { Component } from 'react';

class Prizes extends Component {
  render() {

    return (
      <div className="tabs">
        <ul>
          <li className="is-active"><a>Prizes</a></li>
          <li><a>Bulletin</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    );
  }
}

export default Prizes;
