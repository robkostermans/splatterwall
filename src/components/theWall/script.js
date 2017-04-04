
var params = {
    'public_key': 'gWKneA_PyJXFoX3AYF7wc3d', 
    'auth_params': {
        'username': 'admin',
        'payload': 'cb8b6d40cdd8374049e47bbce9df5f63f69ed2701ce834eada7979a56014fc08'
    }};
var socketize = new Socketize.client(params);


document.getElementById('post-btn').onclick = function () {
    socketize.publish('splatterwall', {name: 'Rob', city: 'Amsterdam'});
    
    /*socketize.pushOnList('splatterwall', {name: 'Rob', city: 'Amsterdam'}).then(function(response) {
        // successful
        console.log(1)
    }).catch(function(response) {
        // error
    });*/
};


socketize.subscribe('splatterwall', function(message) {
    // Add items to ul
    //console.log(message)
    //var liHtml = '<li>' + message.name + message.city +  '</li>';
    //document.getElementById('messages').insertAdjacentHTML('beforeend', liHtml);
    splatter.receiveSplat(window.event);
});


/**
 * LOCATION
 * 
 */

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  document.getElementById("position").innerHTML = crd.latitude+"/"+crd.longitude

};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  //alert(err.message)
};

navigator.geolocation.getCurrentPosition(success, error, options);

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

