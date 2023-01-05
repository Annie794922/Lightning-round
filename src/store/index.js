import { createStore } from 'vuex'
import questionsData from "../../public/json/questions.json";

export default createStore({
  state: {
    questionsData: questionsData,
    questionOrder: 1,
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
      state.questionOrder = 1;

      state.latest.playerId++;
      data.playerId = state.latest.playerId;

      state.latest.playerName = data.name;
      state.history.players.push(data);

      console.log(state.latest);
      console.log(state.history);
    },
    replyRecord(state, data) {
      state.latest.record.push(data);
      state.history.records.push(data);

      console.log(state.latest.record);
      console.log(state.history.records);
    },
    changeQuestion(state) {
      state.questionOrder++;
    }
  },
  actions: {
  },
  modules: {
  }
})
