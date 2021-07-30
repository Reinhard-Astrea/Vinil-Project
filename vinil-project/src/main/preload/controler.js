
const add = require('./adicionar_disco');
const inicio = require('./inicio.js');
const search = require('./search');

window.addEventListener('DOMContentLoaded', () => {

   inicio.init();
   add.Init();
   search.Init();
  
});


