const addProblema = (event) =>{
    event.preventDefault();
    let local = document.getElementById("local").value;
    let desc = document.getElementById("desc").value;
    let uid = firebase.auth().currentUser.uid;
    db.collection("problema").add({
        local : local,
        desc : desc,
        autor : uid
    })
    .then(function (docRef) {
        console.log("Problema Relatado!");
        console.log("Documento armazenado com ID: ", docRef.id);
    })
    .catch(function (error) {
        console.error("Erro ao relatar Problema!", error);
    });
}

const listProblemas = (event) => {
    let tabela = document.getElementsByTagName("table")[0];
    let linha = tabela.insertRow(-1);
    let col0 = linha.insertCell(0);
    let col1 = linha.insertCell(1);
    col0.appendChild(document.createTextNode("LOCAL"));
    col1.appendChild(document.createTextNode("DESCRIÇÃO"));
    db.collection("problema").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            col0.appendChild(document.createTextNode(doc.data().local));
            col1.appendChild(document.createTextNode(doc.data().desc));
        });
    });
}

const listProblemasUser = (event) => {
    let user = firebase.auth().currentUser;
    let tabela = document.getElementsByTagName("table")[0];
    let linha = tabela.insertRow(-1);
    let col0 = linha.insertCell(0);
    let col1 = linha.insertCell(1);
    let col2 = linha.insertCell(2);
    let col3 = linha.insertCell(3);
    col0.appendChild(document.createTextNode("ID"));
    col1.appendChild(document.createTextNode("Local"));
    col2.appendChild(document.createTextNode("Descrição"));
    col3.appendChild(document.createTextNode("Detalhes"));
    db.collection("problema").where("autor","==", user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            let col2 = linha.insertCell(2);
            let col3 = linha.insertCell(3);
            col0.appendChild(document.createTextNode(doc.id));
            col1.appendChild(document.createTextNode(doc.data().local));
            col2.appendChild(document.createTextNode(doc.data().desc));
            col3.appendChild(document.createTextNode(doc.data().detalhes));
        });
    });
}

const listProblemasAdmin = (event) => {
    let user = firebase.auth().currentUser;
    let tabela = document.getElementsByTagName("table")[0];
    let linha = tabela.insertRow(-1);
    let col0 = linha.insertCell(0);
    let col1 = linha.insertCell(1);
    let col2 = linha.insertCell(2);
    let col3 = linha.insertCell(3);
    let col4 = linha.insertCell(4);
    let col5 = linha.insertCell(5);
    col0.appendChild(document.createTextNode("ID"));
    col1.appendChild(document.createTextNode("Local"));
    col2.appendChild(document.createTextNode("Descrição"));
    col3.appendChild(document.createTextNode("Detalhes"));
    col4.appendChild(document.createTextNode("Resposta"));
    col5.appendChild(document.createTextNode("Status"));
    db.collection("problema").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            let col2 = linha.insertCell(2);
            let col3 = linha.insertCell(3);
            let col4 = linha.insertCell(4);
            let col5 = linha.insertCell(5);
            col0.appendChild(document.createTextNode(doc.id));
            col1.appendChild(document.createTextNode(doc.data().local));
            col2.appendChild(document.createTextNode(doc.data().desc));
            col3.appendChild(document.createTextNode(doc.data().detalhes));
            col4.appendChild(document.createTextNode(doc.data().resposta));
            col5.appendChild(document.createTextNode(doc.data().status));
        });
    });
}

const editProblema = (event) => {
    event.preventDefault();
    let id = document.getElementById("idproblema").value;
    let desc = document.getElementById("desc").value;
    db.collection("problema").doc(id).update({
        detalhes : desc
    })
    .then(function () {
        console.log("Documento atualizado!");
    })
    .catch(function (error) {
        console.error("Erro ao editar Problema!", error);
    });
}

const respProblema = (event) => {
    event.preventDefault();
    let id = document.getElementById("idproblema").value;
    let resposta = document.getElementById("resposta").value;
    let status = document.querySelector('input[name="opcao"]:checked').value;
    db.collection("problema").doc(id).update({
        resposta : resposta,
        status
    })
    .then(function () {
        console.log("Problema Respondido!");
        alert("Problema Respondido! Status: ", status);
    })
    .catch(function (error) {
        console.error("Erro ao editar Problema!", error);
    });
}