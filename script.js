function mostraquestao(numeroquestao){
  let home = document.getElementById("home");
  let questao1 = document.getElementById("questao01");
  let questao2 = document.getElementById("questao02");
  let questao3 = document.getElementById("questao03");
  let questao4 = document.getElementById("questao04");
  if(numeroquestao<=0){home.style.display='grid';} else{home.style.display='none';}
  if(numeroquestao==1){questao1.style.display='block';} else{questao1.style.display='none';}
  if(numeroquestao==2){questao2.style.display='block';} else{questao2.style.display='none';}
  if(numeroquestao==3){questao3.style.display='block';} else{questao3.style.display='none';}
  if(numeroquestao==4){questao4.style.display='grid';} else{questao4.style.display='none';}
}
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