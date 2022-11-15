async function newFavorite(event){
    event.preventDefault();

    const name = document.querySelector('#collegeName').textContent;
    const url =document.querySelector('#collegePrice').textContent;

    console.log(name)
    console.log(url)

    const response = await fetch(`/api/college/{{id}}`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          url
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
      }
    };
    
  document.querySelector('.mainInfo').addEventListener('click', newFavorite);
  console.log('clicked')


