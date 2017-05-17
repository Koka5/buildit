var BuildJson = require('./buildvars.json'),
  VarsJson = require('./vars.json'),
    fln = VarsJson.app.key + '-'+(BuildJson.buildNumber+1),
    asyncTasks = 2,
  exec = require('child_process').exec;

function checkAndExit(){
  if(asyncTasks < 1){
    process.exit();
  }
  asyncTasks--;
}

exec('cat static/css/*.css > static/'+fln+'.css', checkAndExit);
exec('cat static/js/*.js > static/'+fln+'.js', checkAndExit);
