// Inspirational quote each day

$(document).ready(function() {

    $.ajax({ url: '/api/quotesLog', method: 'GET' })
    .then(function (quote) {
        renderLinks(quote);
        console.log(quote);
      });
  }




// $(function () {
//     const state = {
//         quote: [],
//     };

//     const date = new Date().getDate();

//     const whichQuote = {
//         quoteDate: date
//     };

//     const render = function () {
//         $('quote-body').empty();
//         runQuoteQuery();
//     }

//     const runQuoteQuery = function () {

//         $.ajax({ url: '/api/todoLog', method: 'PUT', data: whichQuote})
//             .then(function (quote) {
//                 state.quote = quote
//                 renderQuote('quote-text', quote);
//             });
//     }

//     render();
// });

// $('.quote-text').append(message);
// $('.quote-source').append(message);


//----------------------------------------------//
// const quotes = [
//     '"You are unrepeatable.  There is a magic about you that is all your own. - D.M. Dellinger"',
// ]

// function newQuote() {
//     let randomNumber = Math.floor(Math.random() * (quotes.length));
//     document.getElementById('quote-container').innerHTML = quotes[randomNumber];
// }

// $('.quote-text').append(quotes);