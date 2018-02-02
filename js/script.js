const coordinates = [];
 
$('form').submit(function (event) {
    event.preventDefault();
    const input_values = {};  
    $('form').find('input[type="number"]').each(function () {
        const val = $(this).val();
        const numeric = parseFloat(val);
        input_values[this.name] = numeric;
    });    
    coordinates.push(input_values);
    console.log(coordinates);
    initMap();
    $('form').trigger('reset');
});

// Google Maps API function
function initMap() {
    const options = {
        zoom: 6,
        center: { lat: 49.444433, lng: 32.059767 }
    }
    const myMap = new google.maps.Map(document.getElementById('map'), options);

    function addMarker(coordinates) {
        const marker = new google.maps.Marker({
            position: coordinates,
            map: myMap
        });
        console.log('Marker added')
    }
    coordinates.forEach(function(item){
        addMarker(item);
    })
}
