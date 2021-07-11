import {createRouter, createWebHistory} from 'vue-router';

import Checkout from '../views/Checkout.vue'
import Basket from '../views/Basket.vue'

const routes = [
    {
        path: '/checkout',
        name: 'Shipping details',
        component: Checkout
    },{
        path: '/basket',
        name: 'Basket',
        component: Basket
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;