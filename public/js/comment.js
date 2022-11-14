async function newFormHandler(event) {
    event.preventDefault();
    const comment = document.querySelector('comment').value;

    const response = await fetch(`/api/college`, {
        method: 'POST',
        body: JSON.stringify({
            comment
        }),
        headers: {
            'Content-Type': 'appplication/json',
        },
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to post comment');
    }
}

document.querySelector('comment-form').addEventListener('submit', newFormHandler);