import AppDispatcher from '../dispatchers/app.dispatcher'
import EventEmitter from 'events'
import ACTION_TYPES from '../constants/action_types'

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
  switch(action.type) {
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
      appStoreInstance.selectedHousieNumbers = action.data.state.board.picks || [];
      appStoreInstance.newPick = action.data.state.board.picks ? action.data.state.board.picks[0]: '-';
      appStoreInstance.gamePaused = action.data.state.status === 'paused'
      appStoreInstance.isGameAdmin = action.data.is_admin
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.PAUSE:
      appStoreInstance.gamePaused = true
      appStoreInstance.gamePausedBy = action.data.user
      appStoreInstance.emitChange();
      break
    case ACTION_TYPES.RESUME:
      appStoreInstance.gamePaused = false
      appStoreInstance.gameResumedBy = action.data.user
      appStoreInstance.emitChange();
      break
    default:
      return
  }
})

export default appStoreInstance
