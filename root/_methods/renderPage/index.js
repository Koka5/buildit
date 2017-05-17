module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

const fs = require('fs');
var filest;

function func(vars,methods,req,res,next){
  if(filest){
    if(typeof next === 'function') return next(filest);
    else return filest;
  }
  fs.readFile(process.cwd()+'/static/index.html', 'utf8', function(err, file) {
    if(err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();
      return;
    }
    filest = file.toString();
    next(filest);
  });
}

return func;

}
