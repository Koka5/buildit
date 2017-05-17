
global.location = {};

global.window = {
  history : {
    pushState : function(){
    }
  },
  document : {
    getElementById : function(){
    },
    querySelector : function(){
    }
  },
  location : global.location
};

global.document = window.document;
global.location = window.location;

function getRequest(url,method,em,onc,rm,on){
  return {
    method : method,
    emit : em || function(){
    },
    once : onc || function(){
    },
    removeAllListeners : rm || function(){
    },
    on : on || function(){
    },
    url : url,
    parsedUrl : require('url').parse(url || '/')
  }
}

function getResponse(en,wr,sh,se){
  return {
    end : en || function(){
    },
    write : wr || function(){
    },
    setHeader : sh || function(){
    },
    send : se || function(){
    }
  }
}

module.exports = function(reqOpts, resOpts){
  return [getRequest.apply(null,reqOpts), getResponse.apply(null,resOpts)];
};
