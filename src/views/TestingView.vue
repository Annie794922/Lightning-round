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
                    <div class="l-button" @click="confirm(latestQuestion)">
                        {{ buttonStatus }}
                    </div>
                    <p class="l-message">{{ message }}</p>
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
                message: '',
                responded: false,
                answerIndex: null
            }   
        },
        methods: {
            SecondsCountDown() {
                const vm = this;
                let restSeconds = 10;

                function countDown() {
                    let countOnce = setTimeout(countDown, 1000);

                    if ( vm.responded === true ) {
                        window.clearTimeout(countOnce);
                        return;
                    } else if ( restSeconds === 1 ) {
                        // 到數至1秒時在判斷式內再-1避免時間差
                        restSeconds--;
                        vm.restSeconds = restSeconds;
                        window.clearTimeout(countOnce);
                        // 若有引入import { clearTimeout } from "timers"; 需添加window才能找到clearTimeout清除定時器

                        vm.responded = true;
                        vm.buttonStatus = '下一題';
                        vm.message = '作答時間到了，再接再厲！';
                        vm.replyStatusControl();
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
                
                if ( vm.responded === true ) {
                    alert('本題作答已結束，趕快前往下一題吧！');
                    return;
                } else {
                    vm.optionValue = data.optionValue;
                    vm.optionIndex = data.optionIndex;
                    return;
                }
            },
            confirm(question) {
                // console.log(question);
                const vm = this;

                switch (vm.buttonStatus) {
                    case '確定':
                        if ( vm.optionValue === null ) {
                            vm.message = '你尚未作答喔！';
                            return;
                        } else if ( vm.optionValue !== null && vm.responded === false ) {
                            vm.responded = true;
                            vm.buttonStatus = '下一題';

                            if ( vm.optionValue === question.answer ) {
                                vm.message = '恭喜你答對囉！';
                            } else if ( vm.optionValue !== question.answer ) {
                                vm.message = '可惜答錯了，繼續挑戰下去吧！';
                            }
                            vm.replyStatusControl();
                        }
                        break;
                    case '下一題':
                        const options = document.querySelectorAll('.option-block');

                        switch ( vm.optionIndex === vm.answerIndex ) {
                            case true:
                                options[vm.optionIndex].classList.remove('correct-option');
                                options[vm.optionIndex].classList.add('hovered-option');
                                break;
                            case false:
                                switch ( vm.optionIndex === null ) {
                                    case true:
                                        options[vm.answerIndex].classList.remove('correct-option');
                                        options[vm.answerIndex].classList.add('hovered-option');
                                        break;
                                    case false:
                                        options[vm.optionIndex].classList.remove('false-option');
                                        options[vm.optionIndex].classList.add('hovered-option');
                                        options[vm.answerIndex].classList.remove('correct-option');
                                        options[vm.answerIndex].classList.add('hovered-option');
                                        break;
                                }
                                break;
                        }

                        vm.restSeconds = null;
                        vm.optionValue = null;
                        vm.optionIndex = null;
                        vm.buttonStatus = '確定';
                        vm.message = '';
                        vm.responded = false;
                        vm.answerIndex = null;

                        vm.$store.commit('changeQuestion');
                        vm.SecondsCountDown();
                        break;
                }
            },
            replyStatusControl() {
                const vm = this;
                const options = document.querySelectorAll('.option-block');

                const currentQuestion = vm.$store.state.questionsData.find(function(question) {
                    return question.id === vm.$store.state.questionOrder;
                });
                const answerItem = currentQuestion.options.find(function(item) {
                    return item.value === currentQuestion.answer;
                } );
                const answerIndex = currentQuestion.options.indexOf(answerItem);

                // console.log(answerItem);
                // console.log('answerIndex: '+ answerIndex);

                switch (vm.message) {
                    case '恭喜你答對囉！':
                        vm.answerIndex = vm.optionIndex;
                        options[vm.optionIndex].classList.remove('hovered-option', 'clicked-option');
                        options[vm.optionIndex].classList.add('correct-option');

                        vm.$store.commit('replyRecord', {
                            id: currentQuestion.id,
                            answer: currentQuestion.answer,
                            playerRespond: vm.optionValue,
                            isCorrect: true
                        });
                        break;
                    case '可惜答錯了，繼續挑戰下去吧！':
                        vm.answerIndex = answerIndex;
                        options[vm.optionIndex].classList.remove('hovered-option', 'clicked-option');
                        options[vm.optionIndex].classList.add('false-option');
                        options[vm.answerIndex].classList.remove('hovered-option');
                        options[vm.answerIndex].classList.add('correct-option');

                        vm.$store.commit('replyRecord', {
                            id: currentQuestion.id,
                            answer: currentQuestion.answer,
                            playerRespond: vm.optionValue,
                            isCorrect: false
                        });
                        break;
                    case '作答時間到了，再接再厲！':
                        vm.answerIndex = answerIndex;
                        if ( vm.optionIndex === null ) {
                            options[vm.answerIndex].classList.remove('hovered-option');
                            options[vm.answerIndex].classList.add('correct-option');
                        } else if ( vm.optionIndex !== null ) {
                            options[vm.optionIndex].classList.remove('clicked-option');
                            options[vm.optionIndex].classList.add('hovered-option');
                            options[vm.answerIndex].classList.remove('hovered-option');
                            options[vm.answerIndex].classList.add('correct-option');
                        }
                        vm.$store.commit('replyRecord', {
                            id: currentQuestion.id,
                            answer: currentQuestion.answer,
                            playerRespond: 'Time is up.',
                            isCorrect: false
                        });
                        break;
                }
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

                if ( typeof newIndex === 'number' && oriIndex === null ) {
                    options[newIndex].classList.add('clicked-option');
                    options[newIndex].classList.remove('hovered-option');
                } else if ( newIndex === oriIndex ) return; // watch對象狀態未異動時不會被觸發，因此這句判斷不寫也ok
                else if ( newIndex !== oriIndex && typeof oriIndex === 'number' && typeof newIndex === 'number' ) {
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