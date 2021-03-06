
let globalVariable = 5;


updateHtmlTable();
function updateHtmlTable() {
    
    let generatedHtml = "";
    let shoplist = JSON.parse( localStorage.getItem('data')  );
    let select = document.getElementById("select");

    if(shoplist === null){
        localStorage.setItem("data", JSON.stringify( [] ));
        localStorage.setItem("id", "0");
        return;
    }
    for (let i = 0; i < shoplist.length; i++) {
        const shopinglist = shoplist[i];
        if(select.value != "0"){
            if(select.value != shopinglist.category);
            continue;
        }
         
        
        let tableRow = `<tr>

                            <td>${shopinglist.item}</td>
                            <td>${shopinglist.quantity}</td>
                            <td>${shopinglist.category}</td>`
                            +
                           `<td>
                           <div class="edit btn btn-warning" id="edit-${shopinglist.id}">Edit</div>
                           <div class="delete btn btn-danger" id="${shopinglist.id}">Delete</div>
                           </td>

                            <td>`+
                           
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
  
    let todos = JSON.parse( localStorage.getItem('data')  ); 
    
   
    let itemValue = document.getElementById("list-item").value;
    
    let quantity = document.getElementById("list-quantity").value;
    
    let category = document.getElementById("list-category").value;

    var todo = {
        id:  parseInt(localStorage.getItem("id")) + 1,
        item: itemValue,
        quantity: quantity,
        category: category
    }

   
    todos.push(todo); 
    localStorage.setItem("id", todo.id );
    localStorage.setItem("data", JSON.stringify(todos));
   
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
        document.getElementById("error").innerHTML += '<h1 >Please fill the form</h1>';
    }
    
    if( !isValid("list-item") ){
        document.getElementById("error").innerHTML += "<h1>Please fill the Item</h1>";
    }

    if( !isValid("list-category") ){
        document.getElementById("error").innerHTML += "<h1>Please fill the form</h1>";
    }

        return false;
}

function inputValidation2() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").classList.remove('success');
    document.getElementById("error").classList.remove('error');

    if( !isValid("list-item") &&
    !isValid("list-quantity") ){
        document.getElementById("error").innerHTML += "<h1>Please fill the form</h1>";
        document.getElementById("error").classList.add('error');
        return false;
    }

    if( !isValid("list-item") &&
    isValid("list-quantity") ){
        document.getElementById("error").innerHTML += "<h1>Please fill the Item</h1>";
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
    
    let todos = JSON.parse( localStorage.getItem('data')  ); 
    for (let i = 0; i < todos.length; i++) { 
        if( `edit-${todos[i].id}` == id){
            activateEditMode(todos[i]);
        } 
    }
}

function activateEditMode(todo){
    console.log(todo);
   
    document.getElementById("list-item").value = todo.item;
    document.getElementById("list-quantity").value = todo.quantity;
    document.getElementById("list-category").value = todo.category;
    document.getElementById("shoplist-id").value = todo.id;

    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
}

function editTodo(){
    if(!inputValidation2()){
        return;
    }
    

    let todos = JSON.parse( localStorage.getItem('data')  ); 
    let todo = {
        "id": "",
        "item": "",
        "quantity": "",
        "category": ""

    }
    
    todo.id = document.getElementById("shoplist-id").value;
    todo.item = document.getElementById("list-item").value;
    todo.quantity = document.getElementById("list-quantity").value;
    todo.category = document.getElementById("list-category").value;
    
    for (let i = 0; i < todos.length; i++) {
        if( todos[i].id == todo.id){
            todos[i] = todo; 
            break;
        }
    }
    localStorage.setItem("data", JSON.stringify(todos));

    updateHtmlTable();

    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
}

function deleteEntry(id) {
    
    let todos = JSON.parse( localStorage.getItem('data')  ); 
   for (let i = 0; i < todos.length; i++) { 
       if( todos[i].id == id){
           todos.splice(i,1);
           break;
       }
   }
   localStorage.setItem("data", JSON.stringify(todos));

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

let hide = document.getElementById("hide");
let show = document.getElementById("show");

hide.addEventListener('click', function() {
    document.getElementById("form").classList.add('hidden');
    show.classList.remove('hidden');
});
show.addEventListener('click', function() {
    document.getElementById("form").classList.remove('hidden');
    show.classList.add('hidden');
});

let select = document.getElementById("select");
select.addEventListener('change', function() {
    console.log(select.value);
    updateHtmlTable();
});

categorySelect();
function categorySelect() {

let shoplist = JSON.parse( localStorage.getItem('data')  );
let select = document.getElementById("select");
let categories = [];
let HTML = "";

shoplist.forEach(item => {
    if (!categories.includes(item.category)) {
        categories.push(item.category)
    }
});
categories.forEach(category => {
    HTML += `<option value = "${category}" >${category}</option>`
});
select.innerHTML += HTML;

}