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
    };
    $('default-clock').click(function(){
        $('#ampm').toggleClass('remove');
        $('#ampm').toggleClass('add');
    });
    toggle = false;
    $('default-clock').click(function(e) {
        toggle = !toggle;
        if (toggle) {
            startTime();
        } else {
            twelveTime();
        }
    });

});
