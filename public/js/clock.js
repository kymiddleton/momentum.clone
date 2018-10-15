// A moving clock set to EST
$(function() {
    startTime();

    function  appendZero (input) {
        if (input < 10) {input = "0" + input};  
        return input;
    };

    function startTime() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
    
        hour = appendZero(hour);
        minute = appendZero(minute);
        
        document.getElementById('default-clock').innerHTML = hour + ":" + minute;
        $("#default-clock").addClass("milc");
        $("#default-clock").removeClass("rc");
    };

    function base12Hour (hour, minute){
        console.log("I'm running")
        if(hour > 12){
            hour = hour - 12;
            document.querySelector('#ampm').innerHTML =  " PM";
        }
        else if(hour < 12){
            document.getElementById('ampm').innerHTML = " AM";

        }
        else{
            document.getElementById('ampm').innerHTML =  " PM";
        }
        
        return [hour, minute];
    };

    function twelveTime (){
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();

        hour = appendZero(hour);
        minute = appendZero(minute);

        console.log("I'm calling")
        var tempArray = base12Hour(hour, minute);
        hour = tempArray[0];
        minute = tempArray[1];

        document.getElementById('default-clock').innerHTML = hour + ":" + minute;
        $("#default-clock").addClass("rc");
        $("#default-clock").removeClass("milc")
    };
    toggle = false;
    $('#default-clock').click(function(e) {
        toggle = !toggle;
        $('#ampm').toggleClass('remove');
        $('#ampm').toggleClass('add');
        // $("#default-clock").toggleClass("milc");
        // $("#default-clock").toggleClass("rc");
        if (toggle) {
            startTime();
      console.log("rc" +toggle);
        } else {
            twelveTime();
            console.log("mc" +toggle);
        }
    });
    $('#default-clock').on('click', function() {
        if ($('#ampm').css('opacity') == 0) {
            $('#ampm').css('opacity', 1);
        }
        else {
            $('#ampm').css('opacity', 0);
        }
    });
    //$('#default-clock').on('click', function() {
        // $(".rc").toggleClass("milc");
        // $(".milc").toggleClass("rc");});
});