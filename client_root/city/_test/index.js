const _ = require(process.cwd()+'/_internal/mockObject').client(),
  renderCity = require('./../_methods/renderCity')(_.j2s,_.methods,_.json.vars,_.api);

exports.renderCity = function(test){
  renderCity({ currentData : {  city : { name : "Delhi" } } },{ addCity: function(vars,city){
    test.deepEqual(city,{ name : "Delhi" });
  }, lastValue : _.methods.lastValue },{},{},function(html){
    test.equal(html,'<pre>{\n  "city": {\n    "name": "Delhi"\n  }\n}</pre>');
    test.done();
  });
};
