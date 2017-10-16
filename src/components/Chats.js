import React, { Component } from 'react';

class Chat extends Component {
  render() {

    return (
      <div className="tabs is-fullwidth is-small is-right">
        <ul>
          <li className="is-active"><a>Chat</a></li>
          <li><a>Presence</a></li>
        </ul>
      </div>
    );
  }
}

export default Chat;
