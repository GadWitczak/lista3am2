function mostraquestao(numeroquestao){
  let home = document.getElementById("home");
  let questao1 = document.getElementById("questao01");
  let questao4 = document.getElementById("questao04");
  let questao5 = document.getElementById("questao05");
  let questao7 = document.getElementById("questao07");
  if(numeroquestao<=0){home.style.display='grid';} else{home.style.display='none';}
  if(numeroquestao==1){questao1.style.display='grid';} else{questao1.style.display='none';}
  if(numeroquestao==4){questao4.style.display='grid';} else{questao4.style.display='none';}
  if(numeroquestao==5){questao5.style.display='block';} else{questao5.style.display='none';}
  if(numeroquestao==7){questao7.style.display='block';} else{questao7.style.display='none';}
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
/////////////////////////Questão 8 e 9/////////////////////////////////////////////////




let cadastro;


function update(index,link){
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs-1]; //cria uma conexao com o input que é do tipo button



    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show'; //mostra butao de envio

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url=link; //"/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = ()=>{ 

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }
    });  

}

function remove(index,_name,link){ //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({name:_name}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    http.onload = ()=>{ 
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(data){
    //Adiciona um dado novo
}

function list(){
    //fazer em casa. Lista de usuários.

    //Primeira parte: envia mensagem para o servidor pedindo uma listagem dos usuários

    //Segunda parte: apos recebimento da lista de usuarios, no formato JSON, colocar os usuarios na interface
    let tableList = document.getElementById("list");

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let span = document.createElement("span");
    let cont;
    //for(let cont=0;cont<datas.length;cont++){ 
        td.setAttribute(`data-index-row=${cont}`);
        span.innerHTML =  Object.keys(datas[cont])[0] //keys 0 - name, 1 - email
        span.className="show";
        td.appendChild(span);
        tr.appendChild(td);
        
        tableList.appendChild(tr);
    //}

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////