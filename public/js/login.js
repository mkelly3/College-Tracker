async function newFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password-login').value;

    const response = await fetch(`api/users/login`, {
        method: `POST`,
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace(`dashboard`)
    } else {
        alert('Username or password incorrect! Please try again.');
    }
}

document.querySelector('#login-form').addEventListener('submit', newFormHandler);