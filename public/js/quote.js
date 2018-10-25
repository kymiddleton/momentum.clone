// New inspirational quote displays when page loads. 

//A random number is set to pull quotes from the database. 
//The newQuote function includes an ajex route to the quotesLog in the database.
//A get method is used to pull a new quote.
//Quotes are displayed to the 'quote-text' area in the HTML file.
//A newQuote is displayed each time the page is refreshed. 

const randomNumber = Math.floor((Math.random() * 9) + 1);

const newQuote = function () {
    $.ajax({
        url: '/api/quotesLog',
        method: 'GET',
        dataType: 'json',
    }).then(function (quote) {
        $('.quote-text').html(`<p>${quote[randomNumber].quoteText}</p><p>-${quote[randomNumber].quoteAuthor}`);
    });
};

window.onload = newQuote();

//----------------------------------------------//
// const quotes = [
//     '"You are unrepeatable.  There is a magic about you that is all your own. - D.M. Dellinger"',
// ]

// function newQuote() {
//     let randomNumber = Math.floor(Math.random() * (quotes.length));
//     document.getElementById('quote-container').innerHTML = quotes[randomNumber];
// }

// $('.quote-text').append(quotes);