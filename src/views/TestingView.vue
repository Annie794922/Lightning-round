<template>
    <div class="container-fluid col-11 col-md-10 col-1g-12">
        <div class="row">
            <div class="question-block">
                <div class="question-img-block">
                    <img :src="require(`../assets/images/${latestQuestion.image}`)" alt="unknown plant" title="unknown plant">
                </div>
                <div class="question-right-block">
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
                        <OptionsGroup v-bind="option" @catchOptionData="playerReply"></OptionsGroup>
                    </template>
                    <div class="l-button" @click="multiButtons(latestQuestion)">
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
    import OptionsGroup from "../components/OptionsGroup.vue";

    export default {
        components: {
            OptionsGroup
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
            // 10秒倒數計時
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

                        vm.testCompleted;

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
            // 取得從optionsGroup傳出的選項資料存放至data物件中
            playerReply(data) {
                // console.log(data);
                const vm = this;
                
                if ( vm.responded === true ) {
                    alert('本題作答已結束，別再留戀了！');
                    return;
                } else {
                    vm.optionValue = data.optionValue;
                    vm.optionIndex = data.optionIndex;
                    return;
                }
            },
            // 同一個按鈕依不同的文字狀態來執行不同動作
            multiButtons(question) {
                // console.log(question);
                const vm = this;

                switch (vm.buttonStatus) {
                    // 單純判斷是否有選擇答案、切換選項樣式、是否完整作答10題
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
                                vm.message = '可惜答錯了，繼續進行下去吧！';
                            }
                            vm.replyStatusControl();

                            vm.testCompleted;
                        }
                        break;
                    // 該題作答完成後，依是否答題正確&是否有選擇答案(或是時間到)之情況來切換選項樣式、重置data狀態、重啟倒數計時
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

                        vm.resetConditions();
                        vm.$store.commit('changeQuestion');
                        vm.SecondsCountDown();
                        break;
                    // 重置data狀態、路由導向測驗結果頁面
                    case '測驗結果':
                        vm.resetConditions();
                        vm.$store.commit('changeQuestion');
                        vm.$router.push('/result');
                        break;
                }
            },
            // 送出答案後，依是否答對、是否作答之提示文字來切換選項樣式&儲存作答資料
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
                    case '可惜答錯了，繼續進行下去吧！':
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
            },
            // 該題作答結束後重置data物件狀態
            resetConditions() {
                const vm = this;
                
                vm.restSeconds = null;
                vm.optionValue = null;
                vm.optionIndex = null;
                vm.buttonStatus = '確定';
                vm.message = '';
                vm.responded = false;
                vm.answerIndex = null;
            }
        },
        computed: {
            // 題目切換
            latestQuestion() {
                const vm = this;
                const proceedingQuestion = vm.$store.state.questionsData.find(function(item) {
                    return item.id === vm.$store.state.questionOrder;
                });
                console.log(proceedingQuestion);
                return proceedingQuestion;
            },
            // 核對當前題目是否已作答過
            repeatQuestion() {
                const vm = this;
                const repliedQuestion = vm.$store.state.latest.record.some(function(item) {
                    return item.id === vm.$store.state.questionOrder;
                });
                // console.log(repliedQuestion);

                if ( repliedQuestion === true && vm.$store.state.questionOrder === 10 ) {
                    alert('本次測驗已作答完畢，來看看測驗結果吧！');
                    vm.$store.commit('changeQuestion');
                    vm.$router.push('/result');
                    return;
                } else if ( repliedQuestion === true ) {
                    alert('這題已經作答過了，直接帶你前往下一題吧！');
                    vm.$store.commit('changeQuestion');
                    return;
                }
            },
            // 完整作答10題時，另將本次結果存到歷史紀錄
            testCompleted() {
                const vm = this;
                if ( vm.$store.state.latest.record.length === 10 ) {
                    vm.buttonStatus = '測驗結果';

                    // 以建構函式另外定義紀錄成立的物件模型，避免傳址特性影響
                    function newRecord(playerId, playerName, date, record) {
                        this.playerId = playerId;
                        this.playerName = playerName;
                        this.date = date;
                        this.record = record;
                    };

                    const latestRecord = new newRecord(vm.$store.state.latest.playerId, vm.$store.state.latest.playerName, vm.$store.state.latest.date, vm.$store.state.latest.record);
                    vm.$store.commit('updateHistory', latestRecord);
                    return;
                }
            }
        },
        watch: {
            // 監聽點選選項之index值切換作答時的選項樣式
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
            // 生成秒數倒數計時、重複答題核對之方法
            this.SecondsCountDown();
            this.repeatQuestion;
        }
    }
</script>
<style lang="scss" scoped>
@import "../assets/scss/TestingView.scss";

</style>