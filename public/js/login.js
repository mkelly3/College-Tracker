async function newFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('username-login').value;
    const password = document.querySelector('password-login').value;

    
}

document.querySelector('login-form').addEventListener('submit', newFormHandler);