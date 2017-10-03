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
    location: center,
    radius: 120701,
    types: ['restaurant'],
    name: ['kfc']
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
      radius: 120701,
      types: ['restaurant'],
      name: ['kfc']
    };

    service.nearbySearch(request, callback);
  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addDomListener(marker, 'click', function() {
    infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM<br>' + place.geometry.location + '<br>Place id: ' + place.place_id + '</div>');
    infoWindow.open(map, this);
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

// FUNCTION BELOW BRINGS IN DETIALED INFORMATION OF THE KFCs, WHICH IS WHAT I NEED; HOWEVER, SOME OF THE STORES DOES NOT COME BACK WITH THE PHONE OR ADDRESS FOR SOME REASON.
// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });
//   var address;
//   var phone;
//
//   service.getDetails({placeId: place.place_id}, function(place, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       address = place.formatted_address;
//       phone = place.formatted_phone_number;
//     }
//   });
//
//   google.maps.event.addDomListener(marker, 'click', function() {
//     infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM' + '<br>' + phone + '</div>');
//     infoWindow.open(map, this);
//   });
//
//   return marker;
// }


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
