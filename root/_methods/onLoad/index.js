module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

function func(vars,methods,req,res){
  GLOBAL_APP_CONFIG.appLoaded = true;
  GLOBAL_APP_CONFIG.postman.emit('app:load');
}

return func;

}
