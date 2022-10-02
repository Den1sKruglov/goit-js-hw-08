import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = "feedback-form-state";

let saveLocalData = {};//сохранить обьект с данными

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

getLocalStorage();

refs.form.addEventListener("submit", handleSubmit);
refs.form.addEventListener("input", throttle(saveLocalStorage, 500));

function handleSubmit(event) {

  event.preventDefault();

  const {
    elements: { email, message }
  } = event.currentTarget;
  
  if (email.value === "" || message.value === "") {
    return alert("Please fill in all the fields!");
  }

  const userData = {};
  userData.email = email.value;
  userData.message = message.value;

  event.currentTarget.reset();

  console.log(userData);
  
  removeLocalStorage();
};

function removeLocalStorage() {
  saveLocalData = { email: '', message: '' };//Обьект по умолчанию
  localStorage.removeItem(FEEDBACK_FORM_STATE);//Удаляем информацию из лок хранилища
  console.log(saveLocalData)
  
};

function saveLocalStorage(event) {
  event.preventDefault();

  saveLocalData[event.target.name] = event.target.value//
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(saveLocalData));

};

function getLocalStorage() {
  const getSavedData = localStorage.getItem(FEEDBACK_FORM_STATE);

  if (getSavedData) {
    saveLocalData = JSON.parse(getSavedData);
    refs.input.value = saveLocalData.email || '';
    refs.textarea.value = saveLocalData.message || '';
  };
};















