const markers_coordinates = [];
const polygons_coordinates = [];
const rectangles_coordinates = [];

$('form').submit(function (event) {
    event.preventDefault();
    const input_values = {};

    $('form').find('input[type="number"]').each(function () {
        const val = $(this).val();
        const numeric = parseFloat(val);
        input_values[this.name] = numeric;
    });

    markers_coordinates.push(input_values);
    console.log(markers_coordinates);

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

    markers_coordinates.forEach(function (item) {
        addMarker(item);
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon', 'rectangle']
        },
    });
    drawingManager.setMap(myMap);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        if (event.type == 'rectangle') {
            const rectangle = event.overlay.getBounds().toJSON();
            rectangles_coordinates.push(rectangle)
            console.log(rectangles_coordinates);
        }
        if (event.type == 'polygon') {
            const vertices = event.overlay.getPath().getArray();
            const polygon = {};
            vertices.forEach(function (el, index) {
                polygon['coordinate ' + index] = {
                    lat: el.lat(),
                    lng: el.lng(),
                }
            });
            polygons_coordinates.push(polygon);
            console.log(polygons_coordinates);
        }
    });

}
