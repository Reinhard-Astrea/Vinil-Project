const vagalume = require('../routes/vagalume');
const discojs = require('./disco');

exports.viewLetra = (nome_musica, disco) =>{
    vagalume.getLetra(nome_musica).then(res=>{
        if(res == '!not'){
            document.getElementById('main').innerHTML =
            `
                <div class="text-center"><h3>NOT FOUND</h3></div>
            `;
        }
        else{

            document.getElementById('main').innerHTML =
            `
                <h3 class="mb-3 text-white">${nome_musica}</h3>
                <p class="text-white" style="white-space: pre-line;">${res}</p>
                <button type="button" class="btn btn-info" id="butonVerDisco">Ver Disco</button>
            `;
            document.getElementById('butonVerDisco')
            .addEventListener('click', event=>{
                discojs.viewDisco(disco);
            })
        }
    })
}