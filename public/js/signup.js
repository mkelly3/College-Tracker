async function newFormHandler(event) {
    event.preventDefault();
    const userName = document.querySelector('username-signup').value;
    const email = document.querySelector('email-signup').value;
    const password = document.querySelector('password-signup').value;

    const response = await fetch(`/signup`, {
        method: 'POST',
        body: JSON.stringify({
            userName,
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to complete signup');
    }
}

document.querySelector('signup-form').addEventListener('submit', newFormHandler);