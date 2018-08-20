import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Todo from './views/Todo.vue'
import Add from './views/Add.vue'
import Youtube from './views/Youtube.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/youtube',
      name: 'youtube',
      component: Youtube
    }
  ]
})
