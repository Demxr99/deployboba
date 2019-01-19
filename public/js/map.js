const API_KEY = "AIzaSyBb-pivVtwhFSaw2ZXL4nadsUlJdygH3UI";
let map;
let icon;
let names;
let markers;

function main() {
    get('/api/whoami', {}).then(function(user) {
      console.log(user);
      renderNavbar(user);
    });

    // let x = document.cookie;
    // console.log(x);
    // document.cookie = x + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    // let y = document.cookie;
    // console.log(y);

    $('.menu .item')
    .tab()
    ;

    let startCalendar = document.getElementById("start-date");
    startCalendar.addEventListener("click", function(){
        console.log("i am here");
        $('#start-date').calendar('popup', 'show');
    });
    let endCalendar = document.getElementById("end-date");
    endCalendar.addEventListener("click", function(){
        console.log("i am here");
        $('#end-date').calendar('popup', 'show');
    });
}
main();


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
    let x = document.cookie;
    if (x == undefined){
        new_x = '';
    } 
    else {
        new_x = x.slice(15, x.length);
    }
    
    console.log(x);
    console.log("hello");
    names = [];
    markers = [];
    
    get('/api/events', {name : new_x}).then(events => {
        console.log(events);
        for (const event of events) {
            let new_event_marker = createMarker(event.latLng, event.name, icon, event.address, event.rating);
            new_event_marker.setMap(map);
            names.push({title: event.name});
            markers.push(new_event_marker);
            let newDiv = document.createElement('div');
            let resultsDiv = document.getElementById('results');
            newDiv.className = 'item';
            newDiv.innerText = event.name;
            newDiv.nodeValue = event.name;
            resultsDiv.appendChild(newDiv);
        }
    });
    get('/api/locations', {name : new_x}).then(locations => {
        console.log(locations);
        for (const location of locations) {
            let new_marker = createMarker(location.latLng, location.name, icon, location.address, location.rating);
            new_marker.setMap(map);
            names.push({title: location.name});
            markers.push(new_marker);
            let newDiv = document.createElement('div');
            let resultsDiv = document.getElementById('results');
            newDiv.className = 'item';
            newDiv.innerText = location.name;
            newDiv.nodeValue = location.name;
            resultsDiv.appendChild(newDiv);
        }
        console.log(names);
        $('.ui.dropdown').dropdown({
            onChange: function (value, text, $selectedItem) {
                selectedItems = value.split(",");
                for (let i=0; i<markers.length; i++){
                    let curr_marker = markers[i];
                    curr_marker.setVisible(true);
                    if (selectedItems[0] != "") {
                        curr_marker.setVisible(false);
                        for (let j=0; j<selectedItems.length; j++){
                            if (selectedItems[j] == curr_marker.title.toLowerCase()){
                                curr_marker.setVisible(true);
                            }
                        }
                    }
                }
            },
            forceSelection: false,
            selectOnKeydown: false,
            showOnFocus: false,
            on: "hover"
          });
    });
    document.cookie = x + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    let y = document.cookie;
    console.log(y);
    console.log("nothing above");
}

function createMarker(location, title, icon, address, rating) {
    let marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        title: title,
        icon: icon,
    });
    marker.addListener('click', function() {
        let contentDiv = document.getElementById("store-content");
        let nameEl = document.getElementById("name");
        let addressEl = document.getElementById("address");
        let ratingEl = document.getElementById("rating");
        let statusEl = document.getElementById("status");
        let drinkEl = document.getElementById("drink");
        console.log(address);

        nameEl.innerHTML = "<strong>Store Name:</strong>";
        addressEl.innerHTML = "<strong>Address:</strong>";
        ratingEl.innerHTML = "<strong>Rating:</strong>";
        statusEl.innerHTML = "<strong>Status:</strong>";
        drinkEl.innerHTML = "<strong>Last Ordered Drink:</strong>";

        nameEl.innerHTML = nameEl.innerHTML + title;
        addressEl.innerHTML = addressEl.innerHTML + address;
        ratingEl.innerHTML = ratingEl.innerHTML + rating;
        statusEl.innerHTML = statusEl.innerHTML + "visited";
        drinkEl.innerHTML = drinkEl.innerHTML + "Milk Tea";

        contentDiv.style.display = "block";

    });
    return marker
}

function submitLocation(shop_name, shop_address, shop_zip, location) {
    const data =  {
        name: shop_name,
        address: shop_address,
        zip: shop_zip,
        latLng: location,
    };
    post('/api/locations', data);
}

function submitEvent(event_name, event_address, event_zip, location, event_start, event_end){
    const data = {
        name : event_name,
        address : event_address,
        zip : event_zip,
        latLng : location,
        start : event_start,
        end : event_end,
    };
    post('/api//events', data);
}

let add_btn = document.getElementById("add-btn");
add_btn.addEventListener("click", function(){
    console.log("clicked");
    $('.ui.modal')
   .modal('setting', 'transition', 'fade up')
   .modal('show')
   .modal({
       onApprove: function(){
           let firstTabLink = document.getElementById("tab-1");
           if (firstTabLink.className == "item active"){
                console.log("This is the first tab");
                let shop_name = document.getElementById("shop-name").value;
                let shop_address = document.getElementById("shop-address").value;
                let shop_zip = document.getElementById("shop-zip").value;
                
                get('https://maps.googleapis.com/maps/api/geocode/json', {'address' : shop_address, 'key' : API_KEY}).then(location_info => {
                        console.log(location_info);
                        let location = location_info["results"][0]["geometry"]["location"];
                        let marker = createMarker(location, shop_name, icon, shop_address);
                        marker.setMap(map);
                        submitLocation(shop_name, shop_address, shop_zip, location);
                });
           }
           else {
                console.log("This is the second tab");
                let event_name = document.getElementById("event-name").value;
                let event_address = document.getElementById("event-address").value;
                let event_zip = document.getElementById("event-zip").value;
                let event_start = document.getElementById("event-start").value;
                let event_end = document.getElementById("event-end").value;

                let startDate = new Date(event_start);
                let endDate = new Date(event_end);
                console.log(startDate);
                console.log(endDate);

                get('https://maps.googleapis.com/maps/api/geocode/json', {'address' : event_address, 'key' : API_KEY}).then(location_info => {
                        console.log(location_info);
                        let location = location_info["results"][0]["geometry"]["location"];
                        let marker = createMarker(location, event_name, icon, event_address);
                        marker.setMap(map);
                        submitEvent(event_name, event_address, event_zip, location, startDate, endDate);
                });
           }  
       }
   });
});

$('.ui.dropdown').dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log(value);
    },
    forceSelection: false,
    selectOnKeydown: false,
    showOnFocus: false,
    on: "hover"
  });
