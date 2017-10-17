import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';
import Prize from './Prize';
import ReactMarkdown from 'react-markdown';

class LeftPanel extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 'prizes',
      game: {},
      prizes: []
    }
  }

  componentDidMount () {
    appStoreInstance.addChangeListener(() => {
      this.setState({
        ...this.state,
        game: appStoreInstance.game,
        prizes: appStoreInstance.prizes
      })
    })
  }

  render() {
    const activeTab = this.state.activeTab,
      game = this.state.game,
      prizes = this.state.prizes,
      bulletin = game.details ? game.details.bulletin: "",
      about = game.details ? game.details.about: ""

    prizes.concat([]).sort((p1, p2) => (p2.winner ? p2.winner.id: 0) - (p1.winner? p1.winner.id: 0))

    const prizesComponents = prizes.map((prize, index) => <Prize data={prize} key={`prize-${index}`}></Prize>),
          changeTab = this.changeTab.bind(this);

    return (
      <div className="left-panel">
        <div className="tabs is-fullwidth is-small">
          <ul>
            <li className={activeTab === 'prizes'? 'is-active': ''}><a onClick={() => changeTab('prizes')}>Prizes</a></li>
            <li className={activeTab === 'bulletin'? 'is-active': ''}><a onClick={() => changeTab('bulletin')}>Bulletin</a></li>
            <li className={activeTab === 'about'? 'is-active': ''}><a onClick={() => changeTab('about')}>About</a></li>
          </ul>
        </div>
        <div className="tabs-container" style={{"padding": "0 12px"}}>
          <div className={"tab prizes" + (activeTab === 'prizes'? '': ' is-hidden')}>
            {prizesComponents}
          </div>
          <div className={"tab bulletin" + (activeTab === 'bulletin'? '': ' is-hidden')}>
            <div className="content is-small">
              <ReactMarkdown source={bulletin} />
            </div>
          </div>
          <div className={"tab about" + (activeTab === 'about'? '': ' is-hidden')}>
            <div className="content is-small">
              <ReactMarkdown source={about} />
            </div>
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

export default LeftPanel;
