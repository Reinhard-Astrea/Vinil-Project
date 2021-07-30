const insert = require('../routes/insert');

//-------------------eventos-------------------------//

//incia as funções
exports.Init = () =>{
    document.getElementById('add')
    .addEventListener('click', event => {
        formulario();
        addMusica();
        cadastrar();
        enter();
    });
}

//troca de input ao prescinar enter
function enter(){
    document.getElementById('nome_disco').addEventListener('keyup', function(event){
        if(event.key == 'Enter') 
            document.getElementById('autor').focus();
    });

    document.getElementById('autor').addEventListener('keyup', function(event){
        if(event.key == 'Enter') 
            document.getElementById('ano').focus();
    });

    document.getElementById('ano').addEventListener('keyup', function(event){
        if(event.key == 'Enter') 
            document.getElementsByClassName('musica').item(0).focus();
    });
}
exports.enter = enter;

//adiciona novos inputs de musica
function addMusica(){
    let inputArea = document.getElementById('inputArea');
    let lastMusica = document.getElementsByClassName('musica');
    let pos = lastMusica.length;
    let lastMusica1 = lastMusica.item(pos -1);
    let ev;

    lastMusica1.addEventListener('input', ev = () => {
        if(!(lastMusica.item(pos))){
            inputArea.insertAdjacentHTML('beforeend',
            `<input class="form-control text-center mb-3 musica"  type="text" placeholder="Musica" aria-label="default input example">`);
            lastMusica1.addEventListener('keyup', function(event){
                if(event.key == 'Enter')
                    lastMusica.item(pos).focus();
            })
            addMusica();
        }
        else{
            if(lastMusica1.value.length == 0 && lastMusica.item(pos).value.length == 0)
            lastMusica.item(pos).remove();
        }
    });
}
exports.addMusica = addMusica;

//espera um click em cadastro para adicionar ao banco
function cadastrar(){
    let confirmar = document.getElementById('cadastrar');
    confirmar.addEventListener('click', Event => {
        let disco = new Disco();
        insert.newDisco(disco);
        formulario();
        addMusica();
        cadastrar();
        enter();
    });
}

//--------------------------class--------------------------//
class Disco{
    constructor(){
        this.nome_disco  = document.getElementById('nome_disco').value;
        this.autor = document.getElementById('autor').value;
        this.ano   = document.getElementById('ano').value;
        this.musica= [];

        let aux = document.getElementsByClassName('musica');
        for(let i = 0; i < aux.length -1; i++){
            this.musica.push(aux.item(i).value);
        }
        if(aux.item(aux.length -1).value.length > 0){
            this.musica.push(aux.item(aux.length -1).value);
        }
    }
}
exports.Disco = Disco;

//-------------------------end class------------------------//
//cria o formulariode cadastro
function formulario(){
    let section = document.getElementById('main');

    section.innerHTML = `
        <div class="container" id="divForm" style="width: 80%;">
            <div id="inputArea">
                <input class="form-control text-center mb-3" id="nome_disco" type="text" placeholder="Disco" aria-label="default input example">
                <input class="form-control text-center mb-3" id="autor" type="text" placeholder="Autor" aria-label="default input example">
                <input class="form-control text-center mb-3" id="ano" type="text" placeholder="Ano" aria-label="default input example">
                <input class="form-control text-center mb-3 musica"  type="text" placeholder="Musica" aria-label="default input example">
            </div>
            <div class="d-grid gap-2">
                <button type="button" id="cadastrar" class="btn btn-success">Cadastrar</button>
            </div>
        </div>
    `;
}