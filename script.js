//Questão 3
function listImages(url) {
    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Erro na requisição');
        }
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          return data;
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  }
  
  listImages("https://jsonplaceholder.typicode.com/photos")
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
/////////////////////////////////////////////////////////////////////    