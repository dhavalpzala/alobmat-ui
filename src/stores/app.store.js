import AppDispatcher from '../dispatchers/app.dispatcher'
import AppAction from '../actions/app.action'
import EventEmitter from 'events'
import ACTION_TYPES from '../constants/action_types'

const CHANGE_EVENT = 'change'

export class AppStore extends EventEmitter {
    constructor() {
        super()
        this.selectedHousieNumbers = [];
    }

    emitChange() {
      this.emit(CHANGE_EVENT)
    }

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
}

let appStoreInstance = new AppStore()

appStoreInstance.dispatchToken = AppDispatcher.register(action => {
  switch(action.type) {
    case ACTION_TYPES.NEW_PICK:
      appStoreInstance.selectedHousieNumbers.push(action.data);
      appStoreInstance.emitChange()
      break

    default:
      return
  }
})

export default appStoreInstance
