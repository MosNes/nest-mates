//------------HTML ELEMENTS-----------------
const taskModal = $('#add-task-modal');
const updateNestModal = $('#Update-Nest-Info-modal');
const updateUserModal = $('#update-user-info-modal');
const leaveNestModal = $('#leave-nest-modal');

//---------FUNCTIONS----------------------

//shows modal when Add Task is clicked
function addTaskHandler(event) {
    event.preventDefault();
    taskModal.addClass('is-active');
}

//shows modal when Update Nest Info is clicked
function updateNestInfoHandler(event) {
    event.preventDefault();
    updateNestModal.addClass('is-active');
}

//shows modal when Update My Profile Info is clicked
function updateUserInfoHandler(event) {
    event.preventDefault();
    updateUserModal.addClass('is-active');
}

//shows modal when Leave Nest is clicked
function leaveNestHandler(event) {
    event.preventDefault();
    leaveNestModal.addClass('is-active');
}

//hides all modals
function closeModal(event) {
    event.preventDefault();
    $('.modal').removeClass('is-active')
}

//saves task to DB and reloads page
async function saveTaskHandler(event) {
    event.preventDefault();

    //capture user input from form
    const task_name = $('#task-name').val().trim();
    const task_description = $('#task-desc').val().trim();
    const recurs = $('#recurs').val();

    //get nest ID from data element on page
    const nest_id = parseInt($('#mynest-info').attr('data-nest-id'));

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
            document.location.replace('/')
        } else {
            alert(response.statusText);
            console.log(response);
        }
    }
}

//saves updated user info to the DB and reloads page
async function saveUserHandler(event) {
    event.preventDefault();

    //capture user input from form
    const first_name = $('#user-first-name').val().trim();
    const last_name = $('#user-last-name').val().trim();
    const email = $('#user-email').val().trim();
    const password = $('#user-password').val().trim();

    //get user ID from data element on page
    const user_id = parseInt($('#mynest-info').attr('data-user-id'));

    //create request body object using only the fields that have input:
    const body = {};
    if (first_name) { body.first_name = first_name };
    if (last_name) { body.last_name = last_name };
    if (email) { body.email = email };
    if (password) { body.password = password };

    //call API to update user info
    const response = await fetch(`/api/users/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

    //if successful, reload the page
    if (response.ok) {
        alert("Profile Info Updated!")
        document.location.replace('/')
    } else {
        alert(response.statusText);
        console.log(response);
    }
}

//saves updated nest info to the DB and reloads page
async function saveNestHandler(event) {
    event.preventDefault();

    //capture nest info from form
    const nest_name = $('#nest-name').val().trim();
    const street = $('#nest-street').val().trim();
    const city = $('#nest-city').val().trim();
    const state = $('#nest-state').val();
    const zip = $('#nest-zip').val().trim();
    
    //get nest ID from data element on page
    const nest_id = parseInt($('#mynest-info').attr('data-nest-id'));

    //create request body object using only the fields that have input:
    const body = {};
    if (nest_name) { body.nest_name = nest_name };
    if (street) { body.street = street };
    if (city) { body.city = city };
    if (state) { body.state = state };
    if (zip) { body.zip = zip };

    //call API to update nest info
    const response = await fetch(`/api/nests/${nest_id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

    //if successful, reload the page
    if (response.ok) {
        alert("Nest Info Updated!")
        document.location.replace('/')
    } else {
        alert(response.statusText);
        console.log(response);
    }
}

//removes user from nest
async function removeUserHandler(event) {
    event.preventDefault();

    //get user ID from data element on page
    const user_id = parseInt($('#mynest-info').attr('data-user-id'));

    //call API to remove user from nest
    const response = await fetch('/api/nests/remove-user', {
        method: 'PUT',
        body: JSON.stringify({
            user_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText);
        console.log(response);
    }
}

//-----EVENT LISTENERS--------------
$('#add-task-btn').click(addTaskHandler);
$('#update-nest-btn').click(updateNestInfoHandler);
$('#update-user-btn').click(updateUserInfoHandler);
$('#leave-nest-btn').click(leaveNestHandler);
$('.modal-close').click(closeModal);
//all elements with the cancel-modal class will trigger this
$('.cancel-modal').click(closeModal);
$('#submit-task-btn').click(saveTaskHandler);
$('#submit-user-btn').click(saveUserHandler);
$('#submit-nest-btn').click(saveNestHandler);
$('#leave-nest-confirm-btn').click(removeUserHandler);