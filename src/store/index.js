import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import questionsData from "../../public/json/questions.json";

export default createStore({
  state: {
    questionsData: questionsData,
    questionOrder: 1,
    gameEnded: false,
    // 最新一次測驗紀錄
    latest: {
      playerId: 0,
      playerName: '',
      date: '',
      record: []
    },
    // 有完整作答完畢的測驗紀錄
    history: []
  },
  getters: {
  },
  mutations: {
    // 測驗開始時儲存玩家資料
    playerData(state, data) {
      // 測驗初始化
      state.questionOrder = 1;
      state.gameEnded = false;
      state.latest.record = [];

      state.latest.playerId++;
      // 在data物件中新增playerId屬性
      data.playerId = state.latest.playerId;

      state.latest.playerName = data.name;
      state.latest.date = data.date;

      console.log(state.latest);
      console.log(state.history);
    },
    // 儲存玩家最近一次測驗的每一題作答情形
    replyRecord(state, data) {
      if ( state.latest.record.length > 10 ) return;
      else {
        state.latest.record.push(data);
      };
    },
    // 該題作答完畢後切換題目
    changeQuestion(state) {
      if ( state.questionOrder === 10 ) {
        state.gameEnded = true;
      } else if ( state.questionOrder < 10 ) {
        state.questionOrder++;
      }
    },
    // 有完整作答完10題時才更新歷史紀錄
    updateHistory(state, data) {
      // console.log(data);
      state.history.push(data);
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState ()]
})
