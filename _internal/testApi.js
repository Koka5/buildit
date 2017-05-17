var reqRes = require('./mockReqRes');

module.exports = function(exp,_,dt){
  exp[dt[0]] = function(test){
    var ar = reqRes(dt[1],[function(ev,st,data){
      try { ev = JSON.parse(ev); } catch(er){ }
      dt[2].forEach(function(pp){
        test[typeof pp[1] === 'object'?'deepEqual':'equal'](_.methods.lastValue.apply(null,[ev].concat(pp[0])),pp[1]);
      });
      if(Array.isArray(dt[3])){
        dt[3].forEach(function(fn){
          if(typeof fn === 'function'){
            fn(test,ev,st,data);
          }
        });
      }
      test.done();
    }]);
    _.server(ar[0],ar[1]);
  };
}
