import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLopcalStorage()
    }

    eliminarTodo( id ) {
       this.todos = this.todos.filter(todo => todo.id != id);
       this.guardarLopcalStorage()
    }

    marcarCompletado( id ){
        for( const todo of this.todos ){

            if(todo.id == id){
                todo.completado = !todo.completado;
            };

        };
        this.guardarLopcalStorage()
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado )
        this.guardarLopcalStorage()
    }

    guardarLopcalStorage(){
        localStorage.setItem('todos',JSON.stringify(this.todos) )
    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])

        this.todos = this.todos.map(Todo.fromJson)
        
    }

    pendientes() {
        const pendientes = this.todos.filter(todo => todo.completado === false);
        return pendientes.length;
    }
}