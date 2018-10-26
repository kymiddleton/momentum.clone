// Greeting for morning, afternoon and evening. 

/**
 * Returns a different greeting depending on the time of day.
 * A conditional is used to set the morning message if the time is less than 12 hours.
 * The afternoon message displays if the time is between 12 and 17 hours.
 * The evening message displays if the time is equal or greater than 17 hours to 24 hours.
 * The greeting appends to the 'period' area in the HTML>
 */

const hours = new Date().getHours();
// const hours = 6;
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