var BuildJson = require('./buildvars.json'),
  ClientJson = require('./client.json'),
  ServerJson = require('./server.json'),
  PackageJson = require('./package.json'),
  _pckJson = require('./../package.json'),
  VarsJson = require('./vars.json'),
  J2CJson = require('./j2c.json'),
  exec = require('child_process').exec,
  J2SJson = require('./j2s.json'),
  CSSJson = require('./cssvars.json'),
  CDNurl = (process.env.CDN_URL || '')+'/',
  fs = require('fs'),
  _ = require('json2server').methods;


const BUILD_NO = BuildJson.buildNumber+1;
BuildJson.buildNumber = BUILD_NO;

function build(){
  var inp = process.argv[3] || '1';
  if(inp === 'true') inp = '1';
  var prev = BuildJson.version.split('.');
  inp = inp.split('.');
  if(inp[0]){
    prev[2] = Number(prev[2])+Number(inp[0]);
  }
  if(inp[1]){
    prev[1] = Number(prev[1])+Number(inp[1]);
  }
  if(inp[2]){
    prev[0] = Number(prev[0])+Number(inp[2]);
  }
  BuildJson.version = prev.join('.');
  fs.writeFileSync('./dev/buildvars.json',JSON.stringify(BuildJson,null,'  '));
}

// --->

var readFromFileStr = fs.readFileSync('./node_modules/json2server/internal_methods/readFromFile.js').toString();
if(readFromFileStr.indexOf('assign(undefined,vars)') !== -1){
  readFromFileStr = readFromFileStr.replace('assign(undefined,vars)',function(){
    return 'assign(undefined,'+JSON.stringify(BuildJson)+',vars);'
  });
  fs.writeFileSync('./node_modules/json2server/internal_methods/readFromFile.js',readFromFileStr);
}

//--->

_.replace(VarsJson, VarsJson);
_.replace(VarsJson, BuildJson);
_.replace(PackageJson, VarsJson);
_.replace(ClientJson, VarsJson);
_.replace(ServerJson, VarsJson);
_.replace(J2SJson, VarsJson);
_.replace(J2CJson, VarsJson);
_.replace(CSSJson, VarsJson);
if(_pckJson.dependencies){
  PackageJson.dependencies = _pckJson.dependencies;
}

//--->

var baseFile;

function staticBuild(checkAndExit){
  var cssstr = '';
  for(var ky in CSSJson){
    cssstr +=('@'+ky+':'+CSSJson[ky]+';');
  }

  cssstr += '\n\n';

  baseFile = VarsJson.app.key+'-'+BUILD_NO+'.';
  exec('find ./client_root -name "*.less"',function(err,out){
    var actVars = _.assign({ cssUrl : CDNurl+baseFile+'css', jsUrl : CDNurl+baseFile+'js' },BuildJson);
    _.assign(actVars,VarsJson);
    _.assign(actVars,ClientJson.vars);
    if(!err && out){
      var files = out.split('\n');
      files.forEach((ab)=>{
        if(ab){
          ab = (_.replace(fs.readFileSync(ab.trim()).toString(),actVars));
          cssstr += (ab+'\n');
        }
      });
    }
    htmlStr = _.replace(fs.readFileSync('./dev/static/index.html').toString(),actVars);
    fs.writeFileSync('./static/index.html',htmlStr);
    cssstr += fs.readFileSync('./dev/static/style.less').toString();
    require('less').render(cssstr, { }, function (e, output) {
      if(e) throw e;
      fs.writeFile('./static/css/style.css', output.css, checkAndExit);
    });
  });
}

//--->


function locale(checkAndExit){
  exec('find ./dev/locale -name "*.json"',function(err,out){
    if(err) throw err;
    var files = out.split('\n');
    ServerJson.vars.locale = {};
    files.forEach((ab)=>{
      ab = ab.trim();
      if(ab){
        ab = './.'+ab;
        ServerJson.vars.locale[ab.split('/').pop().split('.').shift()] = _.replace(require(ab), VarsJson);
      }
    });
    ClientJson.vars.messages=ServerJson.vars.locale[BuildJson.defaultLocale || 'en'];
    checkAndExit();
  });
}

function writeJson(checkAndExit){
  fs.writeFileSync('./j2c.json',JSON.stringify(J2CJson,null,'  '));
  fs.writeFileSync('./j2s.json',JSON.stringify(J2SJson,null,'  '));
  fs.writeFileSync('./dist/package.json',JSON.stringify(PackageJson,null,'  '));
  fs.writeFileSync('./client.json',JSON.stringify(ClientJson,null,'  '));
  fs.writeFileSync('./server.json',JSON.stringify(ServerJson,null,'  '));
  checkAndExit();
}


// --->

function jsBuild(checkAndExit){
  exec('node_modules/json2server/bin/json2server -o=static/js/A-'+baseFile+'js -b=1 -v=dev/buildvars.json',checkAndExit);
}

switch(process.argv[2]){
  case 'prod': build();
  default :
    locale(function(e){
      if(e) throw e;
      staticBuild(function(e){
        if(e) throw e;
        writeJson(function(e){
          if(e) throw e;
          jsBuild(function(e){
            if(e) throw e;
            process.exit(0);
          });
        });
      });
    });
}
