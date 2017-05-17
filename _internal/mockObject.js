const clone = function(ab){ return JSON.parse(JSON.stringify(ab)); },
  json2server = require('json2server'),
  Server = require('json2server/client_server/server_handler'),
  Client = require('json2server/client_server/client_handler'),
  getMethodFile = require('json2server/internal_methods/createMethodFile'),
  mocker = require('./mockReqRes');

var clientIns, serverIns;
var commonCall = function(js,rt,dir,which){
  var j2s = clone(require(process.cwd()+'/'+js+'.json'));
  var SERVER_METHODS = {};
  var rtPath = process.cwd()+'/'+rt+'.json';
  sj = clone(require(rtPath));
  getMethodFile(rt,false,function(mthds,mth){
    SERVER_METHODS[mth] = require('json2server/'+mthds+'/'+mth)(j2s,SERVER_METHODS);
  });
  var api = json2server(j2s,rtPath,process.cwd()+'/'+dir).api;
  const server = which(j2s,SERVER_METHODS,sj.vars,api);
  if(js === 'j2s'){
    j2s.staticdir = process.cwd()+'/'+j2s.staticdir;
  }
  return {
    server : server,
    methods : SERVER_METHODS,
    api : api,
    j2s : j2s,
    json : sj
  };
};

exports.server = function(){
  if(!(serverIns)) serverIns = commonCall('j2s','server','root',Server);
  return serverIns;
};
exports.client = function(){
  if(!(clientIns)) clientIns = commonCall('j2c','client','client_root',Client);
  return clientIns;
};
