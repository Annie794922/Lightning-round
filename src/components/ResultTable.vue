<template>
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
            <tr v-for="item in latestResult">
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
        data() {
            return {

            }
        },
        computed: {
            // 最新一次測驗結果
            latestResult() {
                return this.$store.state.latest.record;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/components/ResultTable.scss';
</style>