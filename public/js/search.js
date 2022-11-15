async function search (event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    //const location = document.querySelector('#location').value;
    //const size = document.querySelector('#size').value;
    //const type = document.querySelector('#type').value;
    //const acceptance = document.querySelector('#accpetance').value;
    //const grad = document.querySelector('#grad').value;

    const response = await fetch ('/college', {
        method: 'GET',
        body: name,
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/single-college');
      } else {
        alert(response.statusText);
      }
}

document.querySelector('#searchForm').addEventListener('submit', search);