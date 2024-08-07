import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';

document.addEventListener('DOMContentLoaded', function () {

	const clientContent = document.querySelector(".content-data")
	const seeClients = document.querySelector("#see-clients")
	const addClients = document.querySelector("#add-clients")

	seeClients.addEventListener("click", seeClientsMenu)
	addClients.addEventListener("click", addClientsMenu)

	async function seeClientsMenu(e) {
		e.preventDefault();
		const dataClients = await getFunction("clients");
		const dataRepSales = await getFunction("clients/employee");
		const dataCities = await getFunction("clients/cities");
		// const dataProducts = respuesta.products;
		// const dataGamma = respuesta.gammas;
		clientContent.innerHTML = ``;
		// Genera el contenido HTML para los productos
		clientContent.innerHTML = /*html*/ `
		<div class="container text-center">
						<div class="row">
							<div class="col text-start">
								<h3>Clientes</h3>
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
                <th scope="row">Apellido</th>
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
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles Cliente</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
                    <div class="modal-body">
                        <form class="row gy-2 gx-3 align-items-center">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <div class="input-group-text">ID Cliente</div>
                                    <input type="text" class="form-control" id="codigoCliente" placeholder="" readonly>
                                </div>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">Nombre Cliente</span>
                                <input type="text" class="form-control" id="nombreCliente" placeholder="">
                            </div>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">Apellido Cliente</span>
                                <input type="text" class="form-control" id="apellidoCliente" placeholder="">
                            </div>
							<div class="col-md-4">
								<div class="input-group">
									<div class="input-group-text">Limite Credito</div>
									<input type="text" class="form-control" id="creditLimit" placeholder="">
								</div>
							</div>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <div class="input-group-text">Representante Ventas</div>
                                    <select class="form-select" id="SalesRep">
                                        <option selected>Choose...</option>
                                    </select>
                                </div>
                            </div>
							<div class="modal-header">
								<h3 class="modal-title fs-5" id="staticBackdropLabel">Direccion Cliente</h3>
							</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Detalle de la Direccion</span>
									<input type="text" class="form-control" id="descripcionDireccion" placeholder="">
								</div>
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">Ciudad</div>
										<select class="form-select" id="ciudad">
											<option selected>Choose...</option>
										</select>
									</div>
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

		// Rellena la tabla con los productos
		createTable(dataClients);

		// Rellena el select de gamma en el modal		
		// let selectForGamma = document.querySelector(".form-gamma");
		// dataGamma.forEach(opcion => {
		// 	const newOption = document.createElement('option');
		// 	newOption.value = opcion.gammaCode;
		// 	newOption.text = opcion.name;
		// 	selectForGamma.appendChild(newOption);
		// });

		// let searchGammaButton = document.querySelector(".searchGamma");
		// searchGammaButton.addEventListener('click',async() =>{			
		// 	const productGamma = selectForGamma.value;
		// 	const productForGamma = await getFunction(`products/gamma/${productGamma}`);
		// 	createTable(productForGamma);
		// });

		// let inputForStock = document.querySelector(".form-stock")
		// let searchStockButton = document.querySelector(".searchStock");
		// searchStockButton.addEventListener('click',async() =>{			
		// 	const productStock = inputForStock.value;
		// 	if (isPositiveInteger(productStock)) {
		// 		alert('El stock debe ser un número entero positivo.');
		// 		return;
		// 	}
		// 	const productForStock = await getFunction(`products/stock/${productStock}`);
		// 	createTable(productForStock);
		// });

		let selectSalesRep = document.querySelector("#SalesRep");
		dataRepSales.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastName;
			selectSalesRep.appendChild(newOption);
		});

		let selectCiudad = document.querySelector("#ciudad");
		dataCities.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectCiudad.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		let detallesBtn = document.querySelector("#detallesBtn");
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const clientCode = parseInt(selectedRadio.closest('th').classList[1]);
				const cliente = dataClients.find(p => p.id === clientCode);
				if (cliente) {
					document.querySelector('#codigoCliente').value = cliente.id;
					document.querySelector('#codigoCliente').setAttribute('disabled', true);
					document.querySelector('#nombreCliente').value = cliente.name;
					document.querySelector('#apellidoCliente').value = cliente.lastname;
					document.querySelector('#creditLimit').value = cliente.creditLimit;
					document.querySelector('#SalesRep').value = cliente.salesRep.id;
					document.querySelector('#descripcionDireccion').value = cliente.address.description;
					document.querySelector('#descripcionDireccion').setAttribute('disabled', true);
					document.querySelector('#ciudad').value = cliente.address.city.id;
					document.querySelector('#ciudad').setAttribute('disabled', true);
				}
			} else {
				alert("Por favor, selecciona un cliente.");
			}

			document.querySelector('.btn-success').addEventListener('click', function () {
				// Obtener valores de los campos
				const clientCode = document.getElementById('codigoCliente').value;
				const clientName = document.getElementById('nombreCliente').value;
				const clientLastName = document.getElementById('apellidoCliente').value;
				const clientCreditLimit = document.getElementById('creditLimit').value;
				const clientSalesRep = document.getElementById('SalesRep').value;
				const clientAddresDescription = document.getElementById('descripcionDireccion').value;
				const clientCity = document.getElementById('ciudad').value;

				// Validar campos
				if (isEmpty(clientName) || isEmpty(clientCreditLimit)) {
					alert('Todos los campos deben ser completados.');
					return;
				}

				// Validar tipos de datos

				if (isPositiveNumber(clientCreditLimit)) {
					alert('El precio debe ser un número positivo.');
					return;
				}
				const client = {
					client: {
						id: parseInt(clientCode), // Asegúrate de que el id sea un número
						name: clientName,
						lastname: clientLastName,
						creditLimit: parseFloat(clientCreditLimit),
						salesRep: { id: parseInt(clientSalesRep) },
						address: {
							description: clientAddresDescription,
							cityId: parseInt(clientCity)
						}
					},
					AddressDesc: clientAddresDescription,
					cityId: parseInt(clientCity),
					salesRepId: parseInt(clientSalesRep)
				};

				putFunction(parseInt(clientCode), client, "clients")
				alert('Producto actualizado con éxito.');
			});

			document.querySelector('.btn-danger').addEventListener('click', function () {
				const clientCode = document.getElementById('codigoCliente').value;
				delFunction(clientCode, "clients");
				alert('Producto eliminado con éxito.');
			});
		});
	}

	async function addClientsMenu(e) {
		e.preventDefault();
		const dataRepSales = await getFunction("clients/employee");
		const dataCities = await getFunction("clients/cities");

		clientContent.innerHTML = /*html*/ `
			<div class="head">
				<h3>Agregar Clientes</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
			<div class="col-md-6">
				<div class="input-group">
					<div class="input-group-text">ID Cliente</div>
					<input type="text" class="form-control" id="codigoCliente" placeholder="">
				</div>
			</div>
			<div class="input-group">
				<span class="input-group-text" id="basic-addon1">Nombre Cliente</span>
				<input type="text" class="form-control" id="nombreCliente" placeholder="">
			</div>
			<div class="input-group">
				<span class="input-group-text" id="basic-addon1">Apellido Cliente</span>
				<input type="text" class="form-control" id="apellidoCliente" placeholder="">
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<div class="input-group-text">Limite Credito</div>
					<input type="text" class="form-control" id="creditLimit" placeholder="">
				</div>
			</div>
			<div class="col-md-8">
				<div class="input-group">
					<div class="input-group-text">Representante Ventas</div>
					<select class="form-select" id="SalesRep">
						<option selected>Choose...</option>
					</select>
				</div>
			</div>
			<div class="modal-header">
				<h3 class="modal-title fs-5" id="staticBackdropLabel">Direccion Cliente</h3>
			</div>
				<div class="input-group">
					<span class="input-group-text" id="basic-addon1">Detalle de la Direccion</span>
					<input type="text" class="form-control" id="descripcionDireccion" placeholder="">
				</div>
				<div class="col-md-6">
					<div class="input-group">
						<div class="input-group-text">Ciudad</div>
						<select class="form-select" id="ciudad">
							<option selected>Choose...</option>
						</select>
					</div>
				</div>
		</form>
			<br>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button class="btn btn-success me-md-2" type="button" id="saveButton">Guardar</button>
			</div>
		`;

		let selectSalesRep = document.querySelector("#SalesRep");
		dataRepSales.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastName;
			selectSalesRep.appendChild(newOption);
		});

		let selectCiudad = document.querySelector("#ciudad");
		dataCities.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectCiudad.appendChild(newOption);
		});

		document.getElementById('saveButton').addEventListener('click', function () {
			// Obtener valores de los campos
			const clientCode = document.getElementById('codigoCliente').value;
			const clientName = document.getElementById('nombreCliente').value;
			const clientLastName = document.getElementById('apellidoCliente').value;
			const clientCreditLimit = document.getElementById('creditLimit').value;
			const clientSalesRep = document.getElementById('SalesRep').value;
			const clientAddresDescription = document.getElementById('descripcionDireccion').value;
			const clientCity = document.getElementById('ciudad').value;

			// Validar campos
			if (isEmpty(clientCode) || isEmpty(clientName) || isEmpty(clientCreditLimit)) {
				alert('Todos los campos deben ser completados.');
				return;
			}

			// Validar tipos de datos
			if (isPositiveInteger(clientCode)) {
				alert('El stock debe ser un número entero positivo.');
				return;
			}
			
			if (isPositiveNumber(clientCreditLimit)) {
				alert('El precio debe ser un número positivo.');
				return;
			}
			const client = {
				client: {
					id: 0, // Este campo es para el servidor, normalmente se inicializa como 0
					name: clientName,
					lastname: clientLastName,
					creditLimit: clientCreditLimit,
					salesRep: {
						id: clientSalesRep
					},
					address: {
						description: clientAddresDescription,
						cityId: clientCity
					},
					payment: [], // Opcional, dependiendo de si tienes pagos asociados
					orders: []   // Opcional, dependiendo de si tienes órdenes asociadas
				},
				addressDesc: clientAddresDescription,
				cityId: clientCity,
				salesRepId: clientSalesRep
			};
			console.log(client);
			
			postFunction(client, "clients");
			alert('Producto guardado con éxito.');
		});

	}

	const createTable = (data) => {
		let tbody = document.querySelector(".tbody");
		tbody.innerHTML = ``;
		data.forEach((opcion, index) => {
			const newRow = document.createElement('tr');

			const th1 = document.createElement('th');
			th1.setAttribute('scope', 'row');
			th1.classList.add('radio', opcion.id);

			const radioInput = document.createElement('input');
			radioInput.classList.add('form-check-input');
			radioInput.type = 'radio';
			radioInput.name = 'flexRadioDefault';
			radioInput.id = `flexRadioDefault${index}`;

			th1.appendChild(radioInput);
			newRow.appendChild(th1);

			const td1 = document.createElement('td');
			td1.textContent = opcion.id;
			newRow.appendChild(td1);

			const td2 = document.createElement('td');
			td2.textContent = opcion.name;
			newRow.appendChild(td2);

			const td3 = document.createElement('td');
			td3.textContent = opcion.lastname;
			newRow.appendChild(td3);

			tbody.appendChild(newRow);
		});
	}
});