navigator.geolocation.watchPosition(success, error, options);

var map = L.map('mapid').setView([51.505, -0.09], 13);
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0

  };

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Your current location.')
    .openPopup();*/

  
  function success(pos) {
    var crd = pos.coords;

    const lat = crd.latitude;
    const lng = crd.longitude;
    //L.marker([lat, lng]).addTo(map)
    //.bindPopup('Your current location.')
    //.openPopup();
    //map.setView([lat,lng], 13);

    locationLog(lat, lng);
    /*console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);*/
  }


async function locationLog(lat, lng) {

    const res = await fetch(`https://competent-knuth-7f6072.netlify.app/.netlify/functions/hello?lat=${lat}&lng=${lng}`);
    const data = await res.json();
    console.log(data);
    L.marker(data).addTo(map)
    .bindPopup('Your current location.')
    .openPopup();
    map.setView(data);

  }

  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
