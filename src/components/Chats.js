import React, { Component } from 'react';
import Presence from './Presence'

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 'presence'
    }
  }

  render() {
    const chatEnabled = this.state.activeTab === 'chat',
          presenceEnabled = this.state.activeTab === 'presence'

    return (
      <div className="chat-panel">
        <div className="tabs is-fullwidth is-small is-right">
          <ul>
            <li className="is-active"><a>Chat</a></li>
            <li><a>Presence</a></li>
          </ul>
        </div>
        <div className="tabs-container">
          <div className={"chat " +  (!chatEnabled?'is-hidden':'')}></div>
          <div className={"presence " + (!presenceEnabled?'is-hidden':'')}>
            <Presence />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
