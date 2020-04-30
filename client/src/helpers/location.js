async function getLocation(){
    if('geolocation' in navigator){
      var options = {
        enableHighAccuracy: true, // we want high accuracy for this app
        timeout: 5000,
        maximumAge: 0 // 0 will return the current position, not a prior cached position
      };
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    } 
    else {
      throw "No geolocation support"
    }
  }

  export {
    getLocation
  }