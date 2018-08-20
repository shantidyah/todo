<template>
    <div id="tabeltodo">
        <div>
            {{test}}
            <table class="highlight centered">
                <tr>
                    <td style="font-weight: bold; font-size:20px">Todo</td>
                    <td style="font-weight: bold; font-size:20px">Create</td>
                    <td style="font-weight: bold; font-size:20px">Deadline</td>
                    <td style="font-weight: bold; font-size:20px">Status</td>                
                    <td style="font-weight: bold; font-size:20px">Progress</td>
                </tr>
                <tr v-for='todo in todos' :key=todo[key]>
                    <td>{{todo.todo}}</td>
                    <td>{{todo.createdAt}}</td>
                    <td>{{todo.deadLine}}</td>
                    <td>{{todo.status}}</td>
                    <td>{{todo.progress}}</td>
                    <td>
                        <button class="btn waves-effect waves-light" type="submit" name="action" @click="update(todo)">
                            <i class="material-icons center">edit</i>
                        </button>
                    </td>
                    <td>
                        <button class="btn waves-effect waves-light" type="submit" name="action" @click="deleteTodo(todo._id)">
                            <i class="material-icons center">delete</i>
                        </button>
                    <td>
                        <button class="btn waves-effect waves-light" type="submit" name="action" @click="updateProgress(todo)">
                            <i class="material-icons center">check_circle</i>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'list',
    created(){
        this.listTodo()
    },
    computed:{
        ...mapActions([
            'listTodo'
        ]),
        ...mapState([
            'todos',
            'test'
        ])
    },
    methods:{
        ...mapActions([
            'listTodo',
            'deleteTodo',
            'updateProgress',
            'update'
        ])
    }
}
</script>
