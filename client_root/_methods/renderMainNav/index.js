module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS){

var once = true, HTML = '';//READ_FROM_FILE,index.html

function func(vars,methods,req,res,next){
  if(once){
    once = false;
    next(HTML);
  }
}

return func;

}
