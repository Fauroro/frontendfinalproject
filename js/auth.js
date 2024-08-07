document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', 'Bearer ' + token); 
            alert('Login successful');
            window.location.href = "/index.html";
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});


async function makeAuthenticatedRequest(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!options.headers) {
        options.headers = {};
    }
    if (token) {
        options.headers['Authorization'] = token; 
    }

    const response = await fetch(url, options);
    return response;
}


