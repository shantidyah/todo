<template>
    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo" style="padding-left: 25px">TODO-FANCY</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a @click="statusLogin(true)">Login</a></li>
            <li><a @click="statusLogin(false)">Register</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapActions,mapState} from 'vuex'

export default {
    name:'navmenu',
    methods:{
        ...mapActions([
            "statusLogin"
        ])
    }
}
</script>
