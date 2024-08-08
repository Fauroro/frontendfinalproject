const URL_API = "http://localhost:8080/garden/";

// Función para realizar solicitudes autenticadas
async function makeAuthenticatedRequest(url, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!options.headers) {
        options.headers = new Headers();
    }

    options.headers.set("Content-Type", "application/json");

    if (token) {
        options.headers.set("Authorization", token.trim());
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
}

// Modificación de la función getFunction para usar makeAuthenticatedRequest
const getFunction = async (endpoint) => {
    const url = `${URL_API}${endpoint}`;
    
    const response = await makeAuthenticatedRequest(url, {
        method: "GET"
    });

    const objJs = await response.json();
    return objJs;
};

// Modificación de la función postFunction para usar makeAuthenticatedRequest
const postFunction = async (datos, endpoint) => {
    const url = `${URL_API}${endpoint}`;
    
    const response = await makeAuthenticatedRequest(url, {
        method: "POST",
        body: JSON.stringify(datos)
    });

    const res = await response.json();
    return res.id;
};

// Modificación de la función putFunction para usar makeAuthenticatedRequest
const putFunction = async (id, datos, endpoint) => {
    const url = `${URL_API}${endpoint}/${id}`;
    
    const response = await makeAuthenticatedRequest(url, {
        method: "PUT",
        body: JSON.stringify(datos)
    });

    const res = await response.json();
    return res.id;
};

// Modificación de la función delFunction para usar makeAuthenticatedRequest
const delFunction = async (id, endpoint) => {
    const url = `${URL_API}${endpoint}/${id}`;
    
    const response = await makeAuthenticatedRequest(url, {
        method: "DELETE"
    });

    const res = await response.json();
    return res.id;
};

export { getFunction, postFunction, putFunction, delFunction };
