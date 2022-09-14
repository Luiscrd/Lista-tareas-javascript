import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const inputList = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const pendList = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li ${todo.completado ? 'class="completed"' : ''} data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}


inputList.addEventListener('keyup', (event) => {

    if (event.keyCode === 13) {
        const nuevoTodo = new Todo(inputList.value);
        todoList.nuevoTodo(nuevoTodo);
        inputList.value = '';
        crearTodoHtml(nuevoTodo)
    }
})

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

        pendList.children[0].innerHTML = todoList.pendientes()
        
    }

    if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }
})

borrarCompletados.addEventListener('click', (event) => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length-1; i>=0 ;i-- ){
        const elemeto = divTodoList.children[i];
        if (elemeto.classList.contains('completed')){
            divTodoList.removeChild(elemeto);
        }
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro){ return };

    anchorFiltros.forEach( elem => elem.classList.remove('selected'))

    event.target.classList.add('selected')
    for( const elemeto of divTodoList.children ){
        elemeto.classList.remove('hidden');
        const completado = elemeto.classList.contains('completed')

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemeto.classList.add('hidden')
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemeto.classList.add('hidden')
                }
            break;


        }
    }
})






