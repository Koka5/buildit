module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

const EventEmitter = require('events');

class Postman extends EventEmitter {}

GLOBAL_APP_CONFIG.postman = new Postman();

function func(vars,methods,req,res){
}

func();

return func;

}
