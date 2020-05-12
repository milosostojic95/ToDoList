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
//
const AddCheck = function(name,active) {
  this.name = name;
  this.active = active;
}

// Functions
function addTodo(event) {
  event.preventDefault();
  // create div
  const todoDiv = document.createElement('div');
  // input value
  const input = new AddCheck(todoInput.value,false);
  console.log(input);
  // add class
  todoDiv.classList.add('todo');
  //cretae li
  const newTodo =document.createElement('li');
  newTodo.innerText = input.name;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // add todo to localstorage

  saveLocalTodos(input);
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
    todo.addEventListener('transitionend', () =>{
      todo.remove();
      removeLocalItem();
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
      //addd completed class
      todoDiv.classList.add('completed');
      //cretae li
      const newTodo = document.createElement('li');
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
/*

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
*/

function isCheck() {
  localStorage.clear();
  const todoItems = document.querySelectorAll('.todo');
  todoItems.forEach((item) =>{
    const itemText = item.firstChild.textContent;
    if(item.classList.contains('completed')) {
      const newItem = new AddCheck(itemText,true);
      saveLocalTodos(newItem);
    }else {
      const newItem = new AddCheck(itemText,false)
      saveLocalTodos(newItem);
    }
  })
}

function removeLocalItem() {
  localStorage.clear();
  const todoItems = document.querySelectorAll('.todo');
  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent;
    if(item.classList.contains('completed')) {
      const newItem = new AddCheck(itemText,true)
      saveLocalTodos(newItem);
    }
    else {
      const newItem = new AddCheck(itemText,false)
      saveLocalTodos(newItem);
    }
  })
}
