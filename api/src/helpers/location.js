function getLocation(){
    var msg; 
  
    // test for geolocation support
    if('geolocation' in navigator){
      requestLocation();
    }else{
      // no geolocation :(
      msg = "Sorry, looks like your browser doesn't support geolocation";
      return msg; // output error message
    }
  
    /*** 
    requestLocation() returns a message, either the users coordinates, or an error message
    **/
    function requestLocation(){
      /**
      getCurrentPosition() below accepts 3 arguments:
      a success callback (required), an error callback  (optional), and a set of options (optional)
      **/
    
      var options = {
        // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
        enableHighAccuracy: false,
        // timeout = how long does the device have, in milliseconds to return a result?
        timeout: 5000,
        // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
        maximumAge: 0
      };
    
      // call getCurrentPosition()
      navigator.geolocation.getCurrentPosition(success, error, options); 
    
      // upon success, do this
      function success(pos){
        // get longitude and latitude from the position object passed in
        var lng = pos.coords.longitude;
        var lat = pos.coords.latitude;
        // and presto, we have the device's location!
        msg = 'You appear to be at longitude: ' + lng + ' and latitude: ' + lat  + '<img src="https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=300x300&maptype=roadmap&markers=color:red%7Clabel:A%7C' + lat + ',' + lng+ '&sensor=false">';
        return msg;
      }
    
      // upon error, do this
      function error(err){
        // return the error message
        msg = 'Error: ' + err + ' :(';
        return msg; // output button
      }  
    } 
  }

  module.exports=getLocation;