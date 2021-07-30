const fetch = require('node-fetch');
const key = '2dd2ac75e948c789104f88c73eaf70cc';
const fs = require('fs');
const request = require('request');
const crypto = require('crypto');

exports.getLetra = (musica) =>{
    return new Promise(async(response, reject) =>{
        let aux = encodeURIComponent(musica); 
        let res = await fetch.default(`https://api.vagalume.com.br/search.excerpt?q=${aux}&limit=1`);
        let data = await res.json();
        
        if(data.response.docs[0] == null){
            response("!not");
        }
        else{
            let art = encodeURIComponent(data.response.docs[0].band);
            let mus = encodeURIComponent(data.response.docs[0].title);
            let url = `https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey={${key}}`;
            res = await fetch.default(url);
            data = await res.json();
            response(data.mus[0].text);
        }
    });
}

exports.getCapa = (art, mus) => {
    return new Promise(async(response, reject) =>{
        let art1 = encodeURIComponent(art);
        let mus1 = encodeURIComponent(mus);
        let url = `https://api.vagalume.com.br/search.php?art=${art1}&mus=${mus1}&extra=alb&nolyrics=1&apikey={${key}}`;
        let res = await fetch.default(url);
        let data = await res.json();

        if(data.type != "exact"){
            response("padrao.png");
        }
        else{
            let url2 = data.mus[0].alb.url;
            let url3 = url2.substring( 0 , url2.length -4);
            let file = url3.split("/");
            crypto.randomBytes(16, (err, hash) =>{
                let fileName = hash.toString('hex') + file[file.length-1] + "jpg";
                download(url3 + "webp", fileName , function(){
                    response(fileName);
                });     
            });
        }
    });
}

//metodo para fazer download de um arquivo
function download(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(__dirname + "/../BD/img/" + filename)).on('close', callback);
    });
};

//metodo para remover imagens
exports.rmImg = (fileName) => {
    if(fileName != "padrao.png"){
        fs.unlink(__dirname + "/../BD/img/" + fileName, err =>{
            if (err) {
                console.log(err);
            }
        })
    }
}