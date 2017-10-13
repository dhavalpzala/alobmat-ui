import AppDispatcher from '../dispatchers/app.dispatcher'
import ACTION_TYPES from '../constants/action_types'
import AppService from '../services/app.service'
import socket from "../socket";

const AppAction = {
  joinGame(gameId) {
    let channel = socket.channel(`game:${gameId}`, {
      token: window.userToken
    });

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
  },

  createGame(gameName, interval) {
    AppService.createGame(gameName, interval);
  },

  getAllGames() {
    AppService.getAllGames().then((response) => response.json()).then((responseJson) => {
      AppDispatcher.dispatch({
        type: ACTION_TYPES.GET_ALL_GAMES,
        data: responseJson.games
      });
    });

    let lobby = socket.channel(`public:lobby`, {});

    lobby.on("new_game", (response) => {
      this.getAllGames();
    });

    lobby.on("end_game", () => {
      this.getAllGames();
    });

    lobby.join()
      .receive("ok", resp => {
        console.log("Lobby joined, currently running: ", resp)
      })
      .receive("error", resp => {
        console.log("Failed to join lobby")
      });
  },

  getToken() {
    AppService.getToken();
  }
}

export default AppAction
