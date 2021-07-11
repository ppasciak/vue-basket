<template>
    <div class="totals">
        <h4>Summary:</h4>
        <div class="totals-grid">
            <div class="totals__qty">
                Products quantity: <span>{{totalQuantity}}</span>
            </div>
            <div class="totals__tax-exl">
                Taxes excluded: <span>{{totalPrice}} USD</span>
            </div>
            <div class="totals__tax-inc">
                Taxes included: <span>{{totalPriceWithTax}} USD</span>
            </div>
            <div v-if="deliveryCost" class="totals__delivery">
                Delivery: <span>{{deliveryCost}} USD</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'Totals',
    props: {
        items: Array
    },
    computed: {
        ...mapState(['deliveryCost']),
        totalPrice() {
            let sum = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            return sum.toFixed(2);
        },
        totalPriceWithTax() {
            let sum =  this.items.reduce((total, item) => total + ((item.price * (1 + item.tax)) * item.quantity), 0);
            return sum.toFixed(2);
        },
        totalQuantity() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }
}
</script>

<style lang="scss" scoped>
    .totals {
        padding: 20px;
        border: 1px solid $gray;

        @media only screen and (min-width: $srceen-m) {
            margin: 20px 0;
        }

        &-grid {
            display: flex;
            flex-direction: column;
            
            @media only screen and (min-width: $srceen-m) {
                display: grid;
                grid-auto-columns: 1fr;
                grid-auto-flow: column;
            }
            div {
                padding: 10px;
            }
            span {
                display: block;
                font-weight: 700;
            }
        }
    }
</style>