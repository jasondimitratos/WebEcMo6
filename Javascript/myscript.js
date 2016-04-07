$('document').ready(function () {
    $('#where').hide();
    $('#who').hide();
    $('#what').find('button').on('click', function (event) {
        event.preventDefault();

        $('#what').hide();
        $('#where').show();
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
        //versuch nummer 1
        var x= navigator.geolocation;
        x.getCurrentPosition(success,failuere);
        function success(position){
            var mylat= position.coords.latitude;
            var mylong= position.coords.longitude;
            console.log(mylat+","+mylong);
            var here= new google.maps.LatLng(mylat,mylong);
            var mapOptions={center: here,zoom:20};
            var map= new google.maps.Map(document.getElementById('where'),mapOptions);
        }
        function failuere(){
            alert("did not work")
        }
    });

});
