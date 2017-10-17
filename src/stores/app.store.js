import AppDispatcher from '../dispatchers/app.dispatcher'
import EventEmitter from 'events'
import ACTION_TYPES from '../constants/action_types'
import EVENT_TYPES from '../constants/event_types'

const CHANGE_EVENT = 'change'

export class AppStore extends EventEmitter {
  constructor() {
    super()
    this.games = [];
    this.selectedHousieNumbers = [];
    this.newPick = undefined;
    this.timeToPick = undefined;
    this.gamePaused = false;
    this.isGameAdmin = false;
    this.prizes = [];
    this.currentUser = {};
    this.presence = [];
    this.messages = [];
    this.gameChannel = undefined;
    this.notifications = [];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

let appStoreInstance = new AppStore()

appStoreInstance.dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case ACTION_TYPES.NEW_PICK:
      appStoreInstance.newPick = action.data;
      appStoreInstance.timeToPick = 0;
      appStoreInstance.selectedHousieNumbers.push(action.data);
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.TIME_TO_PICK:
      appStoreInstance.timeToPick = action.data;
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.NEW_MESSAGE:
      appStoreInstance.messages = appStoreInstance.messages.concat([action.data])
      appStoreInstance.emitChange()
      break
    case ACTION_TYPES.GET_ALL_GAMES:
      appStoreInstance.games = action.data;
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.ADD_GAME:
      appStoreInstance.games = [action.data, ...appStoreInstance.games]
      appStoreInstance.emitChange()
      break
    case ACTION_TYPES.REMOVE_GAME:
      appStoreInstance.games = appStoreInstance.games.filter(game => game.id !== action.data)
      appStoreInstance.emitChange()
      break
    case ACTION_TYPES.INITIAL_STATE:
      appStoreInstance.game = action.data.game;
      if (action.data.state.board) {
        appStoreInstance.selectedHousieNumbers = action.data.state.board.picks || [];
        appStoreInstance.newPick = action.data.state.board.picks ? action.data.state.board.picks[0] : '-';
      }
      appStoreInstance.gamePaused = action.data.state.status === 'paused'
      appStoreInstance.isGameAdmin = action.data.is_admin
      appStoreInstance.prizes = action.data.game.prizes;
      appStoreInstance.currentUser = action.data.user
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.PAUSE:
      appStoreInstance.gamePaused = true
      appStoreInstance.gamePausedBy = action.data.user
      appStoreInstance.notifications = ([{
        type: EVENT_TYPES.PAUSED,
        data: {
          source: action.data.user
        }
      }]).concat(appStoreInstance.notifications)
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.RESUME:
      appStoreInstance.gamePaused = false
      appStoreInstance.gameResumedBy = action.data.user
      appStoreInstance.notifications = ([{
        type: EVENT_TYPES.RESUMED,
        data: {
          source: action.data.user
        }
      }]).concat(appStoreInstance.notifications)
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.AWARD:
      appStoreInstance.prizes = appStoreInstance.prizes.filter(p => p.id !== action.data.prize.id)
      appStoreInstance.prizes = [action.data.prize].concat(appStoreInstance.prizes)
      appStoreInstance.notifications = ([{
        type: EVENT_TYPES.AWARDED,
        data: {
          source: action.data.awardee,
          prize: action.data.prize,
          winner: action.data.prize.winner
        }
      }]).concat(appStoreInstance.notifications)
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.PRESENCE:
      appStoreInstance.presence = Object.keys(action.data).map(key => ({
        id: key,
        name: action.data[key].metas[0].name,
        last_online: action.data[key].metas[0].online_at,
        avatar_url: action.data[key].metas[0].avatar_url
      }))
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.PRESENCE_DIFF:
      appStoreInstance.presence = Object.keys(action.data.leaves).reduce((presence, id) => presence.filter(p => p.id !== id), appStoreInstance.presence)
      appStoreInstance.presence = Object.keys(action.data.joins).map(key => {
        const length = action.data.joins[key].metas.length,
              meta   = action.data.joins[key].metas[length - 1]

        return {
          id: key,
          name: meta.name,
          last_online: meta.online_at,
          avatar_url: meta.avatar_url
        }
      }).concat(appStoreInstance.presence)
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.JOIN_GAME:
      appStoreInstance.gameChannel = action.data
      break
    default:
      return
  }
})

export default appStoreInstance
