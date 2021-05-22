function inputValidation() {
    document.getElementById("error").innerHTML = "";
    if( isValid("todo-name") ){
        return true;
    }

    if( !isValid("todo-description") ){
        document.getElementById("error").innerHTML += '<h1 >Forma negali buti tuscia</h1>';
    }
    
    if( !isValid("todo-name") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
    }

        return false;
}