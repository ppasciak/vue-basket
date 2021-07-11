<template>
    <h1>Shipping details</h1>
    <div class="address-form__wrapper">
        <AddressForm :formType="'shipping'" @formSubmitted="confirmedAddress"/>
        <AddressForm :formType="'billing'" @formSubmitted="confirmedAddress"/>
    </div>
    <DeliveryMethods v-if="shippingConfirmed && billingConfirmed"/>
    <Totals :items="items"/>
</template>

<script>
import Totals from '../components/Totals.vue';
import AddressForm from '../components/AddressForm.vue';
import DeliveryMethods from '../components/DeliveryMethods.vue'
import { mapState } from 'vuex';

export default {
    name: 'Checkout',
    components: {
        Totals,
        AddressForm,
        DeliveryMethods
    },
    data(){
        return {
            shippingConfirmed: false,
            billingConfirmed: false
        }
    },
    methods: {
        confirmedAddress (type) {
            switch (type) {
                case 'shipping':
                    this.shippingConfirmed = true;
                    break;

                case 'billing':
                    this.billingConfirmed = true;
                    break;

                default:
                    break;
            }
        }
    },
    computed: {
        ...mapState(['items'])
    }
}
</script>

<style scoped>
    .address-form__wrapper {
        display: flex;
        flex-wrap: wrap;
    }
</style>