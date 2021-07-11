import { createStore } from 'vuex'

const store = createStore({
    state: {
        items: [],
        shippingAddress: {
            firstName: '',
            lastName: '',
            city: '',
            postcode: '',
            streetFirstLine: '',
            streetSecondLine: ''
        },
        billingAddress: {
            firstName: '',
            lastName: '',
            city: '',
            postcode: '',
            streetFirstLine: '',
            streetSecondLine: ''
        },
        deliveryCost: null
    },
    mutations: {
        updateItems(state, payload) {
            state.items = payload
        },
        updateDeliveryCost(state, payload) {
            state.deliveryCost = payload
        },
        updateAddress(state, payload) {
            let address = payload.type;
            state[address] = payload.address;
        }
    }
})

export default store