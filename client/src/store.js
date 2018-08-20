import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seenLogin : true,
    name:'',
    email:'',
    password:'',
    emaillogin:'',
    passlogin:'',
    error:'',
    errorregist:'',
    username:'',
    todos:'',
    today:'',
    important:'',
    filter: 'all',
    todo:'',
    status:'',
    deadline:'',
    errortodo:'',
    test:''
  },
  mutations: {
    seenLogin(state,payload){
      state.seenLogin = payload
    },
    filter(state,payload){
      state.filter = payload
    },
    name(state,payload){
      state.name = payload
    },
    email(state,payload){
      state.email = payload
    },
    password(state,payload){
      state.password = payload
    },
    emaillogin(state,payload){
      state.emaillogin = payload
    },
    passlogin(state,payload){
      state.passlogin = payload
    },
    error(state,payload){
      state.error = payload
    },
    errorregist(state,payload){
      state.errorregist = payload
    },
    username(state,payload){
      state.username = payload
    },
    todos(state,payload){
      state.todos = payload
    },
    today(state,payload){
      state.today = payload
    },
    important(state,payload){
      state.important = payload
    },
    todo(state,payload){
      state.todo = payload
    },
    status(state,payload){
      state.status = payload
    },
    deadline(state,payload){
      state.deadline = payload
    },
    errortodo(state,payload){
      state.errortodo = payload
    },
    test(state,payload){
      state.test = payload
    }
  },
  actions: {
    statusLogin({commit},payload){
      commit('seenLogin',payload)
    },
    listSeen({commit},payload){
      commit('filter',payload)
    },
    register({commit}){
      if(!this.state.name && !this.state.email && !this.state.password){
        commit('errorregist','all form cannot empty')
      }
      else{
        axios.post('http://localhost:3000/register',{
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        })
          .then(user=>{
            localStorage.setItem('token',user.data)
            // console.log("masuk regist client",user.data);
            this.state.name=''
            this.state.email=''
            this.state.password=''
            swal("", "You success register!", "success")
            .then((value) => {
              router.push('/todo')
            });
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    login({commit}){
      axios.post('http://localhost:3000/login',{
        email:this.state.emaillogin,
        password:this.state.passlogin
      })
      .then(token=>{
        if(token.data=='o'){
          commit('error','email invalid')
        }
        else if(token.data=='x'){
          commit('error','password invalid')        
        }
        else{
          localStorage.setItem('token',token.data)
          this.state.emaillogin=''
          this.state.passlogin=''
          this.state.error=''
          swal("", "You success to login!", "success")
          .then(value=>{
            router.push('/todo')
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    },
    listTodo({commit}){
      var token = localStorage.getItem('token')
      axios.get('http://localhost:3000/users', {
        headers:{
             token: token
        }   
      })
      .then(todo=>{
        commit('username',todo.data.name)
        commit('todos',todo.data.todos)
        // console.log(todo.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addTodo({commit}){
      var token = localStorage.getItem('token')
      var status = ''
      if(!this.state.todo){
        commit('errortodo','todo cannot empty')
      }
      else{
        if(this.state.status!=='important'&&this.state.status!=='unimportant'){
          commit('errortodo','status: important or unimportant')          
        }
        else{
          axios.post('http://localhost:3000/todos/add',{
            deadline:this.state.deadline,
            todo:this.state.todo,
            status:this.state.status
          },{
              headers:{
                  token:token
              }  
          })
          .then(user=>{
              this.state.todo=''
              this.state.deadline=''
              this.state.status=''
              this.state.errortodo=''
            swal("", "You success to add todo!", "success")
          })
          .catch(err=>{
            console.log(err);
          })  
        }
      }
    },
    todosToday({commit}){
      var token = localStorage.getItem('token')
      axios.get('http://localhost:3000/todos/today', {
        headers:{
             token: token
        }   
      })
      .then(todo=>{
        commit('today',todo.data)
        console.log(todo.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    todosImportant({commit}){
      var token = localStorage.getItem('token')
      axios.get('http://localhost:3000/todos/status', {
        headers:{
             token: token
        }   
      })
      .then(todo=>{
        commit('important',todo.data)
        console.log(todo.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    deleteTodo(context,payload){
      // console.log(payload);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:3000/todos/delete/${payload}`)
          .then(todo=>{
            console.log(todo.data);
            swal("", "You success to delete todo!", "success")
            .then(value=>{
              // router.replace('/todo')
              context.dispatch('listTodo')
              context.dispatch('todosToday')
              context.dispatch('todosImportant') 
            })
            .catch(err=>{
              console.log(err);
              
            })

          })
          .catch(err=>{
              console.log(err); 
          })
        } else {
          swal("Your todo is safe!");
        }
      })
    },
    updateProgress(context,payload){
      // console.log("dari update pro",payload);
      // commit('test',payload._id)          
      
      if(payload.progress=='uncomplete'){
        axios.put(`http://localhost:3000/todos/progress/${payload._id}`,{
          progress:"complete"
        })
        .then(todo=>{
          // console.log('dari update',todo);
          context.dispatch('listTodo')
          context.dispatch('todosToday')
          context.dispatch('todosImportant') 
          // window.location = "/todo"          
        })
      }else{
        swal("", "This todo already complete!", "warning")        
      }
    },
    update(context,payload){
      swal.mixin({
        input: 'text',
        confirmButtonText: 'Save',
        showCancelButton: true
      }).queue([
        {
          title: 'You wanna change this todo?',
          text: `from ${payload.todo} to:`
        }
      ]).then((result) => {
        if(result.value[0].length<1 || result.value[0] === payload.todo){
          // console.log(result.value[0] === payload.todo);
          swal('','you dont change anything !','warning')
        }
        else if (result.value[0].length>=1) {
          console.log(result.value[0]);
          axios.put(`http://localhost:3000/todos/update/${payload._id}`,{
            todo:result.value[0]
          })
          .then(todo=>{
            console.log(todo);
            swal({
              title: 'All done!',
              html:
                'Todo changes: <pre><code>' +
                  `${payload.todo} to ${JSON.stringify(result.value[0])}` +
                '</code></pre>',
              confirmButtonText: 'Okay!'
            })
            .then(()=>{
              context.dispatch('listTodo')
              context.dispatch('todosToday')
              context.dispatch('todosImportant')                   
            })        
          })
          .catch(err=>{
            console.log(err);
          })

        }
      })
    }
  }
})
