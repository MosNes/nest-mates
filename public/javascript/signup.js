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

        console.log(response);

        if (response.ok && share_id) {

            const user_id = response.json().id;

            const nestQueryResponse = await fetch(`/api/nests/share/${share_id}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

            if (nestQueryResponse.ok) {
                const nest_id = nestQueryResponse.json().id;

                const addUserResponse = await fetch('/api/nests/add-user/', {
                    method: 'PUT',
                    body: JSON.stringify({
                        user_id,
                        nest_id
                    }),
                    headers: {'Content-Type': 'application/json'}
                });

                if (addUserResponse.ok) {
                    document.replace('/')
                } else {
                    alert(addUserResponse.statusText);
                    console.log(addUserResponse);
                }

            } else {
                alert(nestQueryResponse.statusText);
                console.log(nestQueryResponse);
            }

        } else if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText);
            console.log(response);
        }
    }

}


//--------EVENT LISTENERS----------
$('#submit-btn').click(handleFormSubmit);