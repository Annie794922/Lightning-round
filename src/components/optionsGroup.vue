<template>
    <div class="options-group">
        <!-- 由於從父層運用v-for + v-bind的方式將選項傳進來，搭配:class使用判斷式會導致每個選項被點擊之後都呈現相同效果，無法達到樣式切換 -->
        <!-- 因此採取在父層利用watch監控data物件中的狀態變化之方法來切換樣式 -->
        <div class="option-block hovered-option" @click="chosenOption(value)">
            {{ label }}
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            "label": String,
            "value": String
        },
        data() {
            return {

            }
        },
        methods: {
            // 將選取的選項資料傳至父層
            chosenOption(plant) {
                console.log(plant);
                const vm = this;
                const currentQuestion = vm.$store.state.questionsData.find(function(item) {
                    return item.id === vm.$store.state.questionOrder;
                });
                const chosenPlant = currentQuestion.options.find(function(item) {
                    return item.value === plant;
                });
                const optionIndex = currentQuestion.options.indexOf(chosenPlant);
                // console.log(optionIndex);

                vm.$emit('catchOptionData', {
                    optionValue: plant,
                    optionIndex: optionIndex
                });
                return;
            }
        }
    }

</script>
<style lang="scss" scoped>
@import "../assets/scss/components/optionsGroup.scss";

</style>