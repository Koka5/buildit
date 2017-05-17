const spawn = require('child_process').spawn;
function forOneDir(dir,next){
  console.log('>>>>>>>>>>>>>> testing '+dir+' ...')
  require('child_process').exec('find ./'+dir+' -type d -name "_test"',function(err,out){
    if(!err && out){
      var totest = [], files = out.split('\n');
      files.forEach((ab)=>{
        ab = ab.trim();
        if(ab){
          totest.push(ab);
        }
      });
      if(totest.length){
        const ls = spawn('node_modules/nodeunit/bin/nodeunit', totest);
        ls.stdout.on('data', (data) => {
          console.log(data.toString());
        });
        ls.stderr.on('data', (data) => {
          console.log('ERROR  :'+data.toString());
        });
        ls.on('close', (code) => {
          if(code){
            process.exit(code);
          } else {
            next();
          }
        });
      } else {
        console.log('No test '+dir+' specified.');
        next();
      }
    } else if(err){
      console.log('stderr :'+(err));
      process.exit(1);
    } else {
      console.log('No '+dir+' tests !');
      next();
    }
  });
}

forOneDir('root',function(){
  forOneDir('client_root',function(){
    process.exit(0);
  });
});
