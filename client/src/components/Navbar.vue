<template>
    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo right" style="padding-left: 25px">{{username}} todo's</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li @click="home"><a>menu</a></li>
            <li @click="add"><a>addtodo</a></li>
            <li @click="youtube"><a>youtube</a></li>
            <li @click="logout"><a>logout</a></li>
            <!-- <Dropdown/> -->
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'navbar',
    data(){
        return{
            seen:true
        }
    },
    computed:{
        ...mapState([
            'username'
        ])
    },
    methods:{
        add(){
            this.$router.replace('/add')        
        },
        home(){
            this.$router.replace('/todo')        
        },
        logout(){
            swal({
                title: "Are you sure?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem('token')
                    this.$router.replace('/')        
                } else {
                    
                }
            });

        },
        youtube(){
            this.$router.replace('/youtube')
        }
    }
}
</script>