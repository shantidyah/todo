<template>
    <div>
        <Navbar/>
        <div id='addtodo' style="padding-left: 100px; padding-right: 100px; padding-top: 80px">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">assignment</i>
                    <input id="icon_todo" type="text" class="validate" v-model='todo'>
                    <label for="icon_todo">Todo</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">timelapse</i>
                    <input id="deadline" type="number" class="validate" v-model='deadline'>
                    <label for="deadline">Due Date</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">assignment_late</i>
                    <input id="status" type="text" class="validate" v-model="status">
                    <label for="status">Status</label>
                    <h7 style="color:red">{{errortodo}}</h7>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action" @click="addTodo">submit
                    <i class="material-icons right">send</i>
            </button>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {mapActions,mapState} from 'vuex'

export default {
    name:'add',
    components: {
        Navbar
    },
    created(){
      var token = localStorage.getItem('token')
      if(!token){
        this.$router.replace('/')
      }
    },    
    computed:{
        ...mapState([
            'errortodo'
        ]),
        todo:{
            get(){
                return this.$store.state.todo
            },
            set(value){
                return this.$store.commit('todo',value)
            }
        },
        deadline:{
            get(){
                return this.$store.state.deadline
            },
            set(value){
                return this.$store.commit('deadline',value)
            }
        },
        status:{
            get(){
                return this.$store.state.status
            },
            set(value){
                return this.$store.commit('status',value)
            }
        },
    },
    methods:{
        ...mapActions([
            'addTodo'
        ])
    }
}
</script>
