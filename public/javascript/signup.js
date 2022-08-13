//-------FUNCTIONS---------
async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("wooo")

    const username = $('#username').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    const first_name = $('#first-name').val().trim();
    const last_name = $('#last-name').val().trim();
    const share_id = $('#share-id').val().trim();

    console.log(username)

    if (username && email && password && first_name && last_name) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                first_name,
                last_name
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //if user creation failed, throw error and stop
        if (!response.ok) {
            alert(response.statusText);
                console.log(response);
                return;
        }

        //get user Id from response
        const result = await response.json()
        const user_id = result.id;
        console.log("user ID: ", user_id)

        //if share_id was provided, look up nest by share ID
        if (share_id) {
            const nestLookup = await fetch(`/api/nests/share/${share_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            });
    
            //if nestlookup failed, throw error and stop
            if(!nestLookup.ok){
                alert(nestLookup.statusText);
                console.log(nestLookup);
                return;
            }
    
            //get nest_id from response
            const nestResult = await nestLookup.json();
            const nest_id = nestResult.id;
    
            //call the API route to add user to nest
            const nestAddResponse = await fetch('/api/nests/add-user/', {
                method: 'PUT',
                body: JSON.stringify({
                    nest_id,
                    user_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            //if nestAdd fails, throw error and stop
            if (!nestAddResponse.ok){
                alert(nestAddResponse.statusText);
                console.log(nestAddResponse);
                return;
            }

            console.log(await nestAddResponse.json());

            document.location.replace('/mynest');
        }
    }

}


//--------EVENT LISTENERS----------
$('#submit-btn').click(handleFormSubmit);