// Easy access to favorite links




$( function(){


    const renderLinks = function (links) {   
        $('#savedlinks').empty();
        links.forEach(e => render(`<div id="alllinks"><a href="http://${e.url}"><button type="submit" id ="linkbutton">${e.linkName}</button></a><button type="submit" id="dellink" data-id=${e._id}>x</button></div>`));
        };
    
    
    const render = function (links) {
        $('#savedlinks').append(links);
          };
    
          const runLinksQuery = function () {
    
            $.ajax({ url: '/api/linksLog', method: 'GET' })
              .then(function(links) {
                  renderLinks(links);
                console.log(links);
              });
          }
    
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
    
    $('#submitlink').on('click', function (event) {
        event.preventDefault();
    
        const newLink = {
            linkName: $('#linkname').val().trim(),
            url: $('#linkurl').val().trim(),
        };
    
        for (let key in newLink) {
            if (newLink[key] === '') {
                alert('Please fill out all fields');
                runLinksQuery();
                return;
            }
        }
    
        $.ajax({ url: '/api/linksLog', method: 'POST', data: newLink })
            .then(function (data) {
                    console.log(newLink);
                    $('#linkname').val('');
                    $('#linkurl').val('');
                
            });
            runLinksQuery();
    });
    
    $('#savedlinks').on('click', '#dellink', function (event) {
        console.log($(this).data('id'));
        const linkID = $(this).data('id');
        $.ajax({url: `/api/linksLog/${linkID}`, method: 'DELETE'})
        .then(function(data) {
            // console.log(data.success);
    
            // if (data.success) {
                runLinksQuery();
            // } else {
    
            //     alert('Cannot delete');
            // }
        });
        });
    
    });