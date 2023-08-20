var mongoose = require('mongoose');

var servidor = '127.0.0.1:27017';
var db = 'codeweb';

class Database{
    constructor(){
        //Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conecto a mongo en codeweb');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();