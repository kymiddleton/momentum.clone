// A moving clock set to EST
//W3 Tools clock for public use, Most of them start off like this


var count = 0;
$('#default-clock').click(function() {
    count++;
    var isEven = function(someNumber) {
        return (someNumber % 2 === 0) ? true : false;
    };
    if (isEven(count) === false) {
        $(this).startTime()
    } else if (isEven(count) === true) {
        $(this).twelveTime()
    }
});


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    
    document.getElementById('default-clock').innerHTML = h + ":" + m;
    const t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
};

function twelveTime(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    h = twelve_hour_time(h);
    document.getElementById('default-clock').innerHTML = h + ":" + m;
    const t = setTimeout(startTime, 500);
}

function twelve_hour_time(h){

    if(h > 12){
        h = h - 12;
        AM_or_PM = " PM";
    }
    return h;
};
