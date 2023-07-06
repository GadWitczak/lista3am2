function mostraquestao(numeroquestao){
  let home = document.getElementById("home");
  let questao1 = document.getElementById("questao01");
  let questao4 = document.getElementById("questao04");
  let questao5 = document.getElementById("questao05");
  let questao8 = document.getElementById("questao08");
  if(numeroquestao<=0){home.style.display='grid';} else{home.style.display='none';}
  if(numeroquestao==1){questao1.style.display='block';} else{questao1.style.display='none';}
  if(numeroquestao==4){questao4.style.display='grid';} else{questao4.style.display='none';}
  if(numeroquestao==5){questao5.style.display='block';} else{questao5.style.display='none';}
  if(numeroquestao==8){questao8.style.display='block';} else{questao8.style.display='none';}
}
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Questão 1 e 2//////////////////////////////////////////////
function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var researchGate = document.forms["myForm"]["researchGate"].value;
  var phone = document.forms["myForm"]["phone"].value;

  var namePattern = /^[a-zA-Z ]{1,40}$/;
  var emailPattern = /^[^\s@]+@[gmail|hotmail|outlook]+\.com$/;
  var researchGatePattern = /^http:\/\/www\.researchgate\.com\/profile\/.*/;
  var phonePattern = /^\(\d{2}\) \d{4}-\d{4}$/;

  var isValid = true;
  var errorMessage = "";

  if (!name.match(namePattern)) {
    errorMessage += "O nome deve conter apenas letras e ter no máximo 40 caracteres.\n";
    isValid = false;
  }

  if (!email.match(emailPattern)) {
    errorMessage += "O email deve estar no formato *@gmail.com, *@hotmail.com ou *@outlook.com.\n";
    isValid = false;
  }

  if (!researchGate.match(researchGatePattern)) {
    errorMessage += "O link do ResearchGate deve começar com 'http://www.researchgate.com/profile/'.\n";
    isValid = false;
  }

  if (!phone.match(phonePattern)) {
    errorMessage += "O telefone deve estar no formato (00) 0000-0000.\n";
    isValid = false;
  }

  if (!isValid) {
    alert(errorMessage);
    return false;
 
  }

var registrations = [];

function validateForm() {


  if (!isValid) {
    alert(errorMessage);
    return false;
  }

 
  registrations.push({
    name: name,
    email: email,
    researchGate: researchGate,
    phone: phone
  });

 
  if (registrations.length >= 20) {
    alert("O limite de 20 cadastros foi atingido.");
  
  }


  document.forms["myForm"].reset();


  return false;

}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//Questão 3 e 4//
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

function mostraImagem(imagem){
  let listarimagensDir = document.getElementById("apresentarimagenscoluna1");
  let listarimagensEsq = document.getElementById("apresentarimagenscoluna2");

  let card = document.createElement('div');
  card.className = 'card';

  let thumbnail = document.createElement('img');
  thumbnail.textContent = "teste";
  thumbnail.src = imagem.thumbnailUrl;
  thumbnail.alt = imagem.title;
  let title = document.createElement('h4');
  title.textContent = imagem.title;
  thumbnail.onclick = () => abrelightbox(imagem.url, imagem.title);

  card.appendChild(title);
  card.appendChild(thumbnail);


  if (listarimagensEsq.childElementCount <= listarimagensDir.childElementCount) {
    listarimagensEsq.appendChild(card);
  } else {
    listarimagensDir.appendChild(card);
  }
}

function abrelightbox(imageurl, titulo){
  let lightbox = document.getElementById('lightbox');
  let lightboxImage = document.getElementById('lightboxImage');
  let h3dalightbox = document.getElementById('h3dalightbox');

  lightbox.style.display = 'block';
  h3dalightbox.innerText = titulo;
  lightboxImage.src = imageurl;
  lightboxImage.alt = titulo;
}

function fechaLightbox() {
  let lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

listImages('https://jsonplaceholder.typicode.com/photos')
  .then(imagens => {
    if (imagens) {
      imagens.forEach(imagem => {
        mostraImagem(imagem);
      });
    } else {
      console.log('Nenhum objeto recebido');
    }
  })
  .catch(error => {
    console.error(error);
  });
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Questão 5, 6 e 7///////////////////////////////////
var postsResponse = [];
var currentPage = 1;

function paginate(array, page_size = 10, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function listPots(url) {

    fetch(url)
        .then(response => response.json())
        .then(json => {
            postsResponse = json;
            switchPage(postsResponse, 1);
            return json;
        });


}

function listPotsByUset(url, userId) {

    fetch(url)
        .then(response => response.json())
        .then(json => {
            postsResponse = json;

            userId = userId.trim();
            if (userId == "") {
                switchPage(postsResponse, 1);

                return;
            }

            postsResponse = postsResponse.filter(post => post.userId == userId);
            switchPage(postsResponse, 1);

        });

}

function switchPage(posts, page) {
    currentPage = page;
    var posts = paginate(posts, 10, page);
    var postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
       
            var postDiv = document.createElement('div');
        postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        `;
        
        
       
        postsDiv.appendChild(postDiv);
    });


}
function showPosts(posts) {
    var postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        if (post.id % 2 == 0) {
            post.title = "Resposta: " + post.title;
            var postDiv = document.createElement('div');
            postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <sub>${post.body}</sub>
        `;
            
        }
        else {
            var postDiv = document.createElement('div');
        postDiv.innerHTML = `
        <br><br>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        `;
        }
        
       
        postsDiv.appendChild(postDiv);
    });


}
(async () => {
    await listPots('https://jsonplaceholder.typicode.com/posts');
})()
////////////////////////////////////////////////////////////////////////////////////////
