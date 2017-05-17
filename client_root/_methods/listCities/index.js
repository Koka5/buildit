module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS){

function func(vars,methods,req,res,next){
  var st = '', cityMap = vars.cities, data = Object.keys(vars.cities);
  if(Array.isArray(data)){
    var ln = data.length;
    for(var z = 0; z < ln; z++){
      st += ('<a onclick="r2(\'/'+data[z]+'\')" class="pointer mdl-navigation__link">'+cityMap[data[z]].text+'</a>');
    }
  }
  next(st);
}

return func;
}
