<template>
    <div class="history-info">
        <h3 class="playing-date">遊戲日期：{{ date }}</h3>
        <h3 class="correct-questions">答對題數：{{ correctQuestions.length }}</h3>
    </div>
    <!-- 以l-table來設定table的layout樣式，由於放在前方會影響Bootstrap預設樣式，因此該順序寫在class名稱最後方 -->
    <table class="table table-striped l-table w-75">
        <thead>
            <tr>
                <th scope="col">序號</th>
                <th scope="col">正確答案</th>
                <th scope="col">你的選擇</th>
                <th scope="col">是否答對</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in record">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.answer }}</td>
                <td>{{ item.playerRespond }}</td>
                <td>
                    <span class="l-correct-mark material-symbols-outlined" v-if="item.isCorrect === true">
                        done
                    </span>
                    <span class="l-incorrect-mark material-symbols-outlined" v-else-if="item.isCorrect === false">
                        close
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        props: {
            "playerId": Number,
            "playerName": String,
            "date": String,
            "record": Object
        },
        data() {
            return {

            }
        },
        computed: {
            // 從遊戲紀錄中找出答題正確的那些題目
            correctQuestions() {
                const correctItems = this.record.filter(function(item) {
                    return item.isCorrect === true;
                });
                return correctItems;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/components/HistoryDetails.scss';
</style>