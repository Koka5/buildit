module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

var HTML = '';//READ_FROM_FILE,index.html

function func(vars,methods,req,res,next){
  next(HTML);
  methods.getLocation(function(er,loc){
    if(loc){
      GLOBAL_METHODS.request(vars.apiUrl+'?lat='+loc[0]+'&lon='+loc[1], function(er,data){
        if(data && data.parsed){
          var cityky = methods.addCity(vars,data.parsed.city,req);
          if(cityky){
            var prevUrl = GLOBAL_API.root[':city'].$.from;
            delete GLOBAL_API.root[':city'].$.from;
            GLOBAL_API.root[':city']._vars = { currentData : data.parsed };
            topath('/'+(cityky));
            GLOBAL_API.root[':city'].$.from = prevUrl;
            delete GLOBAL_API.root[':city']._vars;
          }
        }
      });
    }
  });
}

return func;

}
