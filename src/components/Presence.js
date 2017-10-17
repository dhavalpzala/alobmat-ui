import React from 'react'
import appStoreInstance from '../stores/app.store'

export default class Presence extends React.Component {
  constructor() {
    super()

    this.state = {
      presence: []
    }
  }

  componentDidMount() {
    appStoreInstance.addChangeListener(() => {
      this.setState({
        presence: appStoreInstance.presence
      })
    })
  }

  render() {
    const presence = this.state.presence

    let presenceRows = presence.map(p => (
      <div className="level presence-record">
        <div className="level-left">
          <div className="level-item">
            <i class="fa fa-circle"></i>
          </div>
          <div className="level-item"><img src={p.avatar_url} className="image avatar is-24x24" /></div>
          <div className="level-item">{p.name}</div>
        </div>
      </div>
    ))

    return (
      <div>
        {presenceRows}
      </div>
    )
  }
}