const API_KEY = "AIzaSyBb-pivVtwhFSaw2ZXL4nadsUlJdygH3UI";

// let image = "https://static1.squarespace.com/static/58c822fc5016e1488d301639/59c1950ab7411cb6bc8b564b/59c19852d55b416389432692/1505859672758/Boba.png?format=750w";

let add_btn = document.getElementById("add-btn");
add_btn.addEventListener("click", function(){
    console.log("clicked");
    $('.ui.modal')
   .modal('setting', 'transition', 'fade up')
   .modal('show')
   .modal({
       onApprove: function(){
           let shop_name = document.getElementById("shop-name").value;
           let shop_address = document.getElementById("shop-address").value;

           let icon = {
            url: "https://static1.squarespace.com/static/58c822fc5016e1488d301639/59c1950ab7411cb6bc8b564b/59c19852d55b416389432692/1505859672758/Boba.png?format=750w", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(25, 25) // anchor
            };
           get('https://maps.googleapis.com/maps/api/geocode/json', {'address' : shop_address, 'key' : API_KEY}).then(location_info => {
                console.log(location_info);
                let location = location_info["results"][0]["geometry"]["location"];
                let marker = new google.maps.Marker({
                    position: location,
                    animation: google.maps.Animation.DROP,
                    title: shop_name,
                    icon: icon,
                });
                marker.setMap(map);
                submitLocation();
           });
       }
   });
});

function submitLocation() {
    const data =  {
        name: shop_name,
        address: shop_address,
        zip_code: 5,
        rating: 5,
        drinks: ['Milk tea', 'Other tea'],
    };

    post('/api/location', data);
}



