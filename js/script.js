const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput')
const output = document.querySelector('#output')
const error = document.querySelector('#error')
const errormsg = document.querySelector('#errormsg')
const fixbg = document.querySelector('#main')

let todos = [];

const fetchTodos = () => {


/*  fungerar inte som jag vill
    for(i = 1; i < 11; i++)
    fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
    .then(response => response.json())
    .then(json => console.log(json))
*/

fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json())
      .then(data => {
          todos = data
          console.log(todos)
          sortArray()
          listTodos()
         
          
      })
      .catch(err => console.log(err))
}
fetchTodos()


const newTodo = (todo) => {

    let card = document.createElement('div')
    card.classList.add('card', 'p-3', 'my-3', 'todo', 'morecolor')

    let innercard = document.createElement('div');
    innercard.classList.add('d-flex', 'justify-content-between')

    let btndiv = document.createElement('div')
    btndiv.classList.add('d-flex', 'justify-content-center')
    let title = document.createElement('h3')
    title.classList.add('title')
    title.innerText = todo.title

    let delButton = document.createElement('button')
    delButton.classList.add('btn', 'btn-danger')
    delButton.innerText = 'X'
    
    delButton.addEventListener('click', () => {
        
        
        if(todo.completed === true){
            console.log('delete todo')
            error.classList.remove('error-box')
            errormsg.innerText = ''
            deleteTodo(todo.id)
            if(todos.length < 9){
                fixbg.classList.add('fixpos')
            }

        }
        else{
            error.classList.add('error-box')
            errormsg.innerText = 'Finish the todo before removing it'
            console.log("cant add nothing")
        }
        
        
    })
    let editButton = document.createElement('button')
    editButton.classList.add('btn', 'mx-2')
    editButton.innerText = 'V'
    editButton.addEventListener('click', () => {
        
        if(todo.completed === true){
            todo.completed = false
            card.classList.remove("completed")
            editButton.classList.add('bg-success')
            editButton.classList.remove('bg-secondary')
            
        }
        else{
            todo.completed = true
            card.classList.add("complted")
            editButton.classList.remove('bg-sucess')
            editButton.classList.add('bg-secondary')
            
        }
        error.classList.remove('error-box')
        errormsg.innerText = ''
        sortArray()
        listTodos()
    
    })

    if(todo.completed == true){
        card.classList.add('completed')
        editButton.classList.add('bg-secondary')
    }
    else{
        editButton.classList.add('bg-success')
    }

    innercard.appendChild(title)
    innercard.appendChild(btndiv)
    btndiv.appendChild(editButton)
    btndiv.appendChild(delButton)
    card.appendChild(innercard)
    output.appendChild(card)
}

const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    });
}

const createTodo = (title) => {

    if(input.value.trim() !== ""){

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',{
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    })

        .then(res => res.json())
        .then(data => {
            
            data.id = Date.now()
            //data.id = todos.length + 1      fungerar inte
            console.log(data)
            todos.unshift(data)
            listTodos()
        })  
        error.classList.remove('error-box')
        errormsg.innerText = ''
        if(todos.length > 7){
            fixbg.classList.remove('fixpos')
        }
    }

    else {
        error.classList.add('error-box')
        errormsg.innerText = 'Input box is empty'
        console.log("cant add nothing")
    }
}

const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id != id)
    listTodos(todos)
}

const sortArray = () => {
    todos.sort((a,b) => a.completed - b.completed)

}

form.addEventListener('submit', e => {
    e.preventDefault()

    createTodo(input.value)
    input.value = ''
})