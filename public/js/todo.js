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
        todo: [],
    };

    const render = function () {
        $('#content').empty();
        runToDoQuery();
    }

    const renderToDo = function (outputElement, todo, _id) {
        const output = $(outputElement);

        const toDoListElement = $('<div>').addClass('toDo');

        const label = $('<label>').addClass('check-marker');
        const checkbox = $('<input type="checkbox">')
            .attr('checked', todo.todoStatus.completed)
            .addClass('completed')
            .attr('data-id', todo._id);

        label.append(checkbox);

        const elem = $('<textarea.readonly>').text(todo.todoItem).addClass('textDisplay');

        const elem2 = $('<button class = "deletetodo"><i class="fas fa-ellipsis-h"></i></button>')
            .addClass('delete')
            .attr('data-id', todo._id)
            .append('<i>')
        console.log(elem);
        toDoListElement.append(label, elem, elem2)
        output.append(toDoListElement);
    }

    const renderToDos = function (outputElement, todo) {
        const output = $(outputElement);
        output.empty();
        todo.forEach((todo) => renderToDo(outputElement, todo));
    }

    const runToDoQuery = function () {

        $.ajax({ url: "/api/todoLog", method: "GET" })
            .then(function (todo) {
                state.todo = todo
                renderToDos('#content', todo);
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
        event.preventDefault();

        const newToDo = {
            todoItem: $('#toDoInput').val().trim(),
            todoStatus: false,
        };

        for (let key in newToDo) {
            if (newToDo[key] === '') {
                alert('Please Enter Something To Do!');
                return;
            }
        }

        $('.todogreeting').addClass('hide');
        $('.newtodo').addClass('hide');


        $.ajax({
            url: '/api/todoLog',
            method: 'POST',
            data: newToDo
        }).then(
            function (data) {
                if (data.success) {

                    console.log('data', data)
                    $('#content').val('');
                    $('#content').focus();

                    render();
                } else {

                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            });

    })

    $('body').on('click', '.completed', function (event) {
        const thisId = $(this).attr('data-id');
        const completed = event.target.checked;

        const toDoUpdate = state.todo[Number(thisId)];

        toDoUpdate.completed = completed;

        $.ajax({
            url: `/api/todoLog/${thisId}`,
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

        console.log(state.todo[Number(todoID)])
        if (todo.length === 0) {
            $('.newtodo').addClass('visible');
            $('.newtodo').addClass('show');
            $('.form-control').toggleClass('invisible');
        }

        $.ajax({
            url: `/api/todoLog/${todoID}`,
            method: 'DELETE'
        })
            .then(function (data) {
                console.log(data.success);
             
                if (data.success) {
                    render();
                }
                else {

                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            });
    });

    render();
});