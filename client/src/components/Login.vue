<template>
     <div id="login" style="padding-left: 30px">
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">email</i>
                        <input id="icon_email" type="text" class="validate" v-model="emaillogin">
                        <label for="icon_email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">enhanced_encryption</i>
                        <input id="icon_pass" type="password" class="validate" v-model='passlogin'>
                        <label for="icon_pass">Password</label>
                        <p style="color:red;">{{error}}</p>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action" @click="login">Login
                        <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'login',
    computed:{
        ...mapState([
            'error'
        ]),
        emaillogin:{
            get(){
                return this.$store.state.emaillogin
            },
            set(value){
                return this.$store.commit('emaillogin',value)
            }
        },
        passlogin:{
            get(){
                return this.$store.state.passlogin
            },
            set(value){
                return this.$store.commit('passlogin',value)
            }
        }
    },
    methods:{
        ...mapActions([
            "login"
        ])
    }
}
</script>
