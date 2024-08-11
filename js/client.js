import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';
import { updatePagination } from './pagination.js';


document.addEventListener('DOMContentLoaded', function () {

	const clientContent = document.querySelector(".content-data")
	const seeClients = document.querySelector("#see-clients")
	const addClients = document.querySelector("#add-clients")

	seeClients.addEventListener("click", seeClientsMenu)
	addClients.addEventListener("click", addClientsMenu)
	
	const itemsPerPage = 5; // Número de elementos por página
	let currentPage = 1; // Página actual
	let dataClients = [];

	async function seeClientsMenu(e) {
		e.preventDefault();
		dataClients = await getFunction("clients");
		const dataRepSales = await getFunction("clients/employee");
		const dataCities = await getFunction("clients/cities");

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
									<label class="input-group-text" for="inputGroupSelect01">Ciudad</label>
									<select class="form-select form-ciudad" id="inputGroupSelect01">
										<option selected value="">Choose...</option>
									</select>
									<button class="btn btn-outline-success searchCity" type="button">Filtrar</button>
								</div>
							</div>
							<div class="col text-end">
								<div class="input-group mb-3">
									<label class="input-group-text" for="inputGroupSelect01">Pedidos en Estado Pendiente</label>
									<button class="btn btn-outline-success searchPending" type="button">Filtrar</button>
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
                                    <select class="form-select" id="SalesRep" value = "">
                                        <option selected value="">Choose...</option>
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
										<select class="form-select" id="ciudad" value = "">
											<option selected value="">Choose...</option>
										</select>
									</div>
								</div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Guardar</button>
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
		let selectForCiudad = document.querySelector(".form-ciudad");
		dataCities.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectForCiudad.appendChild(newOption);
		});	

		let searchCityButton = document.querySelector(".searchCity");
		searchCityButton.addEventListener('click',async() =>{			
			const clientCity = selectForCiudad.value;
			const clientForCity = await getFunction(`clients/city/${clientCity}`);
			createTable(clientForCity);
		});

		let searchPendingButton = document.querySelector(".searchPending");
		searchPendingButton.addEventListener('click',async() =>{			
			const clientForPending = await getFunction(`clients/order/Pending`);
			createTable(clientForPending);
		});

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
					document.querySelector('#SalesRep').value = cliente.salesRep ? cliente.salesRep.id : '';
					document.querySelector('#descripcionDireccion').value = cliente.address.description;
					document.querySelector('#descripcionDireccion').setAttribute('disabled', true);
					document.querySelector('#ciudad').value = cliente.address.city ? cliente.address.city.id : '';
					document.querySelector('#ciudad').setAttribute('disabled', true);
				}
			} else {
				alert("Por favor, selecciona un cliente.");
			}

			document.querySelector('.btn-success').addEventListener('click', async function () {
				// Obtener valores de los campos
				const clientCode = document.getElementById('codigoCliente').value;
				const clientName = document.getElementById('nombreCliente').value;
				const clientLastName = document.getElementById('apellidoCliente').value;
				const clientCreditLimit = document.getElementById('creditLimit').value;
				const clientSalesRep = document.getElementById('SalesRep').value;
				const clientAddresDescription = document.getElementById('descripcionDireccion').value;
				const clientCity = document.getElementById('ciudad').value;

				// Validar campos
				if (isEmpty(clientCode) || isEmpty(clientName) || isEmpty(clientCreditLimit) || isEmpty(clientSalesRep)|| isEmpty(clientAddresDescription)|| isEmpty(clientCity)) {
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

				await putFunction(parseInt(clientCode), client, "clients")
				alert('Cliente actualizado con éxito.');
				seeClientsMenu(e); // Recarga la vista de oficinas
			});
			
			document.querySelector('.btnConfDel').addEventListener('click', async function () {
				const clientCode = document.getElementById('codigoCliente').value;
				try {
					await delFunction(clientCode, "clients");
					alert('Cliente eliminado con éxito.');
				} catch (error) {
					console.error('Error al eliminar el Cliente:', error);
					alert('No es posible eliminar el Cliente. Intenta de nuevo más tarde.');
				}
				seeClientsMenu(e);
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
					<div class="input-group-text"  >Representante Ventas</div> 
					<select class="form-select" id="SalesRep" value = "">
						<option selected value="">Choose...</option>
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
						<select class="form-select" id="ciudad" value = "">
							<option selected value="">Choose...</option>
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

		document.getElementById('saveButton').addEventListener('click',async function () {
			// Obtener valores de los campos
			const clientCode = document.getElementById('codigoCliente').value;
			const clientName = document.getElementById('nombreCliente').value;
			const clientLastName = document.getElementById('apellidoCliente').value;
			const clientCreditLimit = document.getElementById('creditLimit').value;
			const clientSalesRep = document.getElementById('SalesRep').value;
			const clientAddresDescription = document.getElementById('descripcionDireccion').value;
			const clientCity = document.getElementById('ciudad').value;

			// Validar campos
			if (isEmpty(clientCode) || isEmpty(clientName) || isEmpty(clientCreditLimit) || isEmpty(clientSalesRep)|| isEmpty(clientAddresDescription)|| isEmpty(clientCity)) {
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
					id: clientCode, // Este campo es para el servidor, normalmente se inicializa como 0
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
			
			await postFunction(client, "clients");
			alert('Producto guardado con éxito.');
			addClientsMenu(e);
		});

	}

	const fetchAndDisplayData = () => {
		createTable(dataClients);
		updatePagination(dataClients.length, currentPage, itemsPerPage, (pageNum) => {
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
			th1.classList.add('radio', opcion.id);

			const radioInput = document.createElement('input');
			radioInput.classList.add('form-check-input');
			radioInput.type = 'radio';
			radioInput.name = 'flexRadioDefault';
			radioInput.id = `flexRadioDefault${i}`;

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
		};
	}
});