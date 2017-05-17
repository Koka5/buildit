module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){
var once = true, navHTML = '';//READ_FROM_FILE,index.html

function func(vars,methods,req,res,next){
  if(once){
    once = false;
    next(navHTML);
    methods.searchRegister(vars,methods,req,res);
  }
}

return func;

}
