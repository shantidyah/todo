<template>
  <div class="home">
    <Navbar/>
    <!-- {{seenLogin}} -->
    <div class="container" style="padding-top:20px">
      <div v-if="seenLogin">
        <Login/>
      </div>
      <div v-else>
        <Register/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavHome.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import {mapState} from 'vuex'
// import router from './router'

export default {
  name: 'home',
  components: {
    Navbar,
    Login,
    Register
  },
  created(){
    var token = localStorage.getItem('token')
    if(token){
      this.$router.replace('/todo')
    }
  },
  computed:{
    ...mapState([
      'seenLogin'
    ])
  }
}
</script>
