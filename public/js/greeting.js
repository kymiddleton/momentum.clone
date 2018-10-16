// Greeting for morning, afternoon and evening. 

const hours = new Date().getHours();
// const hours = 5;
const morning = ('morning');
const afternoon = ('afternoon');
const evening = ('evening');

if (hours >= 0 && hours < 12) {
    message = morning;
    document.body.className = "morning"; 

} else if (hours >= 12 && hours < 17) {
    message = afternoon;
    document.body.className = "afternoon"; 

} else if (hours >= 17 && hours < 24) {
    message = evening;
    document.body.className = "evening"; 
}

$('.period').append(message);