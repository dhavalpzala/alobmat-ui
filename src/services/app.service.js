const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const AppService = {
  getAllGames() {
    return fetch(`/api/games`, {
      method: 'GET',
      credentials: "same-origin",
      headers: headers
    })
  },
  createGame(gameName, interval) {
    return fetch(`/api/games`, {
      method: 'POST',
      headers: headers,
      credentials: "same-origin",
      body: JSON.stringify({
        name: gameName,
        interval: interval
      })
    })
  },
  pauseGame(gameId) {
    return fetch(`/api/games/${gameId}/pause`, {
      method: 'POST',
      headers: headers,
      credentials: "same-origin",
      body: JSON.stringify({})
    })
  },
  resumeGame(gameId) {
    return fetch(`/api/games/${gameId}/resume`, {
      method: 'POST',
      headers: headers,
      credentials: "same-origin",
      body: JSON.stringify({})
    })
  },
  getGame(gameId) {

  },
  getToken() {
    return fetch(`/api/auth/token`, {
      method: 'GET',
      headers: headers,
      credentials: "same-origin"
    })
  }
}

export default AppService
