<template>
    <h3>
        Delivery Method
    </h3>
    <form v-if="methods.length" class="delivery-method__form">
        <div class="delivery-method" v-for="method in methods" v-bind:key="method.id">
            <input type="radio" name="deliveryMethod" :value="method.price" :id="`method-${method.id}`" @input="handleChooseDelivery"/>
            <label :for="`method-${method.id}`">
                {{method.name}} 
                <span class="delivery-method__price">{{method.price.toFixed(2) + ' USD'}}</span>
                <span v-if="method.price == 0" class="delivery-method__label">FREE</span>
            </label>
        </div>
    </form>
</template>

<script>
    import {fetchDeliveryMethods} from '../fetches/fetchDeliveryMethod';
    import {mapMutations} from 'vuex';

    export default {
        name: 'DeliveryMethods',
        data() {
            return {
                methods: {}
            }
        },
        mounted () {
            fetchDeliveryMethods().then(data => this.methods = data)
        },
        methods: {
            ...mapMutations(['updateDeliveryCost']),
            handleChooseDelivery(e) {
                let methodPrice = parseFloat(e.target.value);
                this.updateDeliveryCost(methodPrice.toFixed(2));
            }
        }
    }
</script>

<style scoped lang="scss">
    .delivery-method {
        padding: 25px 0;

        &__label {
            background: $red;
            margin-left: 10px;
            padding: 2px 5px;
            color: white;
        }

        input[type="radio"] {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;

            & + label{
                position: relative;
                padding-left: 45px;
                display: block;
                cursor: pointer;

                &:before {
                    position: absolute;
                    content: '';
                    bottom: 0;
                    top: 0;
                    left: 0;
                    margin: auto;
                    width: 28px;
                    height: 28px;
                    border: 3px solid $blue;
                    border-radius: 50%;
                    background: white;
                }
            }

            & + label:after{
                position: absolute;
                content: '';
                opacity: 0;
                transition: opacity 0.15s ease-in, left 0.15s ease-in, height 0.15s ease-in, width 0.15s ease-in;
            }

            &:checked + label:after{
                position: absolute;
                content: '';
                bottom: 0;
                top: 0;
                margin: auto;
                width: 18px;
                height: 18px;
                left: 8px;
                border-radius: 50%;
                background: $blue;
                opacity: 1;
                animation: pop-in 0.15s;
                
                @keyframes pop-in {
                    from {
                        left: 20px;
                        width: 0px;
                        height: 0px;
                    }
                    to {
                        width: 16px;
                        height: 16px;
                        left: 9px;
                    }
                }
            }
        }
    }
</style>