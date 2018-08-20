<template>
    <div id="register" style="padding-left: 30px">
        <div class="row">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_name" type="text" class="validate" v-model="name">
                    <label for="icon_name">Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_email" type="text" class="validate" v-model="email">
                    <label for="icon_email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">enhanced_encryption</i>
                    <input id="icon_pass" type="password" class="validate" v-model="password">
                    <label for="icon_pass">Password</label>
                    <p style="color:red;">{{errorregist}}</p>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action" @click="register">Register
                    <i class="material-icons right">send</i>
            </button>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'regist',
    computed:{
        ...mapState([
            'errorregist'
        ]),
        name:{
            get(){
                return this.$store.state.name
            },
            set(value){
                return this.$store.commit('name',value)
            }
        },
        email:{
            get(){
                return this.$store.state.email
            },
            set(value){
                return this.$store.commit('email',value)
            }
        },
        password:{
            get(){
                return this.$store.state.password
            },
            set(value){
                return this.$store.commit('password',value)
            }
        }
    },
    methods:{
        ...mapActions([
            "register"
        ])
    }
}
</script>
