module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS){
  function func(vars,methods,req,res){
    if(!res.materialDone){;
      var _end = res.end;
      res.end = (function(){
        var rs = _end.apply(this,arguments);
        methods.materialUpgrade(this.element);
      }).bind(res);
      res.materialDone = true;
    }
  }

  return func;
}
