<template>
  <div class="container-fluid">
    <div class="row">
      <div class="test-block">
        <div class="left-block">
          <div class="banner-img">
            <img src="../assets/images/首頁圖.jpg" alt="">
          </div>
          <h1 class="banner-words">
            你對植物品種的認識有多少？<br />
            你所知道的生活中常見植物的名稱都是正確的嗎？<br />
            不妨來挑戰一下這個植物小測驗吧！
          </h1>
        </div>
        <div class="right-block">
          <h2 class="test-rules">
            本測驗共有10題，每一題只有10秒的作答時間，<br />
            透過快問快答的方式來檢視自己是否為植物小達人吧！
          </h2>
          <h3 class="player-confirm">
            在開始答題之前，請先告訴我你的名字吧？
          </h3>
          <input class="player-input" type="text" placeholder="字數上限為15個字" v-model="player">
          <div class="test-button" @click="testStart()">開始作答</div>
          <p class="remind">{{ remind }}</p>
        </div>
      </div>
      <div class="notice">
        <p>*本專案製作之網站僅為個人自主學習之用途，與任何商業行為無關，懇請知悉。</p>
        <p>*Please be informed that the project and the website are created for practicing coding instead of commercial use.</p>
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
      remind: ''
    }
  },
  methods: {
    testStart() {
      const vm = this;

      if (vm.player === '') {
        vm.remind = '你忘記輸入名字了喔！';
        return;
      } else if (vm.player.length > 15) {
        vm.remind = '名字字數不得超過15個字喔！';
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
  @import '../assets/scss/colors.scss';

  .test-block {
    width: 1000px;
    box-shadow: 15px 15px 0 $darkYellow;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0; /* 清除預設css */
  }

  @media screen and (max-width: 992px) {
    .test-block {
      flex-wrap: wrap;
      box-shadow: none;
    }
  }

  .left-block {
    position: relative;
  }

  .banner-img {
    width: 500px;
    height: 680px;
  }

  .banner-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-words {
    position: absolute;
    width: 420px;
    height: 75px;
    color: $white;
    font-size: 19px;
    top: 0; /* 在absolute時，元素本身要有寬高再搭配top/bottom/left/right: 0以及margin: auto才能置中 */
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .right-block {
    width: 500px;
    height: 680px;
    background-color: $lightYellow;
  }

  .test-rules {
    width: 440px;
    color: $darkGreen;
    font-size: 18px;
    margin: 150px auto 50px auto;
  }

  .player-confirm {
    width: 440px;
    color: $darkGreen;
    font-size: 18px;
    margin: 10px auto;
  }

  .player-input {
    width: 260px;
    border: solid 1px $lightBrown;
    padding: 8px;
    margin-left: 30px;
  }

  .test-button {
    width: 180px;
    height: 50px;
    color: $white;
    background-color: $lightBrown;
    text-align: center; 
    line-height: 50px;
    margin: 50px auto 30px auto;
  }

  .test-button:hover {
    background-color: $darkBrown;
    transition: 0.3s;
    cursor: pointer;
  }

  .remind {
    color: $alertRed;
    text-align: center;
  }

  .notice {
    width: 1000px;
    margin: 30px auto;
    display: flex;
    flex-wrap: wrap;
  }

  .notice p {
    color: $lightBrown;
    margin: 0;
  }
</style>
