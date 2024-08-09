import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';
import { updatePagination } from './pagination.js';


document.addEventListener('DOMContentLoaded', function () {

	const productContent = document.querySelector(".content-data")
	const seeProducts = document.querySelector("#see-products")
	const addProducts = document.querySelector("#add-products")

	seeProducts.addEventListener("click", seeProductsMenu)
	addProducts.addEventListener("click", addProductsMenu)

	const itemsPerPage = 5; // Número de oficinas por página
	let currentPage = 1; // Página actual
	let dataProducts = []; // Datos de oficinas globales

	async function seeProductsMenu(e) {
		e.preventDefault();
		const respuesta = await getFunction("products");
		dataProducts = respuesta.products;
		const dataGamma = respuesta.gammas;
		productContent.innerHTML = ``;
		// Genera el contenido HTML para los productos
		productContent.innerHTML = /*html*/ `
		<div class="container text-center">
						<div class="row">
							<div class="col text-start">
								<h3>Productos</h3>
							</div>
							<div class="col">
								<div class="input-group mb-3">
									<label class="input-group-text" for="inputGroupSelect01">Gamma</label>
									<select class="form-select form-gamma" id="inputGroupSelect01">
										<option selected>Choose...</option>
									</select>
									<button class="btn btn-outline-success searchGamma" type="button">Filtrar</button>
								</div>
							</div>
							<div class="col text-end">
								<div class="input-group mb-3">
									<label class="input-group-text" for="inputGroupSelect01">Stock minimo</label>
									<input type="text" class="form-control form-stock" aria-label="">
									<button class="btn btn-outline-success searchStock" type="button">Filtrar</button>
								</div>
							</div>
						</div>
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
                                    <select class="form-select" id="gammaProducto" value = "">
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
                        <button type="button" class="btn btn-success"  data-bs-dismiss="modal">Guardar</button>
                        <button type="button" class="btn btn-danger btnEliminar" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Eliminar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
	<div class="modal fade" id="exampleModalToggle2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Confirmar Eliminar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Esta seguro que quiere eliminar la entrada?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-target="#staticBackdrop" data-bs-toggle="modal">Cancelar</button>
        <button type="button" class="btn btn-danger btnConfDel" data-bs-dismiss="modal">Eliminar</button>
      </div>
    </div>
  </div>
</div>
	</section>
`;

		// Rellena la tabla con los productos
		fetchAndDisplayData(); // Inicializa la tabla y la paginación

		// Rellena el select de gamma en el modal		
		let selectForGamma = document.querySelector(".form-gamma");
		dataGamma.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.gammaCode;
			newOption.text = opcion.name;
			selectForGamma.appendChild(newOption);
		});

		let searchGammaButton = document.querySelector(".searchGamma");
		searchGammaButton.addEventListener('click', async () => {
			const productGamma = selectForGamma.value;
			const productForGamma = await getFunction(`products/gamma/${productGamma}`);
			createTable(productForGamma);
		});

		let inputForStock = document.querySelector(".form-stock")
		let searchStockButton = document.querySelector(".searchStock");
		searchStockButton.addEventListener('click', async () => {
			const productStock = inputForStock.value;
			if (isPositiveInteger(productStock)) {
				alert('El stock debe ser un número entero positivo.');
				return;
			}
			const productForStock = await getFunction(`products/stock/${productStock}`);
			createTable(productForStock);
		});

		let select = document.querySelector("#gammaProducto");
		dataGamma.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.gammaCode;
			newOption.text = opcion.name;
			select.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		let detallesBtn = document.querySelector("#detallesBtn");
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const productCode = selectedRadio.closest('th').classList[1];
				const producto = respuesta.products.find(p => p.productCode === productCode);
				if (producto) {
					document.querySelector('#codigoProducto').value = producto.productCode;
					document.querySelector('#codigoProducto').setAttribute('disabled', true);
					document.querySelector('#nombreProducto').value = producto.name;
					document.querySelector('#gammaProducto').value = producto.gamma ? producto.gamma.gammaCode : '';
					document.querySelector('#precioProducto').value = producto.price;
					document.querySelector('#stockProducto').value = producto.stock;
					document.querySelector('#altoProducto').value = producto.height;
					document.querySelector('#anchoProducto').value = producto.width;
					document.querySelector('#espesorProducto').value = producto.depth;
					document.querySelector('#descripcionProducto').value = producto.description;
				}
			} else {
				alert("Por favor, selecciona un producto.");
			}

			document.querySelector('.btn-success').addEventListener('click', async function () {
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
						"stock": parseInt(productStock, 10),
						"price": parseFloat(productPrice),
						"description": productDescription,
						"height": parseFloat(productHeight),
						"width": parseFloat(productWidth),
						"depth": parseFloat(productDepth)
					},
					"gammaCode": productGamma
				};

				await putFunction(productCode, product, "products")
				alert('Producto actualizado con éxito.');
				seeProductsMenu(e);
			});
			
			document.querySelector('.btnConfDel').addEventListener('click', async function () {
				const productCode = document.getElementById('codigoProducto').value;
				try {
					await delFunction(productCode, "products");
					alert('Producto eliminado con éxito.');
				} catch (error) {
					console.error('Error al eliminar el producto:', error);
					alert('No es posible eliminar el producto. Intenta de nuevo más tarde.');
				}
				seeProductsMenu(e);
			});
		});
	}

	async function addProductsMenu(e) {
		e.preventDefault();
		const respuesta = await getFunction("gamma");

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
							<select class="form-select" id="productGamma" value = "">
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

		document.getElementById('saveButton').addEventListener('click', async function () {
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
					"stock": parseInt(productStock, 10),
					"price": parseFloat(productPrice),
					"description": productDescription,
					"height": parseFloat(productHeight),
					"width": parseFloat(productWidth),
					"depth": parseFloat(productDepth)
				},
				"gammaCode": productGamma
			};
			await postFunction(product, "products");
			alert('Producto guardado con éxito.');
			addProductsMenu(e);
		});

	}

	const fetchAndDisplayData = () => {
		createTable(dataProducts);
		updatePagination(dataProducts.length, currentPage, itemsPerPage, (pageNum) => {
			currentPage = pageNum;
			fetchAndDisplayData(); // Volver a cargar los datos con la nueva página
		});
	};

	const createTable = (data) => {
		let tbody = document.querySelector(".tbody");
		tbody.innerHTML = ``;
		
		// Calcular el índice inicial y final de los elementos a mostrar
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = Math.min(startIndex + itemsPerPage, data.length);

		// Añadir las filas correspondientes a la tabla
		for (let i = startIndex; i < endIndex; i++) {
			const opcion = data[i];
			const newRow = document.createElement('tr');

			const th1 = document.createElement('th');
			th1.setAttribute('scope', 'row');
			th1.classList.add('radio', opcion.productCode);

			const radioInput = document.createElement('input');
			radioInput.classList.add('form-check-input');
			radioInput.type = 'radio';
			radioInput.name = 'flexRadioDefault';
			radioInput.id = `flexRadioDefault${i}`;

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
		}
	};
});