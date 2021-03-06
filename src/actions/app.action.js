import AppDispatcher from '../dispatchers/app.dispatcher'
import ACTION_TYPES from '../constants/action_types'
import EVENT_TYPES from '../constants/event_types'
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

      AppDispatcher.dispatch({
        type: ACTION_TYPES.JOIN_GAME,
        data: channel
      })

      channel.on(ACTION_TYPES.NEW_PICK, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.NEW_PICK,
          data: payload.pick
        });

        Push.create("Tambola", {
          body: `Picked: ${payload.pick}`,
          timeout: 4000,
          onClick: function() {
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

      channel.on(ACTION_TYPES.NEW_MESSAGE, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.NEW_MESSAGE,
          data: payload
        });
      })

      channel.on(ACTION_TYPES.PAUSE, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.PAUSE,
          data: payload
        })
      })

      channel.on(ACTION_TYPES.RESUME, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.RESUME,
          data: payload
        })
      })

      channel.on(ACTION_TYPES.PRESENCE, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.PRESENCE,
          data: payload
        })
      })

      channel.on(ACTION_TYPES.PRESENCE_DIFF, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.PRESENCE_DIFF,
          data: payload
        })
      })

      channel.on(ACTION_TYPES.AWARD, payload => {
        AppDispatcher.dispatch({
          type: ACTION_TYPES.AWARD,
          data: payload
        })
      })

      channel.join()
        .receive("ok", response => {
          AppDispatcher.dispatch({
            type: ACTION_TYPES.INITIAL_STATE,
            data: response
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
      AppDispatcher.dispatch({
        type: ACTION_TYPES.ADD_GAME,
        data: response
      })
    });

    lobby.on('end_game', response => {
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
  },

  getNotifications(gameId) {
    AppService.getToken().then((response) => response.json()).then((responseJson) => {
      const userToken = responseJson.user_token;

      let channel = socket.channel(`notifications:${gameId}`, {
        token: userToken
      });

      channel.on(EVENT_TYPES.HOSTED, payload => {
        AppDispatcher.dispatch({
          type: EVENT_TYPES.HOSTED,
          data: ""
        });
      })

      channel.join()
        .receive("ok", response => {
          AppDispatcher.dispatch({
            type: EVENT_TYPES.INITIAL_STATE,
            data: response
          });
        })
        .receive("error", response => {
          console.log("Unable to join", response)
        })
    });
  },

  fetchLoggedInUser() {
    AppService.fetchLoggedInUser()
      .then(response => response.json())
      .then(json => 
        AppDispatcher.dispatch({
          type: ACTION_TYPES.GET_LOGGED_IN_USER,
          data: json
        })
      )
  }
}

export default AppAction
