/**
 * Function of the Clock
 * startTime function is for 24hour time
 * appendZero adds a Zero to both clocks
 * Base12hour function controls the Am Pm on twelveTime
 * TwelveTime funtion is for 12hour time
 * Toggling Between Milc(MilitaryClock) and Rc(Regular), To keep them centered
 * Click functions covers on the toggle between startTime and twelveTime
 * Also controls the Am and Pm transtion to fade out by Jquery fade out function and a Set Invertnal time. 
 * 
 * 
 * 
 */



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
        if (!toggle) {
            startTime();
            $('#ampm').css('opacity', 1);
            $('#ampm').hide();
      console.log("rc" +toggle);
        } else {
            twelveTime();
            $('#ampm').show();
            setInterval(function() {$('#ampm').fadeOut(2000);}, 8000);
            console.log("mc" +toggle);
        }
    });
    
});
