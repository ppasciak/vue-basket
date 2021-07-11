<template>
    <header>
        <div class="container">
            <ThemeToggler />
        </div>
    </header>
    <main>
        <div class="container">
            <slot></slot>
        </div>
    </main>
    <footer>
        2021 <a href="https://github.com/ppasciak">Paweł Paściak</a>
    </footer>
</template>

<script>
import ThemeToggler from './ThemeToggler.vue';

export default {
    name: 'Layout',
    components: {
        ThemeToggler
    }
}
</script>

<style lang="scss" scoped>
    header {
        background: $gray;
        color: #ffffff;
        padding: 15px 0;
    }

    .container {
        max-width: 660px;
        padding: 0 20px;
        margin: 0 auto;
    }

    footer {
        padding: 15px 0;
        text-align: center;
    }
</style>