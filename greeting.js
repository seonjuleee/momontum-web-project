const greetingContainer = document.querySelector(".js-greeting");
const greetingForm = greetingContainer.querySelector(".greetingForm");
const userInput = greetingForm.querySelector("input");
const greetingTitle = greetingContainer.querySelector(".greetingTitle");
const greetingContent = greetingContainer.querySelector(".greeting");
const toDoList = document.querySelector(".js-toDoList");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  //title, form 숨기고 greeting만 보이게 하기
  greetingTitle.classList.remove(SHOWING_CN);
  greetingForm.classList.remove(SHOWING_CN);
  greetingContent.classList.add(SHOWING_CN);
  greetingContent.innerText = `Hello, ${text}`; //나중에 시간에 따라 텍스트 변하게 하기
  toDoList.classList.add(SHOWING_CN);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = userInput.value;
  console.log(currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  //title, form 보이게 하기
  greetingTitle.classList.add(SHOWING_CN);
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }
  else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
