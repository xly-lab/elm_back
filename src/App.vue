<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Cookies from  'js-cookie'
  import {reqCookie} from './api'
  export default {
    async beforeCreate(){
      const _id = Cookies.get('_id');
      const cooResult = await reqCookie({_id:_id});
      if(cooResult.code===0) {
        this.$router.replace('/index')
      } else this.$router.replace('/login')
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

</style>
