module.exports = function( GLOBAL_APP_CONFIG,GLOBAL_METHODS,GLOBAL_API){

function func(vars,currentCity,req){
  var cityky;
  if(typeof currentCity === 'object' && typeof currentCity.name === 'string'){
    cityky = currentCity.name.split(' ').join('').toLowerCase();
    vars.currentCity = currentCity.name;
    req.emit('city-update');
    if(!(vars.cities[cityky])){
      vars.cities[cityky]={
        text:currentCity.name,
        country:currentCity.country
      };
      req.emit('list-cities');
    }
  }
  return cityky;
}

return func;

}
