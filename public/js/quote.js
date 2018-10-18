// Inspirational quote each day

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