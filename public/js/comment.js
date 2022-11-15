async function newFormHandler(event) {
    event.preventDefault();
    const comment = document.querySelector('#comment').value;
    const collegeID = document.querySelector('#submit').data-collegeID.value;

    

    const response = await fetch(`/api/college/comment`, {
        method: 'POST',
        body: {
            comment,
            college_id: collegeID,
        headers: {
            'Content-Type': 'appplication/json',
        }},
    });
    if(response.ok) {
        document.location.replace(`/college/${collegeID}`);
    } else {
        alert('Failed to post comment');
    }
}

document.querySelector('#comment-form').addEventListener('submit', newFormHandler);