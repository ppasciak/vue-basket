<template>
    <Items @generateProducts="fetchProducts" 
        :items="items"
        :loading="itemsLoading"
        @changedItem="changedItem"/>
</template>

<script>
    import Items from '../components/Items.vue';

    import { fetchProducts } from '../fetches/fetchProducts';

    export default {
        name: 'Basket',
        components: {
            Items
        },
        data() {
            return { 
                items: [],
                itemsLoading: false
            }
        },
        methods: {
            changedItem(item) {
                switch(item.action) {
                    case 'remove': {
                        this.items = this.items.filter(_item => _item.id !== item.id);
                        break;
                    }
                    case 'changeQuantity': {
                        this.items = this.items.map(_item => {
                            return _item.id == item.id ? {..._item, quantity: item.quantity} : _item
                        });
                        break;
                    }
                }
            },
            async fetchProducts() {
                this.itemsLoading = true;
                this.items = await fetchProducts();
                this.itemsLoading = false;
            }
        }
    }
</script>

