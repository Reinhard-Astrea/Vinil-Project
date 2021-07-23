const sql = require('../sql').bd;

function allDiscos(){
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all('SELECT id_disco, nome_disco, autor, ano FROM disco',(err, rows) =>{
                resolve(rows); 
            });
        }); 
    });
}

function pesquisa(pesq){
    console.log(pesq);
    return new Promise ((resolve, reject) =>{
        sql.serialize(function () {
            sql.all(`SELECT id_disco, nome_disco, autor, ano, nome_musica, key_disco
                     FROM disco, musica
                     WHERE 
                     (id_disco = \'${pesq}\' OR
                     nome_disco LIKE \'%${pesq}%\' OR
                     autor LIKE \'%${pesq}%\' OR
                     nome_musica LIKE \'%${pesq}%\' OR
                     ano = \'${pesq}\') AND 
                     (key_disco = id_disco)`,
            (err, rows) =>{
                if(err)console.log(err)
                resolve(rows); 
            });
        }); 
    });
}

function test(){
    pesquisa('1999').then(resolve => {
      //  for(let u of resolve){
            console.log(resolve);
        //}
    })
    
}



exports.pesquisa = pesquisa;
exports.allDiscos = allDiscos;