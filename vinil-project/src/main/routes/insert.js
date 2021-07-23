const sql = require('../sql').bd;

/* ----------modelo de objeto
*/
var teste = {
    nome_disco: 'jão e mateus',
    autor: 'jão',
    ano: 1999,
    musica: ['musica1', 'musica2', 'musica3', 'musica4', 'musica5']
}

//-------------debug-------------------//
function mostrar(){
    sql.serialize(function () {
        console.log('top2');
        sql.each('SELECT id_disco, nome_disco FROM disco', (err, row) => {
            console.log('top1');
            console.log(row.id_disco + ' + ' + row.nome_disco);
        });
    });
}

function newDisco(disco){
    try{
        sql.serialize(function () {
            sql.run('INSERT INTO disco (nome_disco, autor, ano) Values (?,?,?)',
                    [disco.nome_disco, disco.autor, disco.ano],
                function(err) {
                    console.log('lastid: ' + this.lastID);
                    newMusica(disco.musica, this.lastID);     
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

exports.newDisco = newDisco;

