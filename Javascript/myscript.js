
function showmap(){
    //Ladet die Karte und die Position in bereich where
    var x= window.navigator.geolocation;
    x.getCurrentPosition(success,failuere);
    function success(position){
        var mylat= position.coords.latitude;
        var mylong= position.coords.longitude;
        console.log(mylat+","+mylong);
        var here= new google.maps.LatLng(mylat,mylong);
        var mapOptions={center: here,zoom:16};
        var map= new google.maps.Map(document.getElementById('where'),mapOptions);
    }
    function failuere(){
        alert("did not work");
    }

    var placeSearchOptions={location:here,radius:300,types:['restaurant'],keyword:'Pizza'}
    var service= new google.maps.places.PlacesService(map);
    service.nearbySearch(placeSearchOptions,function(results,status){});
}


$('document').ready(function () {
    $('#where').hide();
    $('#who').hide();
    $('#what').find('button').on('click', function (event) {
        event.preventDefault();

        $('#what').hide();
        $('#where').show();
        showmap();
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
