module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS){

  function traverse (node, callback) {
    if (callback(node)) {
      for (var i=0;i < node.childNodes.length; i++) {
        traverse(node.childNodes[i],callback);
      }
    }
  }

  function func(elem){
    if(window.componentHandler){
      traverse(elem, function(element){
        if(typeof element === 'object' && element instanceof Element){
          window.componentHandler.upgradeElement(element);
        }
        return true;
      });
    }
  }

  return func;

};
