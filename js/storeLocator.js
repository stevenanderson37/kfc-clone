var map;
var infoWindow;
var request;
var service;
var markers = [];
var newLatLng = [];
var mapStyles = [
  {elementType: 'geometry', stylers: [{color: '#F1F1F1'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#F1F1F1'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#727272'}]},
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{color: '#ACACAC'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#D1D1D1'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#C1C1C1'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#C1C1C1'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#ACACAC'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#D1D1D1'}]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{"color": "#9e9e9e"}]
  }
];
var addQuery = document.forms['store-queries'];
var zipQuery = document.querySelector('#store-zip-query');
var newLat;
var newLng;

function initialize() {
  // var center = new google.maps.LatLng(37.3529,-84.3405);
  var center = {lat: 37.3529, lng: -84.3405};
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 6,
    mapTypeControl: false,
    styles: mapStyles
  });

  request = {
    location: center
    // radius: 120701,
    // types: ['restaurant'],
    // name: ['kfc']
  };

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  addQuery.addEventListener('submit', function(e) {
    e.preventDefault();
    var value = addQuery.querySelector('#store-zip-query').value;
    var addressQuery = 'address=' + value.toString();

    let url = 'https://maps.googleapis.com/maps/api/geocode/json?' + addressQuery + '&key=AIzaSyC0u484plSsbaG9A8JEtRyYBNhnhgReop8';

    fetch(url)
    .then(res => res.json())
    .then((out) => {
      // newLatLng.push(out.results[0].geometry.location);
      newLat = parseFloat(JSON.stringify(out.results[0].geometry.location.lat));
      newLng = parseFloat(JSON.stringify(out.results[0].geometry.location.lng));
    })
    .catch(err => { throw err });

    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 12,
      mapTypeControl: false,
      styles: mapStyles
    });

    map.setCenter({lat: parseFloat(newLat), lng: parseFloat(newLng)});
    clearResults(markers);

    var request = {
      location: {lat: parseFloat(newLat), lng: parseFloat(newLng)},
      // radius brings in the correct amount of results, but you can't use rankBy if you use radius. Annoying! I need to use rankBy in order to place the kfc marker on the closest restaurant to the query.
      // radius: 120701,
      rankBy: google.maps.places.RankBy.DISTANCE,
      types: ['restaurant'],
      name: ['kfc']
    };

    service.nearbySearch(request, callback);
  });
}

// TRYING TO DISPATCH ANOTHER ENTER KEYPRESS SO IT DOESN'T HAVE TO BE PRESSED TWICE BY CLIENT. NOT WORKING RIGHT NOW.
// var enterPressed = new KeyboardEvent('keypress',{'keyCode':32,'which':32});

// zipQuery.addEventListener('keypress', function(e) {
//   if (window.event.keyCode === 13) {
//     document.dispatchEvent(enterPressed);
//   }
// });

// zipQuery.onkeydown = function(){
//   if(window.event.keyCode === 13){
//     console.log(enterPressed);
//     addQuery.dispatchEvent(enterPressed);
//   }
// }

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i]);
      // markers.push(createMarker(results[i]));
      if (i === 0) {
        markers.push(createMarkerKFC(results[i]));
      } else {
        markers.push(createMarker(results[i]));
      }
    }
  }
}

var iconImageKFC = {
  url: '../img/marker-active.png',
  scaledSize: new google.maps.Size(65, 45)
};

var iconImage = {
  url: '../img/marker.png',
  scaledSize: new google.maps.Size(25, 40)
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: iconImage
  });
  var address;
  var phone;

  service.getDetails({placeId: place.place_id}, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      address = place.formatted_address;
      phone = place.formatted_phone_number;
    }
  });

  google.maps.event.addDomListener(marker, 'click', function() {
    if (typeof address === 'undefined' || typeof phone === 'undefined') {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM<br>PHONE UNAVAILABLE</div>');

      infoWindow.open(map, this);
    } else {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM' + '<br>' + phone + '</div>');

      infoWindow.open(map, this);
    }
  });

  return marker;
}

function createMarkerKFC(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: iconImageKFC
  });
  var address;
  var phone;

  service.getDetails({placeId: place.place_id}, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      address = place.formatted_address;
      phone = place.formatted_phone_number;
    }
  });

  google.maps.event.addDomListener(marker, 'click', function() {
    if (typeof address === 'undefined' || typeof phone === 'undefined') {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM<br>PHONE UNAVAILABLE</div>');

      infoWindow.open(map, this);
    } else {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM' + '<br>' + phone + '</div>');

      infoWindow.open(map, this);
    }
  });

  return marker;
}

function clearResults(markers) {
  for (var m in markers) {
    markers[m].setMap(null);
  }
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

// vvvvvvvv OLD GOOGLE MAPS API CODE vvvvvvvv

// GOOGLE MAPS API
// function initMap() {
//   var mapProp = {
//     center: new google.maps.LatLng(37.3529,-84.3405),
//     zoom: 6,
//     mapTypeControl: false,
//     styles: [
//       {elementType: 'geometry', stylers: [{color: '#F1F1F1'}]},
//       {elementType: 'labels.text.stroke', stylers: [{color: '#F1F1F1'}]},
//       {elementType: 'labels.text.fill', stylers: [{color: '#727272'}]},
//       {
//         featureType: 'administrative.province',
//         elementType: 'geometry.stroke',
//         stylers: [{color: '#ACACAC'}]
//       },
//       {
//         featureType: 'poi.park',
//         elementType: 'geometry.fill',
//         stylers: [{color: '#D1D1D1'}]
//       },
//       {
//         featureType: 'road',
//         elementType: 'geometry',
//         stylers: [{color: '#C1C1C1'}]
//       },
//       {
//         featureType: 'road.arterial',
//         elementType: 'geometry',
//         stylers: [{color: '#ffffff'}]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry',
//         stylers: [{color: '#C1C1C1'}]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry.stroke',
//         stylers: [{color: '#ACACAC'}]
//       },
//       {
//         featureType: 'water',
//         elementType: 'geometry.fill',
//         stylers: [{color: '#D1D1D1'}]
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{"color": "#9e9e9e"}]
//       }
//     ]
//   };
//   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }
