var BuildJson = require('./buildvars.json'),
    asyncTasks = 0,
  exec = require('child_process').exec;

function checkAndExit(){
  if(asyncTasks < 1){
    process.exit();
  }
  asyncTasks--;
}

var listcss = [
  [
    'material-design-lite/dist/material.'+BuildJson.theme.primary+'-'+BuildJson.theme.accent+'.min.css',
    'material.css'
  ]
];

var listjs = [
  [
    'material-design-lite/dist/material.js',
    'material.js'
  ]
];

asyncTasks = listcss.length + listjs.length;

listcss.forEach(function(ab){
  exec('cp node_modules/'+ab[0]+' static/css/'+ab[1],checkAndExit);
});

listjs.forEach(function(ab){
  exec('cp node_modules/'+ab[0]+' static/js/'+ab[1],checkAndExit);
});
