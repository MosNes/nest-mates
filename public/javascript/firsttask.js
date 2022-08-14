//------------FUNCTIONS---------------------

//saves task to DB and reloads page
async function saveTaskHandler(event) {
    event.preventDefault();

    //capture user input from form
    const task_name = $('#task-name').val().trim();
    const task_description = $('#task-desc').val().trim();
    const recurs = $('#recurs').val();

    //get nest ID from data element on page
    const nest_id = parseInt($('#first-task-form').attr('data-nest-id'),10);

    //validate input
    if (task_name && task_description && recurs) {
        //call API to create new task
        const response = await fetch('/api/tasks/', {
            method: 'post',
            body: JSON.stringify({
                task_name,
                task_description,
                recurs,
                nest_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //if successful, reload the page
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            document.location.reload();
        } else {
            alert(response.statusText);
            console.log(response);
        }
    }
}

//-----------EVENT LISTENER------------------
$('#submit-task-btn').click(saveTaskHandler);