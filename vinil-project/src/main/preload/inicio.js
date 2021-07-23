const select = require('../routes/select.js');

exports.init = () => {
  initTable();
  clickLogo();
  pesquisa();
}

function clickLogo(){
  document.getElementById('logo')
  .addEventListener('click', Event =>{
    initTable();
  })
}

function pesquisa(){
  document.getElementById('txtBusca')
  .addEventListener('input', Event =>{
    if(document.getElementById('txtBusca').value == '')
      initTable();
    else
      busca();
  })
}

async function busca(){
  let sec = document.getElementById('sec');
  sec.innerHTML = `
    <table id="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Disco</td>
              <td>Musica</td>
              <td>Ano</td>
              <td>Autor</td>
            </tr>
          </thead>
          <tbody id="tbody">

          </tbody>
      </table>
  `;

  select.pesquisa(document.getElementById('txtBusca').value).then(rest =>{
    let table = document.getElementById('tbody');

    for(let u of rest){
      table.insertAdjacentHTML('beforeend', `
        <tr>
          <td class="id_disco"   >${u.id_disco}</td>
          <td class="nome_disco" >${u.nome_disco}</td>
          <td class="nome_musica">${u.nome_musica}</td>
          <td class="ano"        >${u.ano}</td>
          <td class="autor"      >${u.autor}</td>
        </tr>
      `);
      click();
    }

  });
}


function initTable(){
  let sec = document.getElementById('sec');
  sec.innerHTML = `
    <table id="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Disco</td>
              <td>Musica</td>
              <td>Ano</td>
              <td>Autor</td>
            </tr>
          </thead>
          <tbody id="tbody">

          </tbody>
      </table>
  `;

  select.allDiscos().then(rest =>{
    let table = document.getElementById('tbody');

    for(let u of rest){
      table.insertAdjacentHTML('beforeend', `
        <tr>
          <td class="id_disco"  >${u.id_disco}</td>
          <td class="nome_disco">${u.nome_disco}</td>
          <td                   >------</td>
          <td class="ano"       >${u.ano}</td>
          <td class="autor"     >${u.autor}</td>
        </tr>
      `);
      click(false)
    }
  });
}

function click(valida){ 
  let txtBusca = document.getElementById('txtBusca');

  if(valida){
    let nome_musica = getLastElementsByClassName('nome_musica');
    nome_musica.addEventListener('click', Event =>{
      txtBusca.value = nome_musica.value;
      busca();
    });
  }

  let id_disco = getLastElementsByClassName('id_disco');
  id_disco.addEventListener('click', Event =>{
    txtBusca.value = id_disco.innerText;
    busca();
  });

  let nome_disco = getLastElementsByClassName('nome_disco');
  nome_disco.addEventListener('click', Event =>{
    txtBusca.value = nome_disco.innerText;
    busca();
  });

  let ano = getLastElementsByClassName('ano');
  ano.addEventListener('click', Event =>{
    txtBusca.value = ano.innerText;
    busca();
  });

  let autor = getLastElementsByClassName('autor');
  autor.addEventListener('click', Event =>{
    txtBusca.value = autor.innerText;
    busca();
  });
}

function getLastElementsByClassName(nameClass){
  let doc = document.getElementsByClassName(nameClass);
  return doc.item(doc.length -1);
}