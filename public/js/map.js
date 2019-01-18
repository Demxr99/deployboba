function main() {
    get('/api/whoami', {}).then(function(user) {
      console.log(user);
      renderNavbar(user);
    });
}
main();

const API_KEY = "AIzaSyBb-pivVtwhFSaw2ZXL4nadsUlJdygH3UI";

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
           let shop_zip = document.getElementById("shop-zip").value;
           
           get('https://maps.googleapis.com/maps/api/geocode/json', {'address' : shop_address, 'key' : API_KEY}).then(location_info => {
                console.log(location_info);
                let location = location_info["results"][0]["geometry"]["location"];
                let marker = createMarker(location, shop_name, icon);
                marker.setMap(map);
                submitLocation(shop_name, shop_address, shop_zip, location);
           });
       }
   });
});

function submitLocation(shop_name, shop_address, shop_zip, location) {
    const data =  {
        name: shop_name,
        address: shop_address,
        zip: shop_zip,
        latLng: location,
    };
    post('/api/locations', data);
}


