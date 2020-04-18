import '../sass/main.scss';

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Events
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
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () =>{
      todo.remove();
    });
  }
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  console.log(e)
}

