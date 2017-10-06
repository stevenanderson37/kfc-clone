// GOOGLE MAPS API + GOOGLE PLACES + GOOGLE GEOCODING SERVICE
let map;
let infoWindow;
let request;
let service;
let markers = [];
let newLatLng = [];
const mapStyles = [
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
const addQuery = document.forms['store-queries'];
const zipQuery = document.querySelector('#store-zip-query');
let newLat;
let newLng;
const resultsCont = document.querySelector('#results-container');
const numberOfResults = document.querySelector('#number-of-results');
const resultsList = document.querySelector('#results-list');
const resultsPlaceholder = document.querySelector('#results-placeholder');

function initialize() {
  // var center = new google.maps.LatLng(37.3529,-84.3405);
  let center = {lat: 37.3529, lng: -84.3405};
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

    resultsPlaceholder.style.display = 'none';
    resultsCont.style.display = 'block';

    let value = addQuery.querySelector('#store-zip-query').value;
    let addressQuery = 'address=' + value.toString();

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

    let request = {
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

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    numberOfResults.innerHTML = '';
    numberOfResults.innerHTML += '<span>' + results.length + ' results found</span>';
    resultsList.innerHTML = '';

    for (var i = 0; i < results.length; i++) {
      if (i === 0) {
        markers.push(createMarkerKFC(results[i]));
      } else {
        markers.push(createMarker(results[i]));
      }
    }
  }
}

const iconImageKFC = {
  url: '../img/marker-active.png',
  scaledSize: new google.maps.Size(65, 45)
};

const iconImage = {
  url: '../img/marker.png',
  scaledSize: new google.maps.Size(25, 40)
};

function createMarker(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: iconImage
  });
  let addressPart = place.vicinity;
  let addressPartArr = addressPart.split(',');
  let addressPart1 = addressPartArr[0];
  let addressPart2 = addressPartArr[1];
  let addressFull;
  let addressFullArr;
  let addressFull1;
  let addressFull2;
  let phone;

  service.getDetails({placeId: place.place_id}, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      addressFull = place.formatted_address;
      addressFullArr = addressFull.split(',');
      addressFull1 = addressFullArr[0];
      addressFull2 = addressFullArr[1] + ',' + addressFullArr[2];
      phone = place.formatted_phone_number;
    }

    if (typeof phone === 'undefined') {
      resultsList.innerHTML += '<li><h3>' + addressPart1 + '<br>' + addressPart2 + '</h3>' + '<p>PHONE UNAVAILABLE</p>' + '<p>SUN - SAT: 10:30AM - 10:00PM</p></li>';
    } else {
      resultsList.innerHTML += '<li><h3>' + addressFull1 + '<br>' + addressFull2 + '</h3><p>' + phone + '</p>' + '<p>SUN - SAT: 10:30AM - 10:00PM</p></li>';
    }
  });

  google.maps.event.addDomListener(marker, 'click', function() {
    if (typeof phone === 'undefined') {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'PHONE UNAVAILABLE<br>SUN - SAT: 10:30AM - 10:00PM</div>');

      infoWindow.open(map, this);
    } else {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + addressFull1 + ', ' + addressFull2 + '<br>' + phone + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM</div>');

      infoWindow.open(map, this);
    }
  });

  return marker;
}

function createMarkerKFC(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: iconImageKFC
  });
  let addressPart = place.vicinity;
  let addressPartArr = addressPart.split(',');
  let addressPart1 = addressPartArr[0];
  let addressPart2 = addressPartArr[1];
  let addressFull;
  let addressFullArr;
  let addressFull1;
  let addressFull2;
  let phone;

  service.getDetails({placeId: place.place_id}, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      addressFull = place.formatted_address;
      addressFullArr = addressFull.split(',');
      addressFull1 = addressFullArr[0];
      addressFull2 = addressFullArr[1] + ',' + addressFullArr[2];
      phone = place.formatted_phone_number;
    }

    if (typeof phone === 'undefined') {
      resultsList.innerHTML += '<li><h3>' + addressPart1 + '<br>' + addressPart2 + '</h3>' + '<p>PHONE UNAVAILABLE</p>' + '<p>SUN - SAT: 10:30AM - 10:00PM</p></li>';
    } else {
      resultsList.innerHTML += '<li><h3>' + addressFull1 + '<br>' + addressFull2 + '</h3>' + '<p>' + phone + '</p><p>SUN - SAT: 10:30AM - 10:00PM</p></li>';
    }
  });

  google.maps.event.addDomListener(marker, 'click', function() {
    if (typeof phone === 'undefined') {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity + '<br>' + 'PHONE UNAVAILABLE<br>SUN - SAT: 10:30AM - 10:00PM</div>');

      infoWindow.open(map, this);
    } else {
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + addressFull1 + ', ' + addressFull2 + '<br>' + phone + '<br>' + 'SUN - SAT: 10:30AM - 10:00PM</div>');

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
