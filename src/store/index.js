import { createStore } from 'vuex'

export default createStore({
  state: {
    latest: {
      playerId: 0,
      playerName: '',
      record: []
    },
    history: {
      players: [],
      records: []
    }
  },
  getters: {
  },
  mutations: {
    playerData(state, data) {
      state.latest.playerId++;
      data.playerId = state.latest.playerId;

      state.latest.playerName = data.name;
      state.history.players.push(data);

      console.log(state.latest);
      console.log(state.history);
    }
  },
  actions: {
  },
  modules: {
  }
})
