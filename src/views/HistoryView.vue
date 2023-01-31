<template>
    <div class="container-fluid col-11 col-md-10 col-1g-12">
        <div class="row">
            <div class="l-area-block">
                <div class="l-area-title">
                    歷史紀錄
                </div>
                <div class="zero-record-situation" v-if="this.$store.state.history.length === 0">
                    <h1 class="l-player-message">等等，還沒有遊戲紀錄耶，<br />快去測驗看看吧！</h1>
                </div>
                <template v-if="this.$store.state.history.length > 0">
                    <h1 class="l-player-message">請選擇玩家，即可查看該玩家的遊戲紀錄喔！</h1>
                    <!-- 玩家名稱下拉式選單component -->
                    <PlayerSelector @getPlayer="getDetails"></PlayerSelector>
                    <div class="history-img" v-show="playerDetails.length === 0">
                        <img src="../assets/images/向日葵.jpg" alt="">
                    </div>
                    <template v-for="details in playerDetails">
                        <!-- 遊戲紀錄明細component -->
                        <HistoryDetails v-bind="details"></HistoryDetails>
                    </template>
                </template>                
                <div class="l-button" @click="backToTest()">回首頁</div>
            </div>
        </div>
    </div>
</template>
<script>
    import PlayerSelector from '../components/PlayerSelector.vue';
    import HistoryDetails from '../components/HistoryDetails.vue';

    export default {
        components: {
            PlayerSelector,
            HistoryDetails
        },
        data() {
            return {
                playerDetails: []
            }
        },
        methods: {
            // 接收PlayerSelector子元件傳出的玩家名稱和id並篩選遊戲紀錄
            getDetails(data) {
                // console.log(data);

                const playerDetails = this.$store.state.history.filter(function(item) {
                    return item.playerId === data.id && item.playerName === data.name;
                });
                this.playerDetails = playerDetails;
            },
            // 返回測驗首頁
            backToTest() {
                this.$router.push('/');
                return;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/HistoryView.scss';
</style>