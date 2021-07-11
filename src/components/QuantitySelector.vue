<template>
    <div class="item__quantity">
        <button @click="decrement" class="square">-</button>
        <span class="item__quantity__value">{{quantity}}</span>
        <button @click="increment" class="square">+</button>
    </div>
</template>

<script>
export default {
    props: {
        qty: Number,
        id: Number
    },
    data() {
        return {
            quantity: this.qty
        }
    },
    methods: {
        increment() {
            this.quantity += 1,
            this.$emit('changedQuantity', {quantity: this.quantity})
        },
        decrement() {
            if(this.quantity > 1) {
                this.quantity -= 1
            }
            this.$emit('changedQuantity', {quantity: this.quantity})
        }
    },
    emits: ['changedQuantity']
}
</script>

<style lang="scss" scoped>
    .item__quantity {
        display: flex;
        justify-items: center;
        align-items: center;

        &__value {
            padding: 0 5px;
            width: 2.5em;
            display: block;
            text-align: center;
        }
    }
</style>