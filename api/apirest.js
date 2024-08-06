
const URL_API = "http://localhost:8080/garden/"
const header = new Headers({
    "Content-Type": "application/json"
})

const getFunction = async (endpoint) => {
    const resultado = await fetch(`${URL_API}${endpoint}`, {
        method: "GET",
        headers: header,
    })

    const objJs = await resultado.json();
    // console.log(objJs);
    return objJs

}

const postFunction = (datos,endpoint) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}${endpoint}`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(datos),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res.id);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const putFunction = (id, datos,endpoint) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}${endpoint}/${id}`, {
            method: "PUT",
            headers: header,
            body: JSON.stringify(datos),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res.id);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const delFunction = (id,endpoint) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}${endpoint}/${id}`, {
            method: "DELETE",
            headers: header,
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res.id);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export {getFunction,postFunction,putFunction,delFunction}