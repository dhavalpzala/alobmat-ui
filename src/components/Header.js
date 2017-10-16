import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar is-transparent is-link">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            TAMBOLA
          </a>

          <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
            <span className="icon" style={{ color: "#333" }}>
              <i className="fa fa-lg fa-github" />
            </span>
          </a>

          <div className="navbar-burger burger" data-target="navMenuTransparentExample">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenuTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-hidden-desktop-only" href="https://www.github.com/hashd/alobmat" target="_blank">
              <span className="icon" style={{ color: "#fafafa" }}>
                <i className="fa fa-lg fa-github" />
              </span>
            </a>

            <div className="navbar-item">
              <div className="field is-grouped">
                <div className="control">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a
                      className="button is-primary"
                      href="#"
                    >
                      <span className="icon">
                        <i className="fa fa-user-circle-o" />
                      </span>
                      <span>User</span>
                    </a>
                    <div className="navbar-dropdown is-boxed">
                      <a className="navbar-item " href="/documentation/overview/start/">
                        About
                      </a>

                      <hr className="navbar-divider" />
                      <a className="navbar-item" href="/auth/logout">
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
