async function commentFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('input[name="comment-body"]').value.trim();

    //prevents users from submitting blank comments
    if (content) {
        const response = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');

        } else {
            console.log(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);