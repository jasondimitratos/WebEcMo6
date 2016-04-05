$('document').ready(function () {
    $('#where').hide();
    $('#who').hide();
    $('#what').find('button').on('click', function (event) {
        event.preventDefault();

        $('#what').hide();
        $('#where').show();
    });
    /**Diese Function ist ein eventhandler für den footer die Das entsprechende element anzeigt*/
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
