<template>
    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{ selectedPlayer }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#" v-for="info in historyList" @click="getPlayer(info.playerName, info.playerId)">{{ info.playerName }}</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
               historyList: this.$store.state.history,
               selectedPlayer: '請選擇'
            }
        },
        methods: {
            // 將被點選的玩家名稱和id傳至HistoryView父元件
            getPlayer(name, id) {
                this.selectedPlayer = name;

                const playerData = {
                    name: this.selectedPlayer,
                    id: id
                }

                // console.log(playerData);
                this.$emit('getPlayer', playerData);
                return;
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import '../assets/scss/components/PlayerSelector.scss';
</style>