async function loginFormHandler(event) { 
    event.preventDefault();

    //get input from form and trim whitespace
    const identifier = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    //validate input
    if(identifier && password) {
        //make fetch call to api route
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                identifier,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        //check response data
        if (response.ok) {
            //if succesfully logged in, redirect to dashboard
            document.location.replace('/mynest');
        } else {
            //throw error alert
            alert(response.statusText);
            console.log(response);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', loginFormHandler);