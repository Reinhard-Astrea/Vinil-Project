const sql      = require('../sql').bd;
const vagalume = require('./vagalume');
const delet    = require("./delete");
const insert    = require('./insert');

function updateDisco(img, id_disco, newDisco){

    return new Promise((resolve, reject) =>{
        vagalume.rmImg(img);
        vagalume.getCapa(newDisco.autor, newDisco.musica[0]).then(res =>{
            sql.run(`
                UPDATE disco
                SET nome_disco = \'${newDisco.nome_disco}\',
                autor = \'${newDisco.autor}\',
                ano = ${newDisco.ano},
                img = \'${res}\'
                WHERE
                id_disco = ${id_disco}
            `, err =>{
                if(err)
                    console.log(err);
                resolve(true);
            });
        });
        updateMusica(id_disco, newDisco.musica);
    });
}

function updateMusica(id, newMusica) {
    delet.deleteMusicas(id).then(res =>{
        insert.newMusica(newMusica, id);
    });
}

exports.updateDisco = updateDisco;