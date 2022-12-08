var throttle = require('lodash.throttle');

const email = document.querySelector('email');
const message = document.querySelector('message');
const formInput = document.querySelector('.feedback-form');
const submitBtn = document.querySelector('button[type=submit]');

const stateCheck = evt => {
  const savedInput = localStorage.getItem('feedback-form-state');
  const parsedInput = JSON.parse(savedInput);
  if (savedInput === null) {
    return;
  }
  formInput.email.value = parsedInput.email;
  formInput.message.value = parsedInput.message;
  if (formInput.email.value === '' && formInput.message.value === '') {
    submitBtn.disabled = true;
  } 
};

submitBtn.disabled = true;

const storageUpdate = evt => {
  const completeForm = {
    email: formInput.email.value,
    message: formInput.message.value,
  };
  if (completeForm.email != '' && completeForm.message != '') {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }

  localStorage.setItem('feedback-form-state', JSON.stringify(completeForm));
};

formInput.addEventListener('input', throttle(storageUpdate, 500));

window.addEventListener('Load', stateCheck());

formInput.addEventListener('submit', evt => {
  evt.preventDefault();
  submitBtn.disabled = true;
  console.log(localStorage.getItem('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  formInput.email.value = '';
  formInput.message.value = '';
  
});
