const sql      = require('../sql').bd;
const vagalume = require('./vagalume');
/* ----------modelo de objeto
*/
var teste = {
    nome_disco: 'jão e mateus',
    autor: 'jão',
    ano: 1999,
    musica: ['musica1', 'musica2', 'musica3', 'musica4', 'musica5']
}

function newDisco(disco){
    try{
        vagalume.getCapa(disco.autor, disco.musica[0]).then(resp => {
            sql.serialize(function () {
                sql.run('INSERT INTO disco (nome_disco, autor, ano, img) Values (?,?,?,?)',
                        [disco.nome_disco, disco.autor, disco.ano, resp],
                    function(err) {
                        newMusica(disco.musica, this.lastID);     
                });
            });
        });
    }
    catch(err){
        console.log(err);
    }
}

function newMusica(musica, id_disco){
    sql.serialize(function(){
        let stmt = sql.prepare('INSERT INTO musica (key_disco, nome_musica) VALUES (?,?)');
        for(let u of musica){
            stmt.run(id_disco, u);
        }
        stmt.finalize();
    });
}

exports.newMusica = newMusica;
exports.newDisco = newDisco;