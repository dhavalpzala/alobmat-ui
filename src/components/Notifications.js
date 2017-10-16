import React, { Component } from 'react';
import appStoreInstance from '../stores/app.store';
import EVENT_TYPES from '../constants/event_types'

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notifications: appStoreInstance.notifications
    }
  }

  render() {
    let notifications_list = [],
      notifications = this.state.notifications;

    const user = (name, avatar_url) => {
      return <div className="event-user row">
          <figure className="image is-24x24">
            <img className="is-circle" src={avatar_url} alt="Placeholder image" />
          </figure>
          <div className="event-user-name">{name}</div>
      </div>
    };

    notifications.forEach((notification, index) => {
      switch (notification.type) {
        case EVENT_TYPES.HOSTED:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>hosted the game</span>
          </div>)
          break;
        case EVENT_TYPES.RESUMED:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>resumed the game</span>
          </div>)
          break;
        case EVENT_TYPES.PAUSED:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>paused the game</span>
          </div>)
          break;
        case EVENT_TYPES.JOINED:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>joined the game</span>
          </div>)
          break;
        case EVENT_TYPES.START_GAME:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>started the game</span>
          </div>)
          break;
        case EVENT_TYPES.AWARDED:
          notifications_list.push(<div className='row event-notification wrap' key={ 'notification-' + index}>
            { user(notification.data.source.name, notification.data.source.avatar_url) }
            <span>awarded the <strong>{notification.data.prize.name}</strong> prize to </span>
            {user(notification.data.winner.name, notification.data.winner.avatar_url)}
          </div>)
          break;
      }
    });

    return (
      <div className="event-notifications">
        <div className="tabs is-fullwidth is-small is-right">
          <ul>
            <li className="is-active"><a>Notifications</a></li>
          </ul>
        </div>
        <div>
          {notifications_list}
        </div>
      </div>
    );
  }
}

export default Notifications;
