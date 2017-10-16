import AppDispatcher from '../dispatchers/app.dispatcher'
import ACTION_TYPES from '../constants/action_types'
import AppService from '../services/app.service'
import socket from "../socket";
import Push from 'push.js';

const AppAction = {
  joinGame(gameId) {
    AppService.getToken().then((response) => response.json()).then((responseJson) => {
      const userToken = responseJson.user_token;

      let channel = socket.channel(`game:${gameId}`, {
        token: userToken
      });

      channel.on(ACTION_TYPES.NEW_PICK, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.NEW_PICK,
          data: payload.pick
        });

        Push.create("Tambola", {
            body: `Picked: ${payload.pick}`,
            timeout: 4000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
      })

      channel.on(ACTION_TYPES.TIME_TO_PICK, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.TIME_TO_PICK,
          data: payload.remaining
        });
      })

      channel.join()
      .receive("ok", response => {
        console.log(response);
        AppDispatcher.dispatch({
          type: ACTION_TYPES.INITIAL_STATE,
          data: response.state
        });
      })
      .receive("error", response => {
        console.log("Unable to join", response)
      })
    });
  },

  createGame(gameName, interval) {
    AppService.createGame(gameName, interval);
  },

  joinLobby() {
    let lobby = socket.channel(`public:lobby`, {});

    lobby.on('new_game', response => {
      console.log(ACTION_TYPES.ADD_GAME, response);
      AppDispatcher.dispatch({
        type: ACTION_TYPES.ADD_GAME,
        data: response
      })
    });

    lobby.on('end_game', response => {
      console.log(ACTION_TYPES.REMOVE_GAME, response);
      AppDispatcher.dispatch({
        type: ACTION_TYPES.REMOVE_GAME,
        data: response.id
      })
    });

    lobby.join()
      .receive("ok", resp => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.GET_ALL_GAMES,
          data: resp.active_games
        });
      })
      .receive("error", resp => {
        console.log("Failed to join lobby")
      });
  },

  getAllGames() {
    AppService.getAllGames().then((response) => response.json()).then((responseJson) => {
      AppDispatcher.dispatch({
        type: ACTION_TYPES.GET_ALL_GAMES,
        data: responseJson.games
      });
    });    
  },

  getToken() {
    AppService.getToken();
  }
}

export default AppAction
