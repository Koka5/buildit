module.exports =
function( GLOBAL_APP_CONFIG, GLOBAL_METHODS){
  function func(vars,methods,req,res,data){
    var acc = methods.lastValue(req.headers,'accept');
    if(typeof acc === 'string' && acc.indexOf('html') !== -1){
      res.setHeader("Content-Type","text/html; charset=utf-8");
      return data[vars.defKey];
    }
  }

  return func;
}
