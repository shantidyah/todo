<template>
    <div>
        <Navbar/>
        <div id="search" style="padding-top: 30px; padding-left: 10px">
          <div class="row">
              <div class="input-field col s6">
                  <i class="material-icons prefix">searching</i>
                  <!-- <input id="icon_email" type="text" class="validate" v-model=edit.todo> -->
                  <input id="icon_email" type="text" class="validate" v-model="querys">
                  <label for="icon_email">search</label>
              </div>
              <div id="button" class="input-field col s6" style="padding-top: 15px">

                <button class="btn waves-effect waves-light" type="submit" name="action" v-on:click="searching">submit
                  <i class="material-icons right">send</i>
                </button>
              </div>
          </div>
        </div>
        <div class="row">
          <div v-for="item in result" :key=item[key]>
            <div class="col s12 m4 l3">
                <div class="card small">
                    <div class="card-image">  
                        <iframe width="" height="" v-bind:src="'https://www.youtube.com/embed/' + item.id.videoId "></iframe>
                        <!-- <span class="card-title">{{item.snipet}}</span> -->
                    </div>
                    <div class="card-content">
                      {{item.snippet.title}}
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {

    name:'Youtube',
    components: {
        Navbar
    },
    data(){
        return{
            result: [],
            querys: "",
            user:''
        }
    },
    created(){
      var token = localStorage.getItem('token')
      if(!token){
        this.$router.replace('/')
      }
    },
    methods:{
        searching: function () {
            console.log("masuk methods search");
            this.result = []
            var self = this
            gapi.client.setApiKey('AIzaSyBvizribe8dbta-KjEhM6u407xhvES7gAI');
            gapi.client.load('youtube', 'v3', function () {
                self.getVideo();
            });
        },
        getVideo: function () {
            var self = this
            $('#results').empty()
            // console.log("masuk methods getvideo");
            var q = this.querys //$('#query').val();
            var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet',
                maxResults: 20
            });
    
            request.execute(function (response) {
                console.log(response.items)
                console.log('?')
                for (let i = 0; i < response.items.length; i++) {
                    self.result.push(response.items[i])
                    console.log(self.result)
                }
            })
      }
    }
}
</script>

<style>

</style>
