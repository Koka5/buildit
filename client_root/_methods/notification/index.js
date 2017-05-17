module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_VARS){

var snackbarContainer = document.querySelector('#'+GLOBAL_VARS.app.key+'-snackbar-blk');

function func(message){
  snackbarContainer.MaterialSnackbar.showSnackbar({
    message: message || 'Something was not right.'
  });
}

return func;

}
