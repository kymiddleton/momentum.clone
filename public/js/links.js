// Easy access to favorite links
/**
 * 
 * Links section: Contains saved links with ability to access on 
 * click and add or delete links
*/

$(function () {

 /**
  * 
  * runlinks query will complete and get request and 
  * then take in the list of links and append list to links area
 */   
    const runLinksQuery = function () {
        $('#savedlinks').empty();
        $.ajax({ url: '/api/linksLog', method: 'GET' })
            .then(function (links) {
                let htmlstr = '';
                links.forEach(e => {
                    htmlstr += `<div id="alllinks"><a id="hovlink" href="${e.saveurl}"><img src="https://www.google.com/s2/favicons?domain=${e.saveurl}"><button type="submit" id ="linkbutton">${e.linkName}</button></a>`
                    htmlstr += `<span id="dellink" data-id=${e._id}>x</span></div>`

                });
                $('#savedlinks').append(htmlstr);
                removelinkInputs();
            
                console.log(links);
              })
              .catch(function (err) {
                console.log(err);
            });
          }

/**
 * 
 * toggleLinks is used to make saved links box to appear/disappear when clicking "links" 
 * addLinkInputs/removelinkInputs allow the input to appear/disppear when clicking.
*/

        const toggleLinks = function () {
           
           $('.inputlink').toggleClass('show');
           
           runLinksQuery();
           renderLinks();
        }
        $('#favlinks').on('click', toggleLinks);
    
        const addlinkInputs = function () {
           
            $('.linkinputs').addClass('show');
            $('#newlinks').addClass('hide');
         }
         $('#newlinks').on('click', addlinkInputs);
        
         const removelinkInputs = function () {
           
            $('.linkinputs').removeClass('show');
            $('#newlinks').removeClass('hide');
         }
         $('#nevermind').on('click', removelinkInputs);


/**
 * 
 * submitlink on click takes in the name and the url to save and post to db.  
 * It will check to see if http is included and if not adds to string in order 
 * to make a complete URL.
*/
    
    $('#submitlink').on('click', function (event) {
        event.preventDefault();

        const saveLink = {
            linkName: $('#linkname').val().trim(),
            url: $('#linkurl').val().trim(),

        };
        console.log(saveLink.url);


        let url = saveLink.url;
        console.log(url);
        let saveurl = '';
        const beg1 = ('http://');
        const beg2 = ('https://www.');
        let found = url.includes('http');
        if (found) {
            saveurl = url;
            console.log('true');
        } else {
            saveurl = beg1.concat(url)
            console.log(saveurl);
        }

        const newLink = {
            linkName: $('#linkname').val().trim(),
            saveurl,
        }
        console.log(newLink);

        for (let key in newLink) {
            if (newLink[key] === '') {
                alert('Please fill out all fields');
                runLinksQuery();
                return;
            }
        }

        $.ajax({ url: '/api/linksLog', method: 'POST', data: newLink })
            .then(function (data) {
                console.log(newLink)

                $('#linkname').val('');
                $('#linkurl').val('');

            });
        runLinksQuery();
        removelinkInputs();
    });


    /*
    to delete a link when clicking the delete button
    */

    $('#savedlinks').on('click', '#dellink', function (event) {
        console.log($(this).data('id'));
        const linkID = $(this).data('id');
        $.ajax({ url: `/api/linksLog/${linkID}`, method: 'DELETE' })
            .then(function (data) {
                // console.log(data.success);

                // if (data.success) {
                runLinksQuery();
            // } else {
    
            //     alert('Cannot delete');
            // } 
        });
    });
});