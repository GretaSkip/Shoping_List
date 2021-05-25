
// sessionStorage.setItem("data",        
// JSON.stringify( [
//         {   id: 1,
//             name: 1,
//             description: 'description'
//         },
//         {   id: 2,
//             name: 2,
//             description: 'description'
//         },
//         {   id: 3,
//             name: 3,
//             description: 'description'
//         }
//     ] )
    
// ); 
let globalVariable = 5;
// pass by reference or pass by value;


updateHtmlTable();
function updateHtmlTable() {
    let generatedHtml = "";
    let todos = JSON.parse( sessionStorage.getItem('data')  );
    if(todos === null){
        sessionStorage.setItem("data", JSON.stringify( [] ));
        sessionStorage.setItem("id", "0");
        return;
    }
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i]; 
        //let tableRow = `<tr><td>${todo.name}</td><td>${todo.description}</td></tr>`;
        let tableRow = `<tr>

                            <td>${todo.name}</td>
                            <td>${todo.description}</td>
                            <td>${todo.description}</td>`
                            +
                           `<td>
                           <div class="edit btn btn-warning" id="edit-${todo.id}">Edit</div>
                           <div class="delete btn btn-danger" id="${todo.id}">Delete</div>
                           </td>

                            <td>`+
                            // <div class="delete btn btn-danger" onclick="deleteEntry(${todo.id});">trinti irasa</div>
                            `</td>
                        </tr>`               
                        
        generatedHtml = generatedHtml + tableRow;
    }
    
    let bodyElement = document.getElementById("tasks-table");
    
    bodyElement.innerHTML = generatedHtml;
    activateDeleteBtns();
    activateEditBtns();
}

function addNewTodo() {
    if(!inputValidation2()){
        return;
    }
  
    let todos = JSON.parse( sessionStorage.getItem('data')  ); 
    
    //1 Get Name from document variable in form
    let nameValue = document.getElementById("list-item").value;
    //2 Get Description from document variable
    let description = document.getElementById("list-quantity").value;
    //3 create todo object with received name and description
    let category = document.getElementById("list-category").value;
    
    var todo = {
        id:  parseInt(sessionStorage.getItem("id")) + 1,
        name: nameValue,
        description: description
    }

    //4 add new todo to todoslist
    todos.push(todo); 
    sessionStorage.setItem("id", todo.id );
    sessionStorage.setItem("data", JSON.stringify(todos));
    //5 Call UpdateHtmlTable function
    clearForm();
    updateHtmlTable();
    
    document.getElementById('list-item').focus();
}

function clearForm() {
    document.getElementById("list-item").value = "";
    document.getElementById("list-quantity").value = "";
    document.getElementById("list-category").value = "";
}

function inputValidation() {
    document.getElementById("error").innerHTML = "";
    if( isValid("list-item") ){
        return true;
    }

    if( !isValid("list-quantity") ){
        document.getElementById("error").innerHTML += '<h1 >Forma negali buti tuscia</h1>';
    }
    
    if( !isValid("list-item") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
    }

    if( !isValid("list-category") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
    }

        return false;
}

function inputValidation2() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").classList.remove('success');
    document.getElementById("error").classList.remove('error');

    if( !isValid("list-item") &&
    !isValid("list-quantity") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti tuscia</h1>";
        document.getElementById("error").classList.add('error');
        return false;
    }

    if( !isValid("list-item") &&
    isValid("list-quantity") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
        document.getElementById("error").classList.add('error');
        return false;
    }
    document.getElementById("error").classList.add('success');
    document.getElementById("error").innerHTML += "<h1>Item added successfully!</h1>";
       
    return true;
}

function isValid(id) {
    
    if(document.getElementById(id).value == ""){
        return false;
    }
    return true;
}

function editEntry(id){
    
    let todos = JSON.parse( sessionStorage.getItem('data')  ); 
    for (let i = 0; i < todos.length; i++) { 
        if( `edit-${todos[i].id}` == id){
            activateEditMode(todos[i]);
        } 
    }
}

function activateEditMode(todo){
    console.log(todo);
    //Get Html elements of Name, description
    document.getElementById("list-item").value = todo.name;
    document.getElementById("list-quantity").value = todo.description;
    document.getElementById("list-category").value = todo.description;
    document.getElementById("todo-id").value = todo.id;

    //Update those html elements with todo.name, todo.description
    //Unhide the EditButton
    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
}

function editTodo(){
    if(!inputValidation2()){
        return;
    }
    

    let todos = JSON.parse( sessionStorage.getItem('data')  ); 
    let todo = {
        "id": "",
        "name": "",
        "description": ""
    }
    
    todo.id = document.getElementById("todo-id").value;
    todo.name = document.getElementById("list-item").value;
    todo.description = document.getElementById("list-quantity").value;
    todo.category = document.getElementById("list-category").value;
    
    for (let i = 0; i < todos.length; i++) {
        if( todos[i].id == todo.id){
            todos[i] = todo; 
            break;
        }
    }
    sessionStorage.setItem("data", JSON.stringify(todos));

    updateHtmlTable();

    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
}

function deleteEntry(id) {
    
    let todos = JSON.parse( sessionStorage.getItem('data')  ); 
   for (let i = 0; i < todos.length; i++) { 
       if( todos[i].id == id){
           todos.splice(i,1);
           break;
       }
   }
   sessionStorage.setItem("data", JSON.stringify(todos));

   updateHtmlTable();
}

function activateDeleteBtns() {
    let deleteBtns = document.getElementsByClassName('delete');

    for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click',function(){
            deleteEntry(btn.id);
        });
    }
}

function activateEditBtns() {
    let editBtns = document.getElementsByClassName('edit');
    
    for (let i = 0; i < editBtns.length; i++) {
        let btn = editBtns[i];
        btn.addEventListener('click',function(){
            editEntry(btn.id);
        });
    }
}