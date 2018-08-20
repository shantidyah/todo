<template>
<div>
    <a class="waves-effect waves-light btn" @click="listSeen('all')">all</a>
    <a class="waves-effect waves-light btn" @click="listSeen('today')">today</a>
    <a class="waves-effect waves-light btn" @click="listSeen('important')">important</a>
</div>
        

</template>

<script>
import {mapActions} from 'vuex'

export default {
    name:'dropdown',
    methods:{
        ...mapActions([
            'listSeen'
        ])
    }
}
</script>
