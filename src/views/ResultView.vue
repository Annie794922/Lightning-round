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
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">序號</th>
                            <th scope="col">正確答案</th>
                            <th scope="col">你的選擇</th>
                            <th scope="col">是否答對</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in latestResult.record">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.answer }}</td>
                                <td>{{ item.playerRespond }}</td>
                                <td>
                                    <span class="correct-mark material-symbols-outlined" v-if="item.isCorrect === true">
                                        done
                                    </span>
                                    <span class="incorrect-mark material-symbols-outlined" v-else-if="item.isCorrect === false">
                                        close
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="l-button" @click="backToTest()">再測一次</div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            backToTest() {
                this.$router.push('/');
                return;
            }
        },
        computed: {
            latestResult() {
                return this.$store.state.latest;
            },
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