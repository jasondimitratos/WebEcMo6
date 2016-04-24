
function showmap(whatfood){

    function initializeMap() {
        setCurrentPosition();
        var mapOptions = {center: getCurrentPosition(), zoom: 15};
        var map = new google.maps.Map(document.getElementById('where'), mapOptions);

        return map;
    }


    function setCurrentPosition() {
        window.navigator.geolocation.getCurrentPosition(
            function(position){
                var pos = JSON.stringify({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                });

                window.localStorage.setItem("currentPosition", pos);
            },function() {
                handleNoGeolocation(true);
            });
    }


    function getCurrentPosition() {
        return JSON.parse(window.localStorage.getItem("currentPosition"));
    }

    var map = initializeMap();

    // Places abfragen
    var placeSearchOptions={location:getCurrentPosition(),radius:100000,types:['restaurant'],keyword:whatfood};
    console.log(placeSearchOptions);
    var service= new google.maps.places.PlacesService(map);
    console.log(service);

    service.nearbySearch(placeSearchOptions,function(results,status){
        if(status === google.maps.places.PlacesServiceStatus.OK ) {
            console.log("for schlaufe");

            for(var i=0;i<results.length;i++){

                console.log(results[i]);
                createMarker(results[i], map);

                var tr = $('<tr id="restaurants"> </tr>');
                var td1 = $('<td> </td>').text((i+1));
                var td2 = $('<td></td>').text(results[i].name);
                var td3 = $('<td><img src=results[i].icon></td>');
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);

               /* var p = $('<p id="restaurant">  </p>').text((i+1)+". "+results[i].name + " " + results[i].rating);
                p +=
                */

                $('#who').append(tr);

            }
        }

    });
    var iconURL="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1";
    function createMarker(place,map){
        var mypositionmarker= new google.maps.Marker({map: map, position:getCurrentPosition(), icon:iconURL});
        placespeicher=place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }

}


$('document').ready(function () {
    $('#where').hide();
    $('#who').hide();
    $('#what').find('button').on('click', function (event) {
        event.preventDefault();
        $('#what').hide();
        $('#where').show();
        //herausfinden welcher radiobutton aktive ist
        var presedradiobutton=$('#what').find('form').children('input').filter($('input:checked')).val();
        console.log('jomama');

        showmap(presedradiobutton);


    });


    /**Dies ist ein Eventhandler für den footer die im Main die entsprechende Section anzeigt*/
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

});
