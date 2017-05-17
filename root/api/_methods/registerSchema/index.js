module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS,GLOBAL_API){

const dbPrefix = GLOBAL_APP_CONFIG.dbPrefix || 'col_';
//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

function func(name,schema,plugins){
  /*schema = new Schema(schema);
  if(Array.isArray(plugins)){
    plugins.forEach((pl)=>{
      schema.plugin(pl);
    })
  }
  mongoose.model(name, schema, dbPrefix+name);*/
}

return func;

}
