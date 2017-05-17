module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_API){

function func(vars,methods,req,res){
  var ind = req.url.indexOf('?');
  return ind === -1 ? '' : req.url.substring(ind+1);
}

return func;

}
