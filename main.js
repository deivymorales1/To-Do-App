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
let data = [];

let acceptData = () => {
  data.push({ // Empujamos al local storage
    text : textInput.value,
    date : dateInput.value,
    description : textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

// Creando las tareas

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
      <span class="fw-bold">${x.text}</span>
      <span class="small text-secondary">
        ${x.date}
      </span>
      <p>${x.description}</p>
      <span class="options">
        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `);
  });
  resetForm();
};

// Eliminando la tarea
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
}

// Editar tareas
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
}


// Creando la limpieza de los campos

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  createTasks();
})();