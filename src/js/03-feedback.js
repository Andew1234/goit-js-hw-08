import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageInput: document.querySelector('textarea[name="message"]'),
};

refs.emailInput.addEventListener('input', throttle(handleFormInput, 500));
refs.messageInput.addEventListener('input', throttle(handleFormInput, 500));

document.addEventListener('DOMContentLoaded', handlePageLoad);

function handleFormInput() {
  const formData = {
    email: refs.emailInput.value,
    input: refs.messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function handlePageLoad() {
  const formDataString = localStorage.getItem('feedback-form-state');
  if (formDataString) {
    const formData = JSON.parse(formDataString);
    fillFormFields(formData);
  } else {
    clearFormFields();
  }
}

function fillFormFields(formData) {
  refs.emailInput.value = formData.email || '';
  refs.messageInput.value = formData.message || '';
}

function clearFormFields() {
  refs.emailInput.value = '';
  refs.messageInput.value = '';
}

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    email: refs.emailInput.value,
    message: refs.messageInput.value,
  };
  console.log(formData);
  clearFormFields();
  localStorage.removeItem('feedback-form-state');
}
