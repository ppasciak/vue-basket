<template>
    <div class="app">
        <Layout>
            <router-view></router-view>
        </Layout>
    </div>
</template>

<script>
    import Layout from './components/Layout.vue';

    export default {
        name: 'App',
        components: {
            Layout
        },
        mounted() {
            this.$router.push('/basket');
        }
    }
</script>

<style lang="scss">
    @import '@/styles/_reset.scss';
    @import '@/styles/_buttons.scss';
    @import '@/styles/_typography.scss';
    @import '@/styles/_checkboxes.scss';
    @import '@/styles/_darkTheme.scss';

    .app {
        min-height: 100vh;
        transition: color 0.15s ease-in, background-color 0.15s ease-in;
    }
</style>
