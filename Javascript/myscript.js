function showmap(whatfood,radius) {

    /**
     * Diese funktions initialisiert eine map
     * @returns {google.maps.Map}
     */
    function initializeMap() {
        setCurrentPosition();
        var mapOptions = {center: getCurrentPosition(), zoom: 15};
        var map = new google.maps.Map(document.getElementById('where'), mapOptions);

        return map;
    }

    /**
     * Diese funktion speichert berechnet die aktuelle position und speichert sie im lokalen speicher
     */
    function setCurrentPosition() {
        window.navigator.geolocation.getCurrentPosition(
            function (position) {
                var pos = JSON.stringify({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                window.localStorage.setItem("currentPosition", pos);
            }, function () {
                handleNoGeolocation(true);
            });
    }

    /**
     * Diese Funktion holt sicht die aktuele position vom lokalen speicher
     */
    function getCurrentPosition() {
        return JSON.parse(window.localStorage.getItem("currentPosition"));
    }

    /**
     * generiert die markers auf der map
     * @param place
     * @param map
     * @param i
     */
    function createMarker(place, map, i) {
        placespeicher = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + (i + 1) + "|FE6256|FFFFFF"
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<h4>' + i + '. ' + place.name + '</h4>'
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

    }

    var map = initializeMap();

    /**
     *
     * Hier wird places nach dem Keyword abgefragt und die WHO liste erstellt
     * @type {{location: *, radius: number, types: string[], keyword: *}}
     */
    var placeSearchOptions = {location: getCurrentPosition(), radius: radius, types: ['restaurant'], keyword: whatfood};
    var service = new google.maps.places.PlacesService(map);

    $('#who').empty();//die vorherige elemente aus who löschen
    service.nearbySearch(placeSearchOptions, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i], map, i);
                //hier wird die who-liste erstellt
                var tr = $('<tr id="restaurants"> </tr>');
                var td1 = $('<td> </td>').text((i + 1) + ". ");
                var td2 = $('<td></td>').text(results[i].name+", ");
                var td3 = $('<td></td>').text(results[i].vicinity);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                $('#who').append(tr);
            }
        }

    });

    //Die Egeine position wird auf der Karte Markiert
    var mypositionmarker = new google.maps.Marker({map: map, position: getCurrentPosition(), icon: "img/orZ4x.png"});

}


$('document').ready(function () {
    $('#where').hide();
    $('#who').hide();
    $('#what').find('button').on('click', function (event) {
        event.preventDefault();
        $('#what').hide();
        $('#where').show();
        //herausfinden welcher radiobutton aktive ist
        var presedradiobutton = $('#what').find('form').children('input').filter($('input:checked')).val();
        var radius=$('#slider1').val();
        console.log(radius);
        showmap(presedradiobutton,radius);
    });


    /**
     * Dies ist ein Eventhandler für den footer die im Main die entsprechende Section anzeigt
     **/
    $('nav').on('click', 'button', function (event) {
        event.preventDefault();

        var ButtonName = $(this).text();
        ButtonName = ButtonName.toLowerCase();
        ButtonName = ButtonName.replace(" ", "");

        $('main').children().each(function () {
            if ($(this).attr('id') === ButtonName) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#slider1').on('click',function(event){
        event.preventDefault();
        $('#inputfield').val($('#slider1').val());
    });

});
