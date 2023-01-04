<template>
    <div class="container-fluid col-11 col-md-10 col-1g-12">
        <div class="row">
            <div class="l-question-block">
                <div class="l-question-img-block">
                    <img :src="require(`../assets/images/${latestQuestion.image}`)" alt="unknown plant">
                </div>
                <div class="l-question-right-block">
                    <div class="question-order">
                        {{ latestQuestion.id }}
                    </div>
                    <h1 class="question-title">
                        {{ latestQuestion.title }}
                    </h1>
                    <p class="rest-time">
                        還有 {{ restSeconds }} 秒可以作答
                    </p>
                    <!-- 選項組拉一個component出來 -->
                    <template v-for="option in latestQuestion.options">
                        <optionsGroup v-bind="option" @catchOptionData="playerReply"></optionsGroup>
                    </template>
                    <div class="l-button" @click="confirm()">
                        {{ buttonStatus }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { clearTimeout } from "timers";
    import optionsGroup from "../components/optionsGroup.vue";

    export default {
        components: {
            optionsGroup
        },
        data() {
            return {
                restSeconds: null,
                optionValue: null,
                optionIndex: null,
                buttonStatus: '確定',
                playerAnswered: false 
            }   
        },
        methods: {
            SecondsCountDown() {
                const vm = this;
                let restSeconds = 10;

                function countDown() {
                    let countOnce = setTimeout(countDown, 1000);

                    if ( vm.playerAnswered === true ) {
                        window.clearTimeout(countOnce);
                        return;
                    } else if ( restSeconds === 1 ) {
                        // 到數至1秒時在判斷式內再-1避免時間差
                        restSeconds--;
                        vm.restSeconds = restSeconds;
                        window.clearTimeout(countOnce);
                        // console.log('SetTimeOut is removed.');
                        // 若有引入import { clearTimeout } from "timers"; 需添加window才能找到clearTimeout清除定時器
                        return;
                    } else {
                        restSeconds--;
                        vm.restSeconds = restSeconds;
                        // console.log(restSeconds);
                    };
                };

                countDown();
                // Error: Can't resolve 'timers' in XXX -- timer相關依賴未安裝
                // 解決方式: npm install --save stream timers
            },
            playerReply(data) {
                // console.log(data);
                const vm = this;
                vm.optionValue = data.optionValue;
                vm.optionIndex = data.optionIndex;
                return;
            },
            confirm() {
                const vm = this;
                vm.playerAnswered = true;
                vm.buttonStatus = '下一題';
            }
        },
        computed: {
            latestQuestion() {
                const vm = this;
                const proceedingQuestion = vm.$store.state.questionsData.find(function(item) {
                    return item.id === vm.$store.state.questionOrder;
                });
                console.log(proceedingQuestion);
                return proceedingQuestion;
            }
        },
        watch: {
            optionIndex(newIndex, oriIndex) {
                console.log('new: '+ newIndex);
                console.log('old: '+ oriIndex);

                const options = document.querySelectorAll('.option-block');
                // 綁定子元件optionsGroup裡的.option-block元素

                if ( newIndex !== null && oriIndex === null ) {
                    options[newIndex].classList.add('clicked-option');
                    options[newIndex].classList.remove('hovered-option');
                } else if ( newIndex === oriIndex ) return; // watch對象狀態未異動時不會被觸發，因此這句判斷不寫也ok
                else if ( newIndex !== oriIndex ) {
                    options[newIndex].classList.add('clicked-option');
                    options[newIndex].classList.remove('hovered-option');
                    options[oriIndex].classList.add('hovered-option');
                    options[oriIndex].classList.remove('clicked-option');
                }
            }
        },
        created() {
            this.SecondsCountDown();
        }
    }
</script>
<style lang="scss" scoped>
@import "../assets/scss/TestingView.scss";

</style>