var form = document.getElementById("form");
var btn = document.getElementById("btn");

function initMap() {
    var options = {
        zoom: 6,
        center: { lat: 49.444433, lng: 32.059767 }
    }
    var myMap = new google.maps.Map(document.getElementById('map'), options);
    function addMarker(coordinates) {
        var marker = new google.maps.Marker({
            position: coordinates,
            map: myMap
        });
    }

    // test
    var odessa = {lat: 46.482526, lng: 30.723310}
    addMarker(odessa);

    // Click
    btn.addEventListener("click", function () {
        event.preventDefault();
        var lat = form["lat"].value;
        var lng = form["lng"].value;
        var coordinates = {};
        coordinates.lat = parseInt (lat, 10);
        coordinates.lng = parseInt (lng, 10);
        addMarker(coordinates);
        form.reset();
    });
}
