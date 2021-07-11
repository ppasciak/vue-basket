<template>
    <div class="address-form" :class="{'col-2': confirmed}">            
        <h3>{{formType}} address</h3>
        <div v-if="formType == 'billing' && !confirmed">
            <input type="checkbox" name="sameAsShipping" id="sameAsShipping" v-model="sameAsShipping" @change="handleDuplicateAddress">
            <label for="sameAsShipping">Billing Address same as shipping</label>
        </div>
        <div class="row">
            <div class="col-2" :class="{hidden: confirmed}">
                <form :id="formType+'-form'" @input="handleFormInput" @change="checkIfFormIsValid">
                    <label :for="formType+'-firstName'">First name: *</label>
                    <input type="text" :id="formType+'-firstName'" v-model="address.firstName" required>

                    <label :for="formType+'-lastName'">Last name: *</label>
                    <input type="text" :id="formType+'-lastName'" v-model="address.lastName" required>

                    <label :for="formType+'-city'">City: *</label>
                    <input type="text" :id="formType+'-city'" v-model="address.city" required>

                    <label :for="formType+'-postcode'">Postcode: *</label>
                    <input type="text" :id="formType+'-postcode'" v-model="address.postcode" required>

                    <label :for="formType+'-streetFirstLine'">Street address: *</label>
                    <input type="text" :id="formType+'-streetFirstLine'" v-model="address.streetFirstLine" required>

                    <label :for="formType+'-streetSecondLine'">Street address: </label>
                    <input type="text" :id="formType+'-streetSecondLine'" v-model="address.streetSecondLine">

                    <button class="btn-lg btn-full" :disabled="!isFormValid" @click.prevent="sumbitForm">Confirm</button>
                </form>
            </div>
            <div class="col-2">
                <p><strong>{{`${address.firstName} ${address.lastName}`}}</strong></p>
                <p>{{`${address.postcode} ${address.city}`}}</p>
                <p>{{address.streetFirstLine}}</p>
                <p>{{address.streetSecondLine}}</p>
                <button v-if="confirmed" class="btn-lg" @click="confirmed = false">Edit</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'AddressForm',
    props: {
        formType: String
    },
    data() {
        return {
            address: {
                firstName: '',
                lastName: '',
                city: '',
                postcode: '',
                streetFirstLine: '',
                streetSecondLine: ''
            },
            isFormValid: false,
            confirmed: false,
            sameAsShipping: false
        }
    },
    computed: {
        ...mapState(['shippingAddress'])
    },
    methods: {
        ...mapMutations(['updateAddress']),
        handleFormInput(e) {
            e.preventDefault();
            this.updateAddress({
                type: `${this.formType}Address`,
                address: this.address
            });

            if(this.formType === 'billing') {
                this.sameAsShipping = JSON.stringify(this.address) === JSON.stringify(this.shippingAddress)
            }

            this.checkIfFormIsValid();
        },
        checkIfFormIsValid() {
            const loopFormItems = () => {

                const address = {...this.address}

                for (const property in address) {
                    if((address[property] == '' || address[property] == null) && property !== 'streetSecondLine') {
                        return false
                    }
                }
                return true

            }

            this.isFormValid = loopFormItems();
        },
        sumbitForm() {
            this.confirmed = true;
            this.$emit('formSubmitted', this.formType)
        },
        handleDuplicateAddress() {
            if(this.sameAsShipping) {
                this.address = {...this.shippingAddress};
            }
            this.checkIfFormIsValid()
        }
    },
    emits: [
        'formSubmitted'
    ]
}
</script>

<style lang="scss" scoped>
    input {
        display: block;
        margin: 8px 0 15px 0;
        padding: 10px;
        border: 1px solid $gray;
        border-radius: 0;
        width: 100%;
        max-width: 320px;
    }

    .address-form {
        flex-basis: 100%;

        &.col-2 {
            flex-basis: 50%;
        }
    }

    .btn-full {
        width: 100%;
        max-width: 320px;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .col-2 {
        flex-basis: 100%;
        padding: 0 5px;

        @media only screen and (min-width: $srceen-m) {
            flex-basis: 50%;
        }
    }

    .hidden {
        display: none;
    }
</style>