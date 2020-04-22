import '../sass/main.scss';

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Events
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event) {
  event.preventDefault();
  // create div
  const todoDiv = document.createElement('div');
  // add class
  todoDiv.classList.add('todo');
  //cretae li
  const newTodo =document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // add todo to localstorage
  saveLocalTodos(todoInput.value);
  // cocheck mark button
  const completedButton = document.createElement('button');
  completedButton.innerText = '+';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  const deletedButton = document.createElement('button');
  deletedButton.innerText = '-';
  deletedButton.classList.add('delete-btn');
  todoDiv.appendChild(deletedButton);
  // APPEND TO TODOLIST
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = '';
}

// delete or check function
function deleteCheck(e) {
  const item = e.target;
  if(item.classList.contains('delete-btn')) {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLoacalTodos(todo);
    todo.addEventListener('transitionend', () =>{
      todo.remove();
    });
  }
  if(item.classList.contains('complete-btn')) {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    isCheck();
  }
}

function filterTodo(e) {
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo) => {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

function saveLocalTodos(todo) {
  //check if i already have thins in there?
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    if(todo.active === true) {
      const todoDiv = document.createElement('div');
      // add class
      todoDiv.classList.add('todo');
      //cretae li
      const newTodo =document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      newTodo.classList.add('completed');
      todoDiv.appendChild(newTodo);
      // cocheck mark button
      const completedButton = document.createElement('button');
      completedButton.innerText = '+';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
      const deletedButton = document.createElement('button');
      deletedButton.innerText = '-';
      deletedButton.classList.add('delete-btn');
      todoDiv.appendChild(deletedButton);
      // APPEND TO TODOLIST
      todoList.appendChild(todoDiv);
    } else {
      const todoDiv = document.createElement('div');
      // add class
      todoDiv.classList.add('todo');
      //cretae li
      const newTodo =document.createElement('li');
      newTodo.innerText = todo.name;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);
      // cocheck mark button
      const completedButton = document.createElement('button');
      completedButton.innerText = '+';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
      const deletedButton = document.createElement('button');
      deletedButton.innerText = '-';
      deletedButton.classList.add('delete-btn');
      todoDiv.appendChild(deletedButton);
      // APPEND TO TODOLIST
      todoList.appendChild(todoDiv);
    }
  })
}

function removeLoacalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function isCheck() {
  localStorage.clear();
  const todoItems = document.querySelectorAll('.todo');
  todoItems.forEach((item) =>{
    if(item.classList.contains('completed')) {
      const newItem = {
        name: item,
        active: true,
      }
      saveLocalTodos(newItem);
    }else {
      const newItem = {
        name: item,
        active: false
      }
      saveLocalTodos(newItem);
    }
  })
}
