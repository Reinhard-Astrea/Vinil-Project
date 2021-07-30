const select = require('../routes/select.js');
const disco = require('./disco');

exports.init = () => {
  initTable();
  clickLogo();
}

function clickLogo(){
  document.getElementById('logo')
  .addEventListener('click', Event =>{
    initTable();
  });
  document.getElementById('home')
  .addEventListener('click', Event =>{
    initTable();
  });
}

function initTable(){
  let sec = document.getElementById('main');
  sec.innerHTML = `
    <div class="row row-cols-1 row-cols-md-5 g-4" id="Tcards"></div>
  `;

  select.allDiscos().then(rest =>{
    let table = document.getElementById('Tcards');

    for(let u of rest){
      table.insertAdjacentHTML('beforeend', `
        <div class="col card-disco">
          <div class="card text-white bg-dark bg-gradient h-100">
            <img src="../../main/BD/img/${u.img}" class="card-img-top img-tam"  alt="...">
            <div class="card-body">
              <h5 class="card-title">${u.nome_disco}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${u.autor}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${u.ano}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${u.id_disco}</h6>
            </div>
          </div>
        </div>
      `);
      click(u);
    }
  });
}

function click(u){
  let lastCard_disco =  getLastElementsByClassName('card-disco');
  lastCard_disco.addEventListener('click', Event =>{
    disco.viewDisco(u)
  });
}

function getLastElementsByClassName(nameClass){
  let doc = document.getElementsByClassName(nameClass);
  return doc.item(doc.length -1);
}

exports.click = click;
exports.initTable = initTable;
exports.getLastElementsByClassName = getLastElementsByClassName;