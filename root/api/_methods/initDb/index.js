module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

//const mongoose = require('mongoose');

//var DB = mongoose.connection;
//mongoose.connect(GLOBAL_METHODS.lastValue(GLOBAL_APP_CONFIG.dbConfig,'url'));

function func(vars,methods,req,res){
  GLOBAL_APP_CONFIG.postman.emit('db:ready');
}

//DB.on('error', console.log.bind(console,'DB_ERROR:'));
//DB.once('open', func);
func();

return func;

}
