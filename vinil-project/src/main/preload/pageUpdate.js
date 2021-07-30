const update   = require('../routes/update');
const select   = require('../routes/select');
const inicio   = require('./inicio')
const addDisco = require('./adicionar_disco')
const reqDisco    = require('./disco');
var id;

exports.Init = (disco) =>{
    let main = document.getElementById('main');
    id = disco.id_disco;
    main.innerHTML = `
        <div class="container" id="divForm" style="width: 80%;">
            <div id="inputArea">
                <input value="${disco.nome_disco}" class="form-control text-center mb-3" id="nome_disco" type="text" placeholder="Disco" aria-label="default input example">
                <input value="${disco.autor}" class="form-control text-center mb-3" id="autor" type="text" placeholder="Autor" aria-label="default input example">
                <input value="${disco.ano}" class="form-control text-center mb-3" id="ano" type="text" placeholder="Ano" aria-label="default input example">
            </div>
            <div class="d-grid gap-2">
                <button type="button" id="cadastrar" class="btn btn-success">Cadastrar</button>
            </div>
        </div>
    `;

    addDisco.enter();

    select.allMusica(disco.id_disco).then(res =>{
        let inputArea = document.getElementById('inputArea');
        if(res.length > 0){
            for(let u of res){
                inputArea.insertAdjacentHTML('beforeend',
                `<input value="${u.nome_musica}" class="form-control text-center mb-3 musica"  type="text" placeholder="Musica" aria-label="default input example">`);
                addDisco.addMusica();            
            }
        }
        else{
            inputArea.insertAdjacentHTML('beforeend',
            `<input class="form-control text-center mb-3 musica"  type="text" placeholder="Musica" aria-label="default input example">`);
            addDisco.addMusica();
        }
    });

    document.getElementById('cadastrar').addEventListener('click', Event=>{
        let newDisco = new addDisco.Disco();
        update.updateDisco(disco.img, disco.id_disco, newDisco).then(res =>{
            select.getDisco(disco.id_disco).then(resolv => {
                reqDisco.viewDisco(resolv);
            })
        });
    })
}

