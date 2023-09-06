// Apuntando a los elementos del DOM
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//Anyadiendo funcionalidad al boton
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

// Validando el formulario.
let formValidation = () => {
  if(textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "La tarea no puede estar en blanco."
  }else{
    console.log("Success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (()=> {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Almacenar los datos.
let data = {};

let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;
  createTask();
};

// Creando las tareas

let createTask = () => {
  tasks.innerHTML += `
  <div>
    <span class="fw-bold">${data.text}</span>
    <span class="small text-secondary">
      ${data.date}
    </span>
    <p>${data.description}</p>
    <span class="options">
      <i class="fas fa-edit"></i>
      <i class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;

  resetForm();
}


// Creando la limpieza de los campos

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}