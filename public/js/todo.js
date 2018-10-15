//A todo list with ability to add, update, and delete 
function showtoDoList() {
    $('.bottom-right').toggleClass('visible');
    $('.form-control').toggleClass('invisible');
}
$('#todospan').on('click', showtoDoList);

function showNewToDo() {
    $('.newtodo').addClass('invisible');
    $('.form-control').removeClass('invisible');
    $('.todonew').addClass('hide');
}
$('#newtodobutton').on('click', showNewToDo);

$(function () {

    const state = {
        toDoList: [],
    };

    const render = function () {
        $('#content').empty();
        runToDoQuery();
    }

    const renderToDo = function (outputElement, toDoList, _id) {
        const output = $(outputElement);

        const toDoListElement = $('<div>').addClass('toDo');

        const label = $('<label>').addClass('check-marker');
        const checkbox = $('<input type="checkbox">')
            .attr('checked', toDoList.completed)
            .addClass('completed')
            .attr('data-id', toDoList._id);

        label.append(checkbox);
        label.append('<i class="fas fa-check-square checked">');
        label.append('<i class="far fa-square unchecked">');

        const elem = $('<span>').text(toDoList.thingToDo).addClass('textDisplay');

        const elem2 = $('<button><i class="fas fa-ellipsis-h"></i></button>')
            .addClass('delete')
            .attr('data-id', toDoList._id)
            .append('<i>')
        console.log(elem);
        toDoListElement.append(label, elem, elem2)
        output.append(toDoListElement);
    }

    //   $('#options').on('click', function (event) {
    //     event.preventDefault();
    // const optionsElement = $('<div>').addClass('option box');
    // const div = $('<div>').addClass('option box label');

    // div.append('<div>"Edit"</div>')

    //   });

    const renderToDos = function (outputElement, toDoList) {
        const output = $(outputElement);
        output.empty();
        toDoList.forEach((todo) => renderToDo(outputElement, todo));
    }

    const runToDoQuery = function () {

        $.ajax({ url: "/api/toDoSchema", method: "GET" })
            .then(function (toDoList) {
                state.toDoList = toDoList
                renderToDos('#content', toDoList);
            });
    }

    var input = document.getElementById("toDoInput");

    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("enterData").click();
            console.log("we clikced enter")
        }
    });

    $('.submit').on('click', function (event) {
  
// }
// $('#newtodobutton').on('click', showNewToDo);


// $(function () {
//     const state = {
//         todo: [],
//     };

//     const render = function () {
//         $('#content').empty();
//         runToDoQuery();
//     }

//     const renderToDo = function (outputElement, todo, _id) {
//         const output = $(outputElement);

//         const toDoListElement = $('<div>').addClass('toDo');

//         const label = $('<label>').addClass('check-marker');
//         const checkbox = $('<input type="checkbox">')
//             .attr('checked', todo.todoStatus.completed)
//             .addClass('completed')
//             .attr('data-id', todo._id);


//         label.append(checkbox);
      


//         const elem = $('<span>').text(todo.todoItem).addClass('textDisplay');

//         const elem2 = $('<button class = "deletetodo"><i class="fas fa-ellipsis-h"></i></button>')
//             .addClass('delete')
//             .attr('data-id', todo._id)
//             .append('<i>')
//         console.log(elem);
//         toDoListElement.append(label, elem, elem2)
//         output.append(toDoListElement);
//     }


//     const renderToDos = function (outputElement, todo) {
//         const output = $(outputElement);
//         output.empty();
//         todo.forEach((todo) => renderToDo(outputElement, todo));
//     }

//     const runToDoQuery = function () {

//         $.ajax({ url: "/api/todoLog", method: "GET" })
//             .then(function (todo) {
//                 state.todo = todo
//                 renderToDos('#content', todo);
//             });
//     }

    var input = document.getElementById("toDoInput");
    
   input.addEventListener("keyup", function(event) {

        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("enterData").click();
            console.log("we clikced enter")
        }
    });

//     var input = document.getElementById("toDoInput");

        const newToDo = {
            thingToDo: $('#toDoInput').val().trim(),
            completed: false,
        };

//     $('.submit').on('click', function (event) {
//         event.preventDefault()

//         const newToDo = {
//             todoItem: $('#toDoInput').val().trim(),
//             todoStatus: false,

//         };

//         for (let key in newToDo) {
//             if (newToDo[key] === '') {
//                 alert('Please Enter Something To Do!');
//                 return;
//             }
//         }



//         $.ajax({
//             url: '/api/todoLog',
//             method: 'POST',
//             data: newToDo
//         }).then(
//             function (data) {
//                 if (data.success) {

                    render();
                } else {
                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            });
    })

    $('body').on('click', '.completed', function (event) {
        const thisId = $(this).attr('data-id');
        const completed = event.target.checked;
        const toDoUpdate = state.toDoList[Number(thisId)];

//         const toDoUpdate = state.todo[Number(thisId)];

        $.ajax({
            url: `/api/toDoSchema/${thisId}`,
            method: 'PUT',
            data: toDoUpdate
        })
            .then(function (data) {
                if (data.success) {
                    render();
                } else {
                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            });
    })

    $('body').on('click', '.delete', function (event) {
        const todoID = $(this).attr('data-id');

//     $('body').on('click', '.delete', function (event) {
//         const todoID = $(this).attr('data-id');

        $.ajax({
            url: `/api/toDoSchema/${todoID}`,
            method: 'DELETE'
        })
            .then(function (data) {
                console.log(data.success);

                if (data.success) {
                    render();
                } else {
                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            });
    });

    render();
});