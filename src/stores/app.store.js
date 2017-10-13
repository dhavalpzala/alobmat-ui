import AppDispatcher from '../dispatchers/app.dispatcher'
import AppAction from '../actions/app.action'
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

    case ACTION_TYPES.INITIAL_STATE:
      appStoreInstance.selectedHousieNumbers = action.data.picks || [];
      appStoreInstance.emitChange();
      break
    default:
      return
  }
})

export default appStoreInstance
