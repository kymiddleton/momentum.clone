//A todo list with ability to add, update, and delete 

function showtoDoList(){
    $('.bottom-right').toggleClass('show');
}
    $('#todospan').on('click', showtoDoList);


    
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
            .attr('checked', todo.todoStatus)
            .addClass('completed')
            .attr('data-id', todo._id);


        label.append(checkbox);
        label.append('<i class="fas fa-check-square checked">');
        label.append('<i class="far fa-square unchecked">');


        const elem = $('<span>').text(todo.todoItem).addClass('textDisplay');

        const elem2 = $('<button><i class="fas fa-ellipsis-h"></i></button>')
            .addClass('delete')
            .attr('data-id', todo._id)
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

        $.ajax({ url: '/api/todoLog', method: 'POST', data: newToDo }).then(
            function (data) {

                if (data.success) {

                    console.log('data', data)
                    $('#content').val('');
                    $('#content').focus();
                }
            })

        $.ajax({
            url: '/api/todoLog',
            method: 'POST',
            data: newToDo
        }).then(
            function (data) {
                if (data.success) {

                    console.log('data', data)
                    $('#toDoInput').val('');
                    $('#toDoInput').focus();

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


        $.ajax({
            url: `/api/todoLog/${todoID}`,
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

