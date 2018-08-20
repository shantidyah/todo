<template>
  <div class="todo">
      <Navbar/>
      <br>
      <br>
      <div id='todolist' style="padding-left: 100px; padding-right: 100px">
        <Dropdown/>
        <div v-if="filter=='all'">
          <List/>
        </div>
        <div v-else-if="filter=='today'">
          <ListToday/>
        </div>
        <div v-else-if="filter=='important'">
          <ListImportant/>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Dropdown from '@/components/Dropdown.vue'
import List from '@/components/ListTodo.vue'
import ListToday from '@/components/ListToday.vue'
import ListImportant from '@/components/ListImportant.vue'

// import router from './router'
import {mapState} from 'vuex'


export default {
    name: 'main',

    created(){
      var token = localStorage.getItem('token')
      if(!token){
        this.$router.replace('/')
      }
    },
    computed:{
      ...mapState([
        'filter'
      ])
    },
    components: {
        Navbar,
        Dropdown,
        List,
        ListToday,
        ListImportant
	},    
}
</script>
