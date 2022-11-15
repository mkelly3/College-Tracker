async function newFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;

    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to complete signup');
    }
}

document.querySelector('#signup-form').addEventListener('submit', newFormHandler);