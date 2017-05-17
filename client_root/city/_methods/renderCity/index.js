module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_API){

function func(vars,methods,req,res,next){
  methods.addCity(vars,methods.lastValue(vars,'currentData','city'),req);
  next('<pre>'+JSON.stringify(vars.currentData, undefined, '  ')+'</pre>');
}

return func;

}
