const insert = require('../routes/insert');

//-------------------eventos-------------------------//

//incia as funções
exports.addInit = () =>{
    const button = document.getElementById('add');

    button.addEventListener('click', event => {
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

//adiciona novos inputs de musica
function addMusica(){
    let musica1 = document.getElementById('divForm');
    let lastMusica = document.getElementsByClassName('musica');
    let pos = lastMusica.length;
    let lastMusica1 = lastMusica.item(pos -1);
    let ev;

    lastMusica1.addEventListener('input', ev = () => {
        if(!(lastMusica.item(pos))){
            musica1.insertAdjacentHTML('beforeend', '<input type="text" class="musica" placeholder="musica">');
            lastMusica1.addEventListener('keyup', function(event){
                if(event.key == 'Enter')
                    lastMusica.item(pos).focus();
            })
            addMusica();
        }
        else{
            if(lastMusica1.value.length == 0)
            lastMusica.item(pos).remove();
        }
    });
}

//espera um click em cadastro para adicionar ao banco
function cadastrar(){
    let confirmar = document.getElementById('cadastrar');
    confirmar.addEventListener('click', Event => {
        let disco = new Disco();
        insert.newDisco(disco);
        formulario();
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
    }
}

//-------------------------end class------------------------//
//cria o formulariode cadastro
function formulario(){
    let section = document.getElementById('sec');

    section.innerHTML = `
    <form action="">
        <div id="divForm">
            <input type="text" id="nome_disco", placeholder="Nome Do Disco">
            <input type="text" id="autor" placeholder="Autor">
            <input type="text" id="ano" placeholder="Ano">
            <input type="text" id="musica1" class="musica" placeholder="musica">
        </div>

        <input type="button" value="Cadastrar" id="cadastrar">
    </form> 
    `;
}