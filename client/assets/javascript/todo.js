var todoApp = new Vue ({
    el: "#todo-vue",
    data: {
        newTodo: "",
        todos: []
    },
    methods: {
        isDisabled() {
            return (this.newTodo === "");
        },
        addTodo() {
            axios.post('http://localhost:3000/api/todos', {
                value: this.newTodo,
                done: false
            })
            .then(response => {
                var todo = response.data.todo;
                this.todos.unshift(todo);
            })
            .catch(error => console.log(error));

            this.newTodo = "";
        },
        setDone(todo) {
            var newDoneValue = !todo.done;
            axios.put(`http://localhost:3000/api/todo/${todo._id}`, {
                value: todo.value,
                done: newDoneValue
            })
            .then(response => {
                todo.done = newDoneValue;
            })
            .catch(error => console.log(error));
        },
        deleteTodo(todo) {
            axios.delete(`http://localhost:3000/api/todo/${todo._id}`)
                .then(response => {
                    var indexTodo = this.todos.indexOf(todo); 
                    this.todos.splice(indexTodo, 1);
                })
                .catch(error => console.log(error));
        }
    },
    watch: {
        
    }, 
    mounted() {
        axios.get('http://localhost:3000/api/todos')
            .then(response => {
                this.todos = response.data;
            })
            .catch(error => console.log(error));
    }
})