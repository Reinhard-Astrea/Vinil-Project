const inicio = require('./inicio');
const select = require('../routes/select');
const letra  = require('./letra');
var pos1, pos2, disco, musica;

exports.Init = ()=>{
    clickPesquisa();
}

function clickPesquisa() {
    let txtSearch = document.getElementById('txtSearch')

    document.getElementById('search')
    .addEventListener('click', events=>{
        pos1 = 0;
        pos2 = 0;
    });
    txtSearch.addEventListener('keyup', event=>{
        if (event.key == 'Enter') {
            pos1 = 0;
            pos2 = 0;
            pesquisa(txtSearch.value);
        }
    })
}

function pesquisa(txt){

    document.getElementById('main').innerHTML = `

        <h3 class="text-white" id="Disco">Disco:</h3>
        <div class="row row-cols-1 row-cols-md-5 g-4" id="Tcards"></div>
        <div class="row">
        <div class="col text-center" id="buton-disco"></div>
        </div>

        <hr class="dropdown-divider text-white my-3">

        <h3 class="text-white" id="Musica">Musica:</h3>
        <table class="table table-dark" id="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Musica</th>
                    <th scope="col">Artista</th>
                    <th scope="col">*****</th>
                </tr>
            </thead>
            <tbody id="Ttable">
            </tbody>
        </table>
        <div class="row">
        <div class="col text-center" id="buton-musica"></div>
        </div>

    `;

    select.searchDisco(txt).then(res =>{
        if(res.length > 0){
            disco = res;
            geraCards();
        }
        else{
            document.getElementById('Disco').innerText = "Disco: Nenhum Resultado";
        }
    });
    select.searchMusica(txt).then(res =>{
        if(res.length > 0){
            musica = res;
            geraTabela();
        }
        else{
            document.getElementById('Musica').innerText = "Musica: nunhum Resultado";
            document.getElementById('table').remove();
        }
    });
}

function geraCards(){
    let Tcards = document.getElementById('Tcards');
    let aux = pos1 + 5;

    for(; (pos1 < aux) && (pos1 < disco.length); pos1++){
        Tcards.insertAdjacentHTML('beforeend', `
            <div class="col card-disco">
                <div class="card text-white bg-dark bg-gradient h-100">
                    <img src="../../main/BD/img/${disco[pos1].img}" class="card-img-top img-tam"  alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${disco[pos1].nome_disco}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${disco[pos1].autor}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">${disco[pos1].ano}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">${disco[pos1].id_disco}</h6>
                    </div>
                </div>
            </div>
        `);
        inicio.click(disco[pos1]);
    }

    if(pos1 < disco.length){
        document.getElementById('buton-disco')
        .innerHTML = `<button type="button" class="btn btn-secondary my-3" id="disco-btn">Mostrar Mais</button>`
    
        document.getElementById('disco-btn')
        .addEventListener('click', Event=>{
            geraCards();
        });
    }
    else{
        document.getElementById('buton-disco').innerHTML = "";
    }
}

function geraTabela(){
    let Ttable = document.getElementById('Ttable');
    let aux = pos2+ 10;
    let u;

    for(; (pos2 < aux) && (pos2 < musica.length); pos2++){
        u = musica[pos2]
        Ttable.insertAdjacentHTML('beforeend', `
            <tr>
                <th scope="row">#${u.key_disco}</th>
                <td>${u.nome_musica}</td>
                <td>${u.autor}</td>
                <td><button type="button" class="btn btn-primary let-btn">Letra</button></td>
            </tr>
        `);
       
        inicio.getLastElementsByClassName('let-btn')
        .addEventListener('click', Event=>{
            select.getDisco(u.key_disco)
            .then(res=>{
                letra.viewLetra(u.nome_musica, res);
            });
        })
    }

    if(pos2 < musica.length){
        document.getElementById('buton-musica')
        .innerHTML = `<button type="button" class="btn btn-secondary my-3" id="musica-btn">Mostrar Mais</button>`
    
        document.getElementById('musica-btn')
        .addEventListener('click', Event=>{
            geraTabela();
        });
    }
    else{
        document.getElementById('buton-musica').innerHTML = "";
    }
}