import AppDispatcher from '../dispatchers/app.dispatcher'
import ACTION_TYPES from '../constants/action_types'
import socket from "../socket";

const AppAction = {
  joinGame(gameId) {
    let channel = socket.channel(`game:${gameId}`, {});

    channel.on(ACTION_TYPES.NEW_PICK, payload => {
      AppDispatcher.dispatch({
        type: ACTION_TYPES.NEW_PICK,
        data: payload.pick
      });
    })

    channel.on(ACTION_TYPES.TIME_TO_PICK, payload => {
      AppDispatcher.dispatch({
        type: ACTION_TYPES.TIME_TO_PICK,
        data: payload.remaining
      });
    })

    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp)
      })
      .receive("error", resp => {
        console.log("Unable to join", resp)
      })
  }
}

export default AppAction
