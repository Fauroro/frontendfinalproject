document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })
    });

    if (response.ok) {
        const token = response.headers.get('Authorization').replace('Bearer ', '');
        localStorage.setItem('token', token);
        alert('Login successful');
    } else {
        alert('Login failed');
    }
});
