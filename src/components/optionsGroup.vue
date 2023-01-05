<template>
    <div class="options-group">
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

                this.$emit('catchOptionData', {
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