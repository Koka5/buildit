module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_API){

var currentLoc = false;

function func(next){
  function geoSuccess(startPos){
    var loc = [startPos.coords.latitude, startPos.coords.longitude];
    if(!GLOBAL_APP_CONFIG.realLocation){
      currentLoc = loc;
    }
    next(null,loc);
  }

  function geoError(ab){
  }

  if(currentLoc){
    return geoSuccess({ coords : { latitude : currentLoc[0], longitude : currentLoc[1] } })
  }

  var getLoc = GLOBAL_METHODS.lastValue(window, 'navigator','geolocation','getCurrentPosition');
  if(typeof getLoc === 'function'){
    window.navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    geoError('LOCATION_SERVICE_NOT_AVAILABLE');
  }
}

return func;

}
