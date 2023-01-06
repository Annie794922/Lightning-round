import { createStore } from 'vuex'
import questionsData from "../../public/json/questions.json";

export default createStore({
  state: {
    questionsData: questionsData,
    questionOrder: 1,
    gameEnded: false,
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
      // 測驗初始化
      state.questionOrder = 1;
      state.gameEnded = false;
      state.latest.record = [];

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
      if (state.questionOrder === 10) {
        state.gameEnded = true;
      } else if (state.questionOrder < 10) {
        state.questionOrder++;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
