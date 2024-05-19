function initMap() {
    // Latitude and Longitude
    var myLatLng = {lat: 41.388675, lng: 2.1707001};

    var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'South Jakarta, INA' // Title Location
    });
}