const sql = require('../sql').bd;

function deleteMusicas(key_disco) {
    return new Promise((resolve, reject) =>{
        sql.run(`DELETE FROM musica WHERE key_disco = ${key_disco}`, err =>{
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(true);
        });
    });
}

function deleteDisco(id_disco) {
    return new Promise((resolve, reject) =>{
        sql.run(`DELETE FROM disco WHERE id_disco = ${id_disco}`, err =>{
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(true);
        });
    });
}

exports.deleteDisco = deleteDisco;
exports.deleteMusicas = deleteMusicas;