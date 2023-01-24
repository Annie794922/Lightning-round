<template>
  <div class="container-fluid">
    <div class="row">
      <div class="index-block col-10">
        <!-- col網格系統要搭配row才能辦到水平/垂直效果 -->
        <div class="row">
          <div class="left-block col-lg-7">
            <div class="banner-img col">
              <img src="../assets/images/首頁圖.jpg" alt="leaves">
            </div>
            <h1 class="banner-words">
              你對植物品種的認識有多少？<br />
              你所知道的生活中常見植物的名稱都是正確的嗎？<br />
              不妨來挑戰一下這個植物小測驗吧！
            </h1>
          </div>
          <div class="right-block col-lg-5">
            <h2 class="test-rules">
              本測驗共有10題，每一題只有10秒的作答時間，<br />
              透過快問快答的方式來檢視自己是否為植物小達人吧！
            </h2>
            <h3 class="player-confirm">
              在開始答題之前，請先告訴我你的名字吧？
            </h3>
            <input class="player-input" type="text" placeholder="字數上限為15個字" v-model="player">
            <div class="l-button" @click="testStart()">開始作答</div>
            <p class="l-message">{{ message }}</p>
          </div>
        </div>
      </div>
      <div class="notice">
        <p class="notice-cn">*本專案製作之網站僅為個人自主學習之用途，與任何商業行為無關，懇請知悉。</p>
        <p class="notice-en">*Please be informed that the project and the website are created for practicing coding instead of commercial use.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data() {
    return {
      player: '',
      message: ''
    }
  },
  methods: {
    testStart() {
      const vm = this;

      if (vm.player === '') {
        vm.message = '你忘記輸入名字了喔！';
        return;
      } else if (vm.player.length > 15) {
        vm.message = '名字字數不得超過15個字喔！';
        return;
      } else {
        vm.$store.commit('playerData', {
          name: vm.player
        });
        vm.$router.push('/testing');
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/HomeView.scss';
</style>
