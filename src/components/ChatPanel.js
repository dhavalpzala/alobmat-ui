import React, { Component } from 'react';
import Presence from './Presence'
import Chat from './Chat'

class ChatPanel extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 'chat'
    }
  }

  render() {
    const chatEnabled = this.state.activeTab === 'chat',
          presenceEnabled = this.state.activeTab === 'presence',
          activeTab = this.state.activeTab,
          changeTab = this.changeTab.bind(this);

    return (
      <div className="chat-panel">
        <div className="tabs is-fullwidth is-small is-right">
          <ul>
            <li className={activeTab === 'chat'? 'is-active': ''}><a onClick={() => changeTab('chat')}>Chat</a></li>
            <li className={activeTab === 'presence'? 'is-active': ''}><a onClick={() => changeTab('presence')}>Presence</a></li>
          </ul>
        </div>
        <div className="tabs-container">
          <div className={"chat " +  (!chatEnabled?'is-hidden':'')}>
            <Chat />
          </div>
          <div className={"presence " + (!presenceEnabled?'is-hidden':'')}>
            <Presence />
          </div>
        </div>
      </div>
    );
  }

  changeTab(tab) {
    this.setState({
      ...this.state,
      activeTab: tab
    })
  }
}

export default ChatPanel;
