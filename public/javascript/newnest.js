//------------HTML ELEMENTS-----------------

//------------FUNCTIONS---------------------

//saves new nest to DB and redirects user to /mynest
async function newNestHandler(event) {
    event.preventDefault();

    //gets user ID from data element on page
    const user_id = parseInt($('#nest-info-form').attr('data-user-id'));

    //gets user input from form
    const nest_name = $('#nest-name').val().trim();
    const street = $('#nest-street').val().trim();
    const city = $('#nest-city').val().trim();
    const state = $('#nest-state').val();
    const zip = $('#nest-zip').val().trim();

    //validate input
    if (nest_name && street && city && state && zip) {
        //call API to create new nest
        const response = await fetch('/api/nests/', {
            method: 'POST',
            body: JSON.stringify({
                nest_name,
                street,
                city,
                state,
                zip
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {

            const nestInfo = await response.json();
            const nest_id = nestInfo.id;

            //call API to add user to newly created nest
            const newResponse = await fetch('/api/nests/add-user/', {
                method: 'PUT',
                body: JSON.stringify({
                    user_id,
                    nest_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (newResponse.ok) {
                document.location.replace('/mynest');
            } else {
                alert(newResponse.statusText);
                console.log(newResponse);
            }

        } else {
            alert(response.statusText);
            console.log(response);
        }
    }

}
//adds user to existing nest and redirects user to /mynest
async function joinNestHandler(event) {
    event.preventDefault();

}

//-----------EVENT LISTENER------------------

$('#new-nest-btn').click(newNestHandler);

$('#join-nest-btn').click(joinNestHandler);
