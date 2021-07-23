const sqlite = require('sqlite3').verbose();
const bd = new sqlite.Database(__dirname +  '/vinil.bd');

//-------------criação do banco (caso não exista)--------------------//
bd.serialize(() => {
    bd.run(`CREATE TABLE if not exists disco (
                id_disco INTEGER PRIMARY KEY,
                nome_disco TEXT NOT NULL, 
                autor TEXT NOT NULL,
                ano INTEGER NOT NULL
    );`);
    bd.run(`CREATE TABLE if not exists musica (
            key_disco INTEGER,    
            nome_musica TEXT,
            PRIMARY KEY (key_disco, nome_musica),
            FOREIGN KEY (key_disco) REFERENCES disco (id_disco) 
                ON DELETE CASCADE
    ) WITHOUT ROWID;`);
});

exports.bd = bd;