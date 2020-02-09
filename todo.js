const toDoContainer = document.querySelector(".js-toDoList");
const toDoForm = toDoContainer.querySelector(".toDoForm");
const toDoInput = toDoContainer.querySelector("input");
const toDoUl = toDoContainer.querySelector(".toDoUl");
const toDoFinUl = toDoContainer.querySelector(".toDoFinUl");

const TODOS_LS = "toDos";
const TODOS_FIN_LS = "toDosFin";

let toDoArr = [];
let toDoFinArr = [];

//finBtn 눌렀을 때, backBtn 눌렀을 때 동작 하는거 하도록 하기

function handleBackBtn(event) {
  handleDeleteFin(event);
  const btn = event.target;
  const li = btn.parentNode;
  paintToDo(li.querySelector("span").innerText, "pending");
}

function handleFinBtn(event) {
  handleDelete(event);
  const btn = event.target;
  const li = btn.parentNode;
  paintToDo(li.querySelector("span").innerText, "finished");
}

function handleDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoUl.removeChild(li);
  const cleanToDos = toDoArr.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  })
  toDoArr = cleanToDos;
  saveToDos("pending");
}

function handleDeleteFin(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinUl.removeChild(li);
  const cleanToDos = toDoFinArr.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  })
  toDoFinArr = cleanToDos;
  saveToDos("finished");
}

function saveToDos(type) {
  if(type === "pending") localStorage.setItem(TODOS_LS, JSON.stringify(toDoArr));
  else if(type === "finished") localStorage.setItem(TODOS_FIN_LS, JSON.stringify(toDoFinArr));
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, "pending");
  toDoInput.value = "";
}

function paintToDo(text, type) {
  const li = document.createElement("li");
  const finBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  let newId = 0;
  if(type === "pending"){
    newId = toDoArr.length + 1;
    finBtn.classList.add("finBtn");
    finBtn.addEventListener("click", handleFinBtn);
    li.appendChild(finBtn);
    delBtn.addEventListener("click", handleDelete);
  } else if(type === "finished"){
    newId = toDoFinArr.length + 1;
    backBtn.classList.add("backBtn");
    backBtn.addEventListener("click", handleBackBtn);
    li.appendChild(backBtn);
    delBtn.addEventListener("click", handleDeleteFin);
  }
  delBtn.classList.add("delBtn");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  if(type === "pending") {
    toDoUl.appendChild(li);
    toDoArr.push(toDoObj);
    saveToDos("pending");
  }
  else if(type === "finished") {
    toDoFinUl.appendChild(li);
    toDoFinArr.push(toDoObj);
    saveToDos("finished");
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedToDosFin = localStorage.getItem(TODOS_FIN_LS);

  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text, "pending");
    });
  }

  if(loadedToDosFin !== null) {
    const parsedToDosFin = JSON.parse(loadedToDosFin);
    parsedToDosFin.forEach(function(toDo){
      paintToDo(toDo.text, "finished");
    });
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
