let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601, lng: -71.0942},
        zoom: 14
    });
}

initMap();


let add_btn = document.getElementById("add-btn");
add_btn.addEventListener("click", function(){
    $('.ui.modal')
   .modal('setting', 'transition', 'fade up')
   .modal('show');
});


