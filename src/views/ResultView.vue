<template>
    <div class="container-fluid col-11 col-md-10 col-1g-12">
        <div class="row">
            <div class="l-area-block">
                <div class="l-area-title">
                    測驗結果
                </div>
                <div class="not-ended-situation" v-if="this.$store.state.gameEnded === false">
                    <h1 class="l-player-message">沒有完整答題是不會有測驗結果的，<br />趕快回去挑戰吧！</h1>
                    <div class="l-button" @click="backToTest()">回首頁</div>
                </div>
                <template v-if="this.$store.state.gameEnded === true">
                    <h1 class="l-player-message">{{ latestResult.playerName }}, 你本次的答對題數為 {{ correctQuestions.length }} 題！</h1>
                    <!-- 測驗結果表格component -->
                    <ResultTable />
                    <div class="l-button" @click="backToTest()">再測一次</div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import ResultTable from '../components/ResultTable.vue';

    export default {
        components: {
            ResultTable
        },
        data() {
            return {

            }
        },
        methods: {
            // 返回測驗首頁
            backToTest() {
                this.$router.push('/');
                return;
            }
        },
        computed: {
            // 最新一次測驗結果
            latestResult() {
                return this.$store.state.latest;
            },
            // 從結果中找出答題正確的那些題目
            correctQuestions() {
                const correctItems = this.$store.state.latest.record.filter(function(item) {
                    return item.isCorrect === true;
                });
                // console.log(correctItems);
                return correctItems;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/ResultView.scss';
</style>