import '../src/styles.css';
import { TodoList, Todo } from './classes/index';
import { crearTodoHtml } from './js/components';


const todos = [];

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

const pendList = document.querySelector('.todo-count'); 

pendList.children[0].innerHTML = todoList.pendientes()
// const tarea = new Todo('Aprender JavaScript');

// const tarea2 = new Todo('Aprender NodeJs');

// todoList.nuevoTodo( tarea );

// todoList.nuevoTodo( tarea2 );

// crearTodoHtml( tarea )

