import React, { Component } from "react";
import appStoreInstance from '../stores/app.store';
import AppAction from '../actions/app.action'
import AdminPanel from './AdminPanel'
import Cookie from 'js-cookie'

class Header extends Component {
  constructor() {
    super()

    this.state = {
      game: {},
      user: {}
    }
  }

  componentDidMount() {
    appStoreInstance.addChangeListener(() => {
      this.setState({
        game: appStoreInstance.game,
        user: appStoreInstance.currentUser
      })
    });
  }

  render() {
    const game = this.state.game,
          name = game.name || '',
          owner = game.owner ? game.owner.name: '',
          avatar = game.owner ? game.owner.avatar_url: '',
          user = this.state.user

    return (
      <nav className="navbar is-transparent is-link">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <i className="fa fa-lg fa-arrow-circle-o-left" />
          </a>
          <div className="navbar-item" href="/">
            {name} by <img className="image is-rounded is-24x24" src={avatar} placeholder="avatar" style={{margin:"0 6px 0 12px"}} /> {owner}
          </div>

          <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
            <span className="icon" style={{ color: "#333" }}>
              <i className="fa fa-lg fa-github" />
            </span>
          </a>

          <div className="navbar-item">
            <AdminPanel />
          </div>
          <div className="navbar-burger burger" data-target="navMenuTransparentExample">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenuTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <div className="control">
                  {
                  (user && user.id) ?
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a className="button is-link" href="#">
                        <span className="icon">
                          <img className="image avatar" src={user.avatar_url}/>
                        </span>
                        <span>{user.name}</span>
                      </a>
                      <div className="navbar-dropdown is-right">
                        <a className="navbar-item" href="/app/auth/logout">
                          Logout
                        </a>
                      </div>
                    </div>
                  :
                    <a className="button is-small is-link" href="/app/auth/google">
                      <span onClick={this.setRedirectUrlCookie}>Login</span>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  setRedirectUrlCookie = () => {
    Cookie.set('ui_redirect_url', window.location.href)
  }
}

export default Header;
