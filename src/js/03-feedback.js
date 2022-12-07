var throttle = require('lodash.throttle');

// const email = document.querySelector("email");
// const message = document.querySelector("message");
const formInput = document.querySelector('.feedback-form');

const storageUpdate = evt => {
 
    const completeForm = {
    email: formInput.email.value,
    message: formInput.message.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(completeForm));
};
formInput.addEventListener('input', throttle(storageUpdate, 500));

const stateCheck = evt => {
  const savedInput = localStorage.getItem('feedback-form-state');
  const parsedInput = JSON.parse(savedInput);

  if (savedInput === null) {
    return;
  } 
    formInput.email.value = parsedInput.email;
    formInput.message.value = parsedInput.message;
  
};
window.addEventListener('Load', stateCheck());

formInput.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log(localStorage.getItem("feedback-form-state"))
    localStorage.removeItem("feedback-form-state")
    formInput.email.value = ""
    formInput.message.value = ""
})

