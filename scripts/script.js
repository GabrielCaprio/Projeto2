function createUser(event){
    event.preventDefault();
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        console.log("Usuario criado com sucesso");
       // document.getElementById("message").innerText = "Usuario criado com sucesso.";
    })
    .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        //document.getElementById("errorMessage").innerText = errorMessage;
    });
}

function resetPassword(event){
    event.preventDefault();
    let email = document.getElementById("email3").value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        console.log("email enviado com sucesso");
      }).catch(function(error) {
        console.log("Email nao enviado")
        let errorCode = error.code;
        let errorMessage = error.message;
       // document.getElementById("errorMessage").innerText = errorMessage;
      });
}

function authenticateUser(event){
    event.preventDefault();
    let email = document.getElementById("email2").value;
    let password = document.getElementById("password2").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        console.log("Usuario logado com sucesso");
        let user = firebase.auth().currentUser.uid;
        console.log(user);
        if(user == 'lmmbqQ0f5JggaTmc4DmYe4XqeH92'){ //verifica se é o usuario ADMIN 
            window.location.replace('menuAdmin.html');
        }else{
            window.location.replace('menu_.html');
        }
    })
    .catch(function(error) {
        console.log("Usuario nao autenticado")
       // document.getElementById("errorMessage").innerText = errorMessage;
    });
}

function verifyAuthentication(event){
    let user = firebase.auth().currentUser;
    event.preventDefault();
    console.log(user);
    console.log(user.email);
}

function deleteUser(event){
    event.preventDefault();
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
        // User deleted.
        console.log("Usuario deletado com sucesso");
      }).catch(function(error) {
        console.log("Usuario nao deletado.")
        let errorCode = error.code;
        let errorMessage = error.message;
       // document.getElementById("errorMessage").innerText = errorMessage;
      });
}
