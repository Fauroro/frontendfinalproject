import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';


document.addEventListener('DOMContentLoaded', function () {


	const productContent = document.querySelector(".content-data")
	const seeProducts = document.querySelector("#see-products")
	const addProducts = document.querySelector("#add-products")

	seeProducts.addEventListener("click", seeProductsMenu)
	addProducts.addEventListener("click", addProductsMenu)


	async function seeProductsMenu(e) {
		e.preventDefault();

		const respuesta = await getProduct();
		console.log(respuesta);


		// Genera el contenido HTML para los productos
		productContent.innerHTML = /*html*/ `
    <div class="head">
        <h3>Productos</h3>
    </div>
    <table class="table table-bordered border border-3">
        <thead>
            <tr>
                <th scope="row"></th>
                <th scope="row">ID</th>
                <th scope="row">Nombre</th>
                <th scope="row">Gamma</th>
            </tr>
        </thead>
        <tbody class="tbody">
        </tbody>
    </table>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
		  <button type="button" class="btn btn-info me-md-2" id="detallesBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Detalles
    </button>
    </div>
    <br>
    <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm justify-content-center">
            <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
    <section id="modal">
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row gy-2 gx-3 align-items-center">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <div class="input-group-text">Codigo Producto</div>
                                    <input type="text" class="form-control" id="codigoProducto" placeholder="" readonly>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">Nombre Producto</span>
                                <input type="text" class="form-control" id="nombreProducto" placeholder="">
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <div class="input-group-text">Gamma Producto</div>
                                    <select class="form-select" id="gammaProducto">
                                        <option selected>Choose...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <div class="input-group-text">Precio Producto</div>
                                    <input type="text" class="form-control" id="precioProducto" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <div class="input-group-text">Stock</div>
                                    <input type="text" class="form-control" id="stockProducto" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <div class="input-group-text">Alto mm</div>
                                    <input type="text" class="form-control" id="altoProducto" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <div class="input-group-text">Ancho mm</div>
                                    <input type="text" class="form-control" id="anchoProducto" placeholder="">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <div class="input-group-text">Espesor mm</div>
                                    <input type="text" class="form-control" id="espesorProducto" placeholder="">
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text">Descripcion</span>
                                <textarea class="form-control" id="descripcionProducto" aria-label="With textarea"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success">Guardar</button>
                        <button type="button" class="btn btn-danger">Eliminar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

		// Referencia a la tabla body y al botón de detalles
		let tbody = document.querySelector(".tbody");
		let detallesBtn = document.querySelector("#detallesBtn");

		// Rellena la tabla con los productos
		respuesta.products.forEach((opcion, index) => {
			const newRow = document.createElement('tr');

			const th1 = document.createElement('th');
			th1.setAttribute('scope', 'row');
			th1.classList.add('radio', opcion.productCode);

			const radioInput = document.createElement('input');
			radioInput.classList.add('form-check-input');
			radioInput.type = 'radio';
			radioInput.name = 'flexRadioDefault';
			radioInput.id = `flexRadioDefault${index}`; // id único para cada radio

			th1.appendChild(radioInput);
			newRow.appendChild(th1);

			const td1 = document.createElement('td');
			td1.textContent = opcion.productCode;
			newRow.appendChild(td1);

			const td2 = document.createElement('td');
			td2.textContent = opcion.name;
			newRow.appendChild(td2);

			const td3 = document.createElement('td');
			td3.textContent = opcion.gamma.name;
			newRow.appendChild(td3);

			tbody.appendChild(newRow);
		});

		// Rellena el select de gamma en el modal
		let select = document.querySelector("#gammaProducto");
		respuesta.gammas.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.gammaCode;
			newOption.text = opcion.name;
			select.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const productCode = selectedRadio.closest('th').classList[1]; // Obtiene el productCode de la clase del <th>
				const producto = respuesta.products.find(p => p.productCode === productCode);

				if (producto) {
					document.querySelector('#codigoProducto').value = producto.productCode;
					document.querySelector('#codigoProducto').setAttribute('disabled', true);
					document.querySelector('#nombreProducto').value = producto.name;
					document.querySelector('#gammaProducto').value = producto.gamma.gammaCode; // Rellena el select con el valor correspondiente
					document.querySelector('#precioProducto').value = producto.price;
					document.querySelector('#stockProducto').value = producto.stock;
					document.querySelector('#altoProducto').value = producto.height;
					document.querySelector('#anchoProducto').value = producto.width;
					document.querySelector('#espesorProducto').value = producto.depth;
					document.querySelector('#descripcionProducto').value = producto.description;
				}
			} else {
				// Si no se ha seleccionado ningún producto, podrías mostrar un mensaje de advertencia o manejar el caso de manera apropiada
				alert("Por favor, selecciona un producto.");
			}

			document.querySelector('.btn-success').addEventListener('click', function () {
				// Obtener valores de los campos
				const productCode = document.getElementById('codigoProducto').value;
				const productName = document.getElementById('nombreProducto').value;
				const productGamma = document.getElementById('gammaProducto').value;
				const productStock = document.getElementById('stockProducto').value;
				const productPrice = document.getElementById('precioProducto').value;
				const productHeight = document.getElementById('altoProducto').value;
				const productWidth = document.getElementById('anchoProducto').value;
				const productDepth = document.getElementById('espesorProducto').value;
				const productDescription = document.getElementById('descripcionProducto').value;

				// Validar campos
				if (isEmpty(productName) || isEmpty(productGamma) || isEmpty(productStock) || isEmpty(productPrice)) {
					alert('Todos los campos deben ser completados.');
					return;
				}

				// Validar tipos de datos
				if (isPositiveInteger(productStock)) {
					alert('El stock debe ser un número entero positivo.');
					return;
				}

				if (isPositiveNumber(productPrice)) {
					alert('El precio debe ser un número positivo.');
					return;
				}

				if (!isEmpty(productHeight)) {
					if (isPositiveNumber(productHeight)) {
						alert('La altura debe ser un número positivo.');
						return;
					}
				}

				if (!isEmpty(productWidth)) {
					if (isPositiveNumber(productWidth)) {
						alert('El ancho debe ser un número positivo.');
						return;
					}
				}

				if (!isEmpty(productDepth)) {

					if (isPositiveNumber(productDepth)) {
						alert('El espesor debe ser un número positivo.');
						return;
					}
				}

				const product = {
					"product": {
						"name": productName,
						"stock": parseInt(productStock, 10), // Convertir a entero
						"price": parseFloat(productPrice),   // Convertir a flotante
						"description": productDescription,
						"height": parseFloat(productHeight), // Convertir a flotante
						"width": parseFloat(productWidth),   // Convertir a flotante
						"depth": parseFloat(productDepth)   // Convertir a flotante
					},
					"gammaCode": productGamma
				};

				putProduct(productCode, product)

				alert('Producto actualizado con éxito.');
			});


			document.querySelector('.btn-danger').addEventListener('click', function () {
				const productCode = document.getElementById('codigoProducto').value;

				delProduct(productCode);
				alert('Producto eliminado con éxito.');

			});

		});


	}

	const header = new Headers({
		"Content-Type": "application/json"
	})

	const getProduct = async () => {
		const resultado = await fetch("http://localhost:8080/garden/products", {
			method: "GET",
			headers: header,
		})

		const objJs = await resultado.json();
		// console.log(objJs);
		return objJs

	}

	async function addProductsMenu(e) {
		e.preventDefault();

		const respuesta = await getGamma();
		console.log(respuesta);

		productContent.innerHTML = /*html*/ `
			<div class="head">
				<h3>Agregar Productos</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
				<div class="col-md-6">
						<div class="input-group">
							<div class="input-group-text productCode">Codigo Producto</div>
							<input type="text" class="form-control" id="productCode" placeholder="">
						</div>
				</div>

				<div class="input-group">
						<span class="input-group-text" id="basic-addon1">Nombre Producto</span>
						<input type="text" class="form-control" id="productName" placeholder="" aria-label=""
							aria-describedby="basic-addon1">
				</div>

				<div class="col-md-6">
						<div class="input-group">
							<div class="input-group-text">Gamma Producto</div>
							<select class="form-select" id="productGamma">
								<option selected value="">Choose...</option>
							</select>
						</div>
				</div>
				<div class="col-md-6">
						<div class="input-group">
							<div class="input-group-text">Precio Producto</div>
							<input type="text" class="form-control" id="productPrice" placeholder="">
						</div>
				</div>
				<div class="col-md-3">
						<div class="input-group">
							<div class="input-group-text">Stock</div>
							<input type="text" class="form-control" id="productStock" placeholder="">
						</div>
				</div>
				<div class="col-md-3">
						<div class="input-group">
							<div class="input-group-text">Alto mm</div>
							<input type="text" class="form-control" id="productHeight" placeholder="">
						</div>
				</div>
				<div class="col-md-3">
						<div class="input-group">
							<div class="input-group-text">Ancho mm</div>
							<input type="text" class="form-control" id="productWidth" placeholder="">
						</div>
				</div>
				<div class="col-md-3">
						<div class="input-group">
							<div class="input-group-text">Espesor mm</div>
							<input type="text" class="form-control" id="productDepth" placeholder="">
						</div>
				</div>
				<div class="input-group">
						<span class="input-group-text">Descripcion</span>
						<textarea class="form-control" id="productDescription" aria-label="With textarea"></textarea>
				</div>
			</form>
			<br>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button class="btn btn-success me-md-2" type="button" id="saveButton">Guardar</button>
			</div>
		`;


		let select = document.querySelector("#productGamma");
		respuesta.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.gammaCode;
			newOption.text = opcion.name;
			select.appendChild(newOption);
		});

		document.getElementById('saveButton').addEventListener('click', function () {
			// Obtener valores de los campos
			const productCode = document.getElementById('productCode').value;
			const productName = document.getElementById('productName').value;
			const productGamma = document.getElementById('productGamma').value;
			const productStock = document.getElementById('productStock').value;
			const productPrice = document.getElementById('productPrice').value;
			const productHeight = document.getElementById('productHeight').value;
			const productWidth = document.getElementById('productWidth').value;
			const productDepth = document.getElementById('productDepth').value;
			const productDescription = document.getElementById('productDescription').value;

			// Validar campos
			if (isEmpty(productCode) || isEmpty(productName) || isEmpty(productGamma) || isEmpty(productStock) || isEmpty(productPrice)) {
				alert('Todos los campos deben ser completados.');
				return;
			}

			// Validar tipos de datos
			if (isPositiveInteger(productStock)) {
				alert('El stock debe ser un número entero positivo.');
				return;
			}

			if (isPositiveNumber(productPrice)) {
				alert('El precio debe ser un número positivo.');
				return;
			}

			if (!isEmpty(productHeight)) {
				if (isPositiveNumber(productHeight)) {
					alert('La altura debe ser un número positivo.');
					return;
				}
			}

			if (!isEmpty(productWidth)) {
				if (isPositiveNumber(productWidth)) {
					alert('El ancho debe ser un número positivo.');
					return;
				}
			}

			if (!isEmpty(productDepth)) {

				if (isPositiveNumber(productDepth)) {
					alert('El espesor debe ser un número positivo.');
					return;
				}
			}

			const product = {
				"product": {
					"productCode": productCode,
					"name": productName,
					// "gamma": productGamma,
					"stock": parseInt(productStock, 10), // Convertir a entero
					"price": parseFloat(productPrice),   // Convertir a flotante
					"description": productDescription,
					"height": parseFloat(productHeight), // Convertir a flotante
					"width": parseFloat(productWidth),   // Convertir a flotante
					"depth": parseFloat(productDepth)   // Convertir a flotante
				},
				"gammaCode": productGamma

			};

			postProduct(product);

			alert('Producto guardado con éxito.');
		});

	}

	const getGamma = async () => {
		const resultado = await fetch("http://localhost:8080/garden/gamma", {
			method: "GET",
			headers: header,
		})

		const objJs = await resultado.json();
		// console.log(objJs);
		return objJs

	}

	const postProduct = (datos) => {
		return new Promise((resolve, reject) => {
			fetch("http://localhost:8080/garden/products", {
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

	const putProduct = (id, datos) => {
		return new Promise((resolve, reject) => {
			fetch(`http://localhost:8080/garden/products/${id}`, {
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

	const delProduct = (id) => {
		return new Promise((resolve, reject) => {
			fetch(`http://localhost:8080/garden/products/${id}`, {
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
});