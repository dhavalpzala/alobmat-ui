import React from 'react'
import ReactDOM from 'react-dom'
import appStoreInstance from '../stores/app.store'

export default class Chat extends React.Component {
  constructor() {
    super()

    this.state = {
      messages: [],
      user: appStoreInstance.currentUser,
      gameChannel: appStoreInstance.gameChannel
    }
  }

  componentDidMount() {
    appStoreInstance.addNewMessageListener(() => {
      this.setState({
        messages: appStoreInstance.messages,
        user: appStoreInstance.currentUser,
        gameChannel: appStoreInstance.gameChannel
      })
    })
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const conversation = this.state.messages,
          messages = conversation.map((c, index) => this.createMessage(c.text, c.user, `chat-${index}`)),
          user = this.state.user

    return (
      <div>
        <div className="messages">
          {messages}
          <div ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className="message-input">
          {this.getMessageInputField(user)}
        </div>
      </div>
    )
  }

  createMessage(text, user, key) {
    return (
      <article className="media" key={key}>
        <figure className="media-left">
          <p className="image is-24x24">
            <img className="image avatar" src={user.avatar_url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.name}</strong>
              <br />
              {text}
            </p>
          </div>
        </div>
      </article>
    )
  }

  _handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.target.value = e.target.value + '\n'
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()

      this.state.gameChannel.push('message', {
        text: e.target.value
      })
      e.target.value = ''
    }
  }

  getMessageInputField(user) {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-16x16">
            <img src={user && user.avatar_url ? user.avatar_url: ''} />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add a comment..." rows="1" onKeyPress={this._handleKeyPress}></textarea>
            </p>
          </div>
          <nav className="level is-hidden">
            <div className="level-left">
              <div className="level-item">
                <a className="button is-info is-small">Submit</a>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <label className="checkbox">
                  <input type="checkbox" /> Press enter to submit
                </label>
              </div>
            </div>
          </nav>
        </div>
      </article>
    )
  }

  scrollToBottom = () => {
    var messages = document.querySelector(".messages");
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }
}
