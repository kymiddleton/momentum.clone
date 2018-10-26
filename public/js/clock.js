
/**The major function that holds all the interworking of the clock. */

$(function() {
  
    startTime();
   /** appendZero adds a Zero to both clocks */
    function  appendZero (input) {
        if (input < 10) {input = "0" + input};  
        return input;
    };
/** startTime function is for 24hour time*/ 
    function startTime() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
    
        hour = appendZero(hour);
        minute = appendZero(minute);
        
        document.getElementById('default-clock').innerHTML = hour + ":" + minute;
        setTimeout(startTime, 1000);
    };
    /**Base12hour function controls the Am Pm on twelveTime */
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
    /**TwelveTime funtion is for 12hour time*/
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

        document.getElementById('clockrc').innerHTML = hour + ":" + minute;
        setTimeout(twelveTime, 1000);
        return twelveTime;
        
    };
    /**Toggling Between Milc(MilitaryClock) and Rc(Regular), To keep them centered
     * Click functions covers on the toggle between startTime and twelveTime
     * Also controls the Am and Pm transtion to fade out by Jquery fade out function and a Set Invertnal time
    */
    toggle = false;
    $('#clockc').click(function(e) {
        toggle = !toggle;
        if (!toggle) {
            startTime();
            $('#ampm').css('opacity', 1);
            $('#ampm').hide();
            $('#clockrc').hide();
            $('#default-clock').show();

            
      console.log("rc" +toggle);
        } else {
            twelveTime();
            $('#ampm').show();
            $('#default-clock').hide();
            $('#clockrc').show();
           setInterval(function() {$('#ampm').fadeOut(2000);}, 8000);
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
