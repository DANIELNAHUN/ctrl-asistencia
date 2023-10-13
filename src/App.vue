<template>
  <v-app>
    <header-app v-if="!isLoginPage"></header-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';
export default {
  components: { HeaderApp },
  name: 'App',

  data(){
    return{
      isLoginPage: false
    }
  },
  watch:{
    '$route' (to, from){
      this.isLoginPage = to.name === 'login'
    }
  }
};
</script>
