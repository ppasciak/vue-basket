<template>
    <input type="checkbox" id="theme-toggler" class="toggle" v-model="darkTheme" @change="setTheme">
    <label for="theme-toggler"></label>
</template>

<script>
    


export default {
    name: 'ThemeToggler',
    data() {
        return {
            darkTheme: '',
        }
    },
    mounted(){
        const darkModeMediaString = "(prefers-color-scheme: dark)";
        const preferableDarkMode = window.matchMedia(darkModeMediaString).matches;
        const choosenTheme = localStorage.getItem("theme");

        if(choosenTheme){
            document.body.setAttribute('data-theme', choosenTheme);
            choosenTheme == 'dark' ? this.darkTheme = true : this.darkTheme = false;
        }else if(preferableDarkMode){
            document.body.setAttribute('data-theme', 'dark');
            preferableDarkMode == true ? this.darkTheme = true : this.darkTheme = false;
            
            this.setTheme()
        }
    },
    methods: {
        setTheme() {
            let theme = this.darkTheme ? 'dark' : 'light';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }
}
</script>

<style lang="scss" scoped>
    input[type=checkbox] {
        width: 0;
        height: 0;
        visibility: hidden;
        &:checked ~ label{
            background: lighten($gray,20%);
            &:before {
                transform: translateX(25px);
                background: white;
            }
        }
    }
    label {
        background: white;
        height: 25px;
        width: 50px;
        border-radius: 15px;
        display: block;
        position: relative;
        transition: background-color 0.25s ease-in-out;
        &:before {
            position: absolute;
            content: '';
            width: 21px;
            height: 21px;
            top: 2px;
            background: $gray;
            border-radius: 50%;
            left: 2px;
            transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
        }   
    }
</style>