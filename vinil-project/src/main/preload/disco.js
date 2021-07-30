const sql = require('../routes/select');
const pageUpdate = require('./pageUpdate');
const delet = require('../routes/delete');
const inicio = require('./inicio');
const letra = require('./letra');

exports.viewDisco = (disco) =>{
    let main = document.getElementById('main');

    main.innerHTML = `
        <div class="row align-items-center mb-3" style="max-width: 70%;">
            <div class="col">
                <img src="../../main/BD/img/${disco.img}" class="img-fluid" alt="">
            </div>
            <div class="col text-white "> 
                <p>Disco: ${disco.nome_disco}</p>
                <p>Autor: ${disco.autor}</p>
                <p>Ano  : ${disco.ano}</p>
                <p>ID   : ${disco.id_disco}</p>
                <button id="update" type="button" class="btn btn-warning">Update</button>
                <button id="delete" type="button" class="btn btn-danger">Delete</button> 
            </div>
        </div>

        <hr class="dropdown-divider text-white">

        <div class="container text-white mt-3">
            <h4>Musicas</h4>
            <ul class="list-group list-group-flush text-white" id="ul_musica">
                
            </ul>
        </div>
    `;

    sql.allMusica(disco.id_disco).then(res =>{
        let ul_musica = document.getElementById('ul_musica');
        for(let u of res){
            ul_musica.insertAdjacentHTML('beforeend', 
            `<li class="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            ${u.nome_musica}
            </div>
            <span class="badge bg-primary rounded-pill let-btn">
            Letra
            <!--<button type="button" class="btn btn-primary let-btn">Letra</button>-->
            </span>
            </li>
            `);
            inicio.getLastElementsByClassName('let-btn')
            .addEventListener('click', event=>{
                letra.viewLetra(u.nome_musica, disco);
            })
        }
    });

    document.getElementById('update').addEventListener('click', Event=>{
        pageUpdate.Init(disco);
    });

    document.getElementById('delete').addEventListener('click', Event=>{
        confimDelet(disco.id_disco);
    });
}

function confimDelet(id_disco){
    let x = confirm('Tem certeza que deseja apagar esse disco?');
    if(x){
        delet.deleteDisco(id_disco).then(res=>{
            inicio.initTable();
        })
    }
}