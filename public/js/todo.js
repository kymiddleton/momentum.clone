//A todo list with ability to add, update, and delete 


function showtoDoList() {
    $('.bottom-right').toggleClass('visible');
    $('.form-control').toggleClass('invisible');
}
$('#todospan').on('click', showtoDoList);

function showNewToDo() {

    $('.newtodo').addClass('invisible');
    $('.form-control').removeClass('invisible');
    $('.todonew').addClass('gone');

}
$('#newtodobutton').on('click', showNewToDo);

/**
 * 
 * Creates a state variable with a todo object with a render function
 * 
 */

$(function () {
    const state = {
        todo: [],
    };

    const render = function () {
        $('#content').empty();
        runToDoQuery();
    }

    /**
     * 
     * appends a todo to the page with an ID, a checkbox, and a delete button
     * @param {Object} outputElement object rendered
     * @param {Schema}todo todo object properties
     * @param {Object}_id assigns property to unique item id
     * 
     */

    const renderToDo = function (outputElement, todo, _id) {
        const output = $(outputElement);

        const toDoListElement = $('<div>').addClass('toDo');

        const label = $('<label>').addClass('check-marker');
        const checkbox = $('<input type="checkbox">')
            .attr('checked', todo.todoStatus.completed)
            .toggleClass('completed')
            .attr('data-id', todo._id);

        label.append(checkbox);

        const elem = $('<textarea.readonly>').text(todo.todoItem).addClass('textDisplay');

        const elem2 = $('<button id = "options"class = "deletetodo"><i class="fas fa-ellipsis-h"></i></button>')
            .addClass('delete')
            .attr('data-id', todo._id)
            .append('<i>')
        console.log(elem);
        toDoListElement.append(label, elem, elem2)
        output.append(toDoListElement);
    }

    /**
     * 
     * renders all to do items in list
     * @param {Object} outputElement object rendered
     * @param {Schema}todo todo object properties
     * 
     */

    const renderToDos = function (outputElement, todo) {
        const output = $(outputElement);
        output.empty();
        todo.forEach((todo) => renderToDo(outputElement, todo));
    }

    /**
     * 
     * GET route to retrieve todo model from database
     * 
     */

    const runToDoQuery = function () {

        $.ajax({ url: "/api/todoLog", method: "GET" })
            .then(function (todo) {
                state.todo = todo
                renderToDos('#content', todo);
            });
    }

    /**
     * submits input field when enter key is pressed
     * @param {Attribute} event when the enter keys is pressed
     * 
     */

    var input = document.getElementById("toDoInput");

    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("enterData").click();
            console.log("we clicked enter")
        }
    });

    /**
     * when the submit action is performed, hide greeting, hide new todo button, and submit contents of input field. Posts new item to database.
     * @param {Attribute} event on click
     * 
     */

    $('.submit').on('click', function (event) {
        event.preventDefault();
        $('.todogreeting').addClass('hide');
        $('.newtodo').addClass('hide');
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

    /**
      * 
      * Update route
      * 
      */

    $('body').on('click', function (event) {
        const thisId = $(this).attr('data-id');
        const completed = event.target.checked;
        console.log(event.target.checked)


        const toDoUpdate = state.todo[Number(thisId)];

        toDoUpdate.completed = completed;
        if (completed === true){
            toDoUpdate.set(textarea, '');
        };

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

    /**
     * 
     * When delete button is pressed, remove item with specific id from database
     * 
     */

    $('body').on('click', '.delete', function (event) {
        const todoID = $(this).attr('data-id');

        console.log(state.todo[Number(todoID)])
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