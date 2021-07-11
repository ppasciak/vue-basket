<template>
    <li class="item">
        <div class="item__photo">
            <img :src="require('@/assets/images/'+image)" :alt="name">
        </div>
        <div class="item__name">
            {{name}}
        </div>
        <QuantitySelector @changedQuantity="changedQuantity" :qty="quantity" />
        <div class="item__price">
            <span class="item__price">{{rowPrice}} USD</span>
            <span class="item__price--tax-inc">{{((rowPrice)*(1+tax)).toFixed(2)}} tax inc.</span>
        </div>
        <div class="item__actions">
            <button @click="removeItem" class="orange square">X</button>
        </div>
    </li>
</template>

<script>
import QuantitySelector from './QuantitySelector.vue'

export default {
    props: {
        name: String,
        quantity: Number,
        price: Number,
        tax: Number,
        image: String,
        id: Number
    },
    components: {
        QuantitySelector
    },
    computed: {
        rowPrice() {return (this.price * this.quantity).toFixed(2)}
    },
    methods: {
        removeItem() {
            this.$emit('changedItem', {id: this.id, action: 'remove'});
        },
        changedQuantity(val) {
            this.$emit('changedItem', {id: this.id, quantity: val.quantity, action: 'changeQuantity'});
        }
    },
    emits: ['changedItem']

}
</script>

<style lang="scss">
.item {
    display: grid;
    align-items: center;
    padding: 25px 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 2fr;
    grid-gap: 5px;
    grid-template-areas:
      "image name name"
      "qty price action";

    @media only screen and (min-width: $srceen-m) {
      grid-template-columns: 1fr 3fr repeat(3, 1fr);
      grid-template-rows: 1fr;
      grid-template-areas: "image name qty price action";
      grid-gap: 10px;
    }

    &:not(&:last-of-type) {
      border-bottom: 1px solid $gray;
    }

    &__qty,
    &__price,
    &__action {
        text-align: center;
    }
    &__qty {
        grid-area: qty;
        min-width: 100px;
    }
    &__price {
        grid-area: price;
        display: flex;
        flex-direction: column;
        &--tax-inc {
            font-size: 0.75em;
            width: 120px;
        }
    }

    &__action {
        grid-area: action;
    }

    &__name {
        font-weight: 600;
        padding: 0 10px;
        grid-area: name;
    }

    &__image {
        grid-area: image;
        max-width: 90px;
        justify-self: center;
        @media only screen and (min-width: $srceen-m) {
            max-width: none;
        }

        img {
            max-width: 100%;
            margin: 0 auto;
            display: block;
        }
    }
}
</style>