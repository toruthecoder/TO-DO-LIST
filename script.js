// Calling the DOM ELements.
const inputBox = document.getElementById('fetchInput');
const addItemBtn = document.querySelector('.btn');
const clrBtn = document.querySelector('.btn0');
const ul = document.querySelector('.list-items');

//Variables and Const.
let editTodo = null;
//Functions

// checking the inuput condition and creating items function.
const addTodo = (e)=>{
    e.preventDefault();
    
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0){
        alert('Input Item');
        return false;
    }
    else{
        if (inputText.length >= 10){
            alert('input value should be less then 10');
            inputBox.value = '';
            return false;
        }
    }

    if(editTodo !== null && addItemBtn.innerHTML === 'Edit') {
        editLocalTodo(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addItemBtn.innerHTML = 'Add';
        inputBox.value = '';
        editTodo = null;
    }
    else{
        // creating li
        const li = document.createElement('li');
        li.className = 'item';
        // Creating h1
        const h1 = document.createElement('h1');
        h1.innerHTML = inputText;
        
        //creating edit btn
        const Edit = document.createElement('button');
        Edit.classList.add('remove-item-btn', 'btn3'); 
        Edit.innerHTML = 'Edit';
        
        //Creating delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('remove-item-btn', 'btn4');
        deleteBtn.innerHTML = 'x';
        
        li.appendChild(h1);
        li.appendChild(Edit);
        li.appendChild(deleteBtn); 
        ul.appendChild(li); 

        inputBox.value = '';

        saveLocalTodo(inputText);
    }
}

// button functionality
const update = (e) => {
    if (e.target.innerHTML === 'x'){
        ul.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }

    if (e.target.innerHTML === 'Edit'){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addItemBtn.innerHTML = 'Edit';
        editTodo = e;
    }
}

// Clear all Button Function
const clearBtn = ()=>{
    const list = document.querySelectorAll('.list-items li');
    list.forEach((item) =>{
        item.remove();
    });
}

// Save items in local storage
const saveLocalTodo = (todo) => {
    let todos = [];
    try{   
        if (localStorage.getItem('todos') === null){
            todos = [];
        }    
        else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    catch{
        console.log('Error saving todo' , error);
        localStorage.clear();
    }
}

// getting items from local storage on the dom 
const getLocalTodo = () => {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach((todo) => {
            
        // creating li
        const li = document.createElement('li');
        li.className = 'item';
        // Creating h1
        const h1 = document.createElement('h1');
        h1.innerHTML = todo;
        
        //creating edit btn
        const Edit = document.createElement('button');
        Edit.classList.add('remove-item-btn', 'btn3'); 
        Edit.innerHTML = 'Edit';
        
        //Creating delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('remove-item-btn', 'btn4'); 
        deleteBtn.innerHTML = 'x';
        
        li.appendChild(h1);
        li.appendChild(Edit);
        li.appendChild(deleteBtn); 
        ul.appendChild(li); 
    })
    }
}

//Delete items from local storage 
const deleteLocalTodo = (todo) =>{
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.findIndex(item => item === todoText);
    if (todoIndex > -1){
        todos.splice(todoIndex, 1);
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Edit items in local storage 
const editLocalTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem('todos' , JSON.stringify(todos));
}

// Event Listeners.

//// getting items from local storage on the dom event lisenter
document.addEventListener('DOMContentLoaded', getLocalTodo);

//Check the conditions of adding the items event listener
addItemBtn.addEventListener('click', addTodo);

// clear all the items btn event listener
clrBtn.addEventListener('click', clearBtn);

// event listener for edit and deleteing the items
ul.addEventListener('click', update);


