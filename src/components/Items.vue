<template>
    <h2>Your cart:</h2>
    <div v-if="items.length">
        <ul class="items">
            <Item 
                v-for="item in items"
                v-bind:key="item.name"
                :name="item.name" 
                :image="item.image" 
                :quantity="item.quantity" 
                :price="item.price" 
                :tax="item.tax"
                :id="item.id" 
                @changedItem="changedItem"
            />
        </ul>
        <Totals :items="items" />
        <div class="justify-end">
            <button class="btn-lg" @click="proceedToCheckout">Continue</button>
        </div>
    </div>
    <div v-else-if="loading">
        <Loader />
    </div>
    <div v-else>
        <p>Your cart is empty</p>
        <button class="btn-lg" @click="generateProducts">Generate products!</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Item from '../components/Item.vue';
import Loader from '../components/Loader.vue'
import Totals from '../components/Totals.vue'; 

export default {
    name: 'Items',
    props: {
        items: Array,
        loading: Boolean
    },
    components: {
        Item,
        Loader,
        Totals
    },
    methods: {
        ...mapMutations(['updateItems']),
        changedItem(action) {
            this.$emit('changedItem', action)
        },
        generateProducts() {
            this.$emit('generateProducts')
        },
        proceedToCheckout(){
            this.updateItems(
                this.items
            );
            this.$router.push('/checkout');
        }
    },
    emits: ['changedItem', 'generateProducts']
}
</script>

<style scoped>
    .items {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding-left: 0;
    }

    .justify-end {
        display: flex;
        justify-content: flex-end;
    }
</style>