const sql = require('../sql').bd;

function allDiscos(){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all('SELECT id_disco, nome_disco, autor, ano, img FROM disco',(err, rows) =>{
                resolve(rows); 
            });
        }); 
    });
}

function getDisco(id){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.get(`SELECT id_disco, nome_disco, autor, ano, img FROM disco WHERE id_disco = ${id}`,(err, row) =>{
                resolve(row); 
            });
        }); 
    });
}

function allMusica(id_disco){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all(`SELECT nome_musica FROM musica WHERE key_disco = ${id_disco}`,(err, rows) =>{
                if(err)
                    console.log(err);
                resolve(rows); 
            });
        }); 
    });
}

function searchDisco(txt){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all(`SELECT id_disco, nome_disco, autor, ano, img
                     FROM disco 
                     WHERE 
                     id_disco = \'${txt}\' OR
                     nome_disco LIKE \'%${txt}%\' OR
                     autor LIKE \'%${txt}%\' OR
                     ano = \'${txt}\'`,
            (err, rows) =>{
                if(err)console.log(err)
                resolve(rows); 
            });
        }); 
    });
}

function searchMusica(txt){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all(`SELECT key_disco, nome_musica, autor  
                     FROM musica, disco
                     WHERE 
                     nome_musica LIKE \'%${txt}%\'
                     AND 
                     key_disco = id_disco`,
            (err, rows) =>{
                if(err)console.log(err)
                resolve(rows); 
            });
        }); 
    });
}

exports.searchMusica = searchMusica;
exports.getDisco = getDisco;
exports.allMusica = allMusica;
exports.searchDisco = searchDisco;
exports.allDiscos = allDiscos;