// New inspirational quote displays when page loads. 

/**
 * A random number is set to pull quotes from the database. 
 */
const randomNumber = Math.floor((Math.random() * 9) + 1);

/**
 * GET route to retrive quotes from database.
 * @param {Object} quote quote rendered.
 */

const newQuote = function () {
    $.ajax({
        url: '/api/quotesLog',
        method: 'GET',
        dataType: 'json',
    }).then(function (quote) {
        $('.quote-text').html(`<p>${quote[randomNumber].quoteText}</p><p>-${quote[randomNumber].quoteAuthor}`);
    });
};

/**
 * New Quote displayed on page refresh. 
 */
window.onload = newQuote();