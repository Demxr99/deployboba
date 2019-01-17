let map;
let icon;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601, lng: -71.0942},
        zoom: 14
    });

    icon = {
        url: "https://static1.squarespace.com/static/58c822fc5016e1488d301639/59c1950ab7411cb6bc8b564b/59c19852d55b416389432692/1505859672758/Boba.png?format=750w", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(25, 25) // anchor
    };

    renderMarkers(icon);
}

function renderMarkers(icon){
    get('/api/locations', {}).then(locations => {
        console.log(locations);
        for (const location of locations) {
            let new_marker = createMarker(location.latLng, location.name, icon)
            console.log(new_marker)
            new_marker.setMap(map);
        }
    });
}

function createMarker(location, title, icon) {
    let marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        title: title,
        icon: icon,
    });
    return marker
}