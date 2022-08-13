//------------HTML ELEMENTS-----------------
const taskModal = $('#add-task-modal');

//---------FUNCTIONS----------------------

//shows modal when Add Task is clicked
function addTaskHandler(event) {
    event.preventDefault();
    taskModal.addClass('is-active');
}

//shows modal when Update Nest Info is clicked
function updateNestInfoHandler(event) {
    event.preventDefault();
    
}

//shows modal when Leave Nest is clicked
function leaveNestHandler(event) {
    event.preventDefault();
    
}

//hides all modals
function closeModal(event) {
    event.preventDefault();
    $('.modal').removeClass('is-active')
}

//saves task to DB and reloads page
async function saveTaskHandler(event){
    event.preventDefault();

    const task_name = $('#task-name').val().trim();
    const task_description = $('#task-desc').val().trim();
    const recurs = $('#recurs').val();
    const nest_id = parseInt($('#mynest-info').attr('data-nest-id'));

    if (task_name && task_description && recurs) {
        const response = await fetch('/api/tasks/', {
            method: 'post',
            body: JSON.stringify({
                task_name,
                task_description,
                recurs,
                nest_id
            }),
            headers: {'Content-Type': 'application/json'}
        });

        //if successful, reload the page
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText);
            console.log(response);
        }
    }
}

//-----EVENT LISTENERS--------------
$('#add-task-btn').click(addTaskHandler);
$('#update-nest-btn').click(updateNestInfoHandler);
$('#leave-nest-btn').click(leaveNestHandler);
$('.modal-close').click(closeModal);
//all elements with the cancel-modal class will trigger this
$('.cancel-modal').click(closeModal);
$('#submit-task-btn').click(saveTaskHandler);