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

// // Modificación de la función delFunction para usar makeAuthenticatedRequest
// const delFunction = async (id, endpoint) => {
//     const url = `${URL_API}${endpoint}/${id}`;
    
//     const response = await makeAuthenticatedRequest(url, {
//         method: "DELETE"
//     });

//     const res = await response.json();
//     return res.id;
// };
const delFunction = async (id, endpoint) => {
    const url = `${URL_API}${endpoint}/${id}`;
    
    try {
        const response = await makeAuthenticatedRequest(url, {
            method: "DELETE"
        });

        // Verifica el estado de la respuesta
        if (response.status === 204) {
            // La respuesta fue exitosa pero no tiene contenido
            return null;  // O cualquier valor que desees retornar en caso de éxito
        } else if (response.status === 404) {
            // La entidad no se encontró
            throw new Error('Entidad no encontrada');
        } else {
            // Manejo de otros códigos de estado HTTP, si es necesario
            throw new Error(`Error inesperado: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores de la solicitud
        console.error('Error al realizar la solicitud:', error);
        throw error;  // Vuelve a lanzar el error para que pueda ser manejado por quien llame a esta función
    }
};


export { getFunction, postFunction, putFunction, delFunction };
