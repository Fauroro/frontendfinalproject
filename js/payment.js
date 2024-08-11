import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';
import { updatePagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', function () {

	const paymentContent = document.querySelector(".content-data")
	const seePayment = document.querySelector("#see-payment")
	const addPayment = document.querySelector("#add-payment")

	seePayment.addEventListener("click", seePaymentMenu)
	addPayment.addEventListener("click", addPaymentMenu)

	const itemsPerPage = 5; // Número de elementos por página
	let currentPage = 1; // Página actual
	let dataPayments = [];

	async function seePaymentMenu(e) {
		e.preventDefault();
		dataPayments = await getFunction("payment");
		const dataTypePayments = await getFunction("payment/payType");
		const dataClients = await getFunction("clients");
		// const dataProducts = respuesta.products;
		// const dataGamma = respuesta.gammas;
		paymentContent.innerHTML = ``;
		// Genera el contenido HTML para los productos
		paymentContent.innerHTML = /*html*/ `
		<div class="container text-center">
		<div class="row">
			<div class="col text-start">
				<h3>Pagos</h3>
			</div>
			<div class="col-md-4">
				<div class="input-group mb-4">
					<label class="input-group-text" for="inputGroupSelect01">Metodo de Pago</label>
					<select class="form-select form-payType" id="inputGroupSelect01">
						<option selected>Choose...</option>
					</select>
					<button class="btn btn-outline-success searchPayType" type="button">Filtrar</button>
				</div>
			</div>
			<div class="col text-end">
			<div class="input-group mb-3">
				<label class="input-group-text" for="inputGroupSelect01">Id Cliente</label>
				<input type="text" class="form-control form-ClientID" aria-label="">
				<button class="btn btn-outline-success searchClientID" type="button">Filtrar</button>
			</div>
		</div>
		</div>
	</div>
	<table class="table table-bordered border border-3">
		<thead>
			<tr>
				<th scope="row"></th>
				<th scope="row">ID</th>
				<th scope="row">Nombre Cliente</th>
				<th scope="row">Fecha Pago</th>
			</tr>
		</thead>
		<tbody class="tbody">
		</tbody>
	</table>
	<div class="d-grid gap-2 d-md-flex justify-content-md-end">
		<button type="button" class="btn btn-info me-md-2" id="detallesBtn" data-bs-toggle="modal"
			data-bs-target="#staticBackdrop">
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
		<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
			tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles Pago</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="row gy-2 gx-3 align-items-center">
							<div class="col-md-6">
								<div class="input-group">
									<div class="input-group-text">ID Pago</div>
									<input type="text" class="form-control" id="codigoPago" placeholder=""
										readonly>
								</div>
							</div>
							<div class="input-group">
								<span class="input-group-text" id="basic-addon1">Fecha Pago</span>
								<input type="date" class="form-control" id="fechaPago" placeholder="">
							</div>
							<div class="input-group">
								<div class="input-group-text">Nombre Cliente</div>
								<select class="form-select" id="clientCode" value = "">
									<option selected>Choose...</option>
								</select>
							</div>

							<div class="col-md-4">
								<div class="input-group">
									<div class="input-group-text">Total Pagado</div>
									<input type="text" class="form-control" id="total" placeholder="">
								</div>
							</div>
							<div class="col-md-8">
								<div class="input-group">
									<div class="input-group-text">Metodo de Pago</div>
									<select class="form-select" id="paymentType" value = "">
										<option selected>Choose...</option>
									</select>
								</div>
							</div>
							
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" data-bs-dismiss="modal">Guardar</button>
						<button type="button" class="btn btn-danger btnEliminar"
							data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Eliminar</button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModalToggle2" data-bs-backdrop="static" data-bs-keyboard="false"
			tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Confirmar Eliminar</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Esta seguro que quiere eliminar la entrada?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-target="#staticBackdrop"
							data-bs-toggle="modal">Cancelar</button>
						<button type="button" class="btn btn-danger btnConfDel"
							data-bs-dismiss="modal">Eliminar</button>
					</div>
				</div>
			</div>
		</div>
	</section>
`;

		// Rellena la tabla con los productos
		fetchAndDisplayData(); // Inicializa la tabla y la paginación

		// Rellena el select de gamma en el modal	
		let selectForPayType = document.querySelector(".form-payType");
		dataTypePayments.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectForPayType.appendChild(newOption);
		});

		let searchPayTypeButton = document.querySelector(".searchPayType");
		searchPayTypeButton.addEventListener('click', async () => {
			const payType = selectForPayType.value;
			const payTypeForId = await getFunction(`payment/payType/${payType}`);
			createTable(payTypeForId);
		});

		let inputForClientID = document.querySelector(".form-ClientID")
		let searchClientIDButton = document.querySelector(".searchClientID");
		searchClientIDButton.addEventListener('click', async () => {
			const clientID = inputForClientID.value;
			if (isPositiveInteger(clientID)) {
				alert('El Id del cliente debe ser un número entero positivo.');
				return;
			}
			const paymentForClientID = await getFunction(`payment/client/${clientID}`);
			createTable(paymentForClientID);
		});

		let selectModalForPayType = document.querySelector("#paymentType");
		dataTypePayments.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForPayType.appendChild(newOption);
		});

		let selectModalForClient = document.querySelector("#clientCode");
		dataClients.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastname;
			selectModalForClient.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		let detallesBtn = document.querySelector("#detallesBtn");
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const codigoPago = parseInt(selectedRadio.closest('th').classList[1]);
				const pago = dataPayments.find(p => p.id === codigoPago);
				if (pago) {
					document.querySelector('#codigoPago').value = pago.id;
					document.querySelector('#codigoPago').setAttribute('disabled', true);
					document.querySelector('#fechaPago').value = pago.payDate;
					document.querySelector('#clientCode').value = pago.client ? pago.client.id : '';
					document.querySelector('#clientCode').setAttribute('disabled', true);
					document.querySelector('#total').value = pago.total;
					document.querySelector('#paymentType').value = pago.paymentType ? pago.paymentType.id : '';
				}
			} else {
				alert("Por favor, selecciona un cliente.");
			}

			document.querySelector('.btn-success').addEventListener('click', async function () {
				// Obtener valores de los campos
				const codigoPago = document.getElementById('codigoPago').value;
				const fechaPago = document.getElementById('fechaPago').value;
				const clientCode = document.getElementById('clientCode').value;
				const total = document.getElementById('total').value;
				const paymentType = document.getElementById('paymentType').value;

				// Validar campos
				if (isEmpty(total) || isEmpty(paymentType) || isEmpty(fechaPago)) {
					alert('Todos los campos deben ser completados.');
					return;
				}

				// Validar tipos de datos
				if (isPositiveNumber(total)) {
					alert('El precio debe ser un número positivo.');
					return;
				}

				const paymentDTO = {
					payment: {
						id: parseInt(codigoPago, 10),
						payDate: fechaPago,
						total: parseFloat(total),
						client: { id: clientCode },
						paymentType: { id: parseInt(paymentType, 10) } // Suponiendo que solo necesitas el ID del tipo de pago
					},
					clientId: clientCode,
					payTypeId: parseInt(paymentType, 10)
				};
				await putFunction(parseInt(clientCode), paymentDTO, "payment")
				alert('Pago actualizado con éxito.');
				seePaymentMenu(e);
			});
			
			document.querySelector('.btnConfDel').addEventListener('click', async function () {
				const codigoPago = document.getElementById('codigoPago').value;
				try {
					await delFunction(codigoPago, "payment/payments");
					alert('Pago eliminado con éxito.');
				} catch (error) {
					console.error('Error al eliminar el Pago:', error);
					alert('No es posible eliminar el Pago. Intenta de nuevo más tarde.');				
				}
				seePaymentMenu(e);
			});
		});
	}

	async function addPaymentMenu(e) {
		e.preventDefault();
		const dataTypePayments = await getFunction("payment/payType");
		const dataClients = await getFunction("clients");

		paymentContent.innerHTML = /*html*/ `
			<div class="head">
				<h3>Agregar Pagos</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon1">Fecha Pago</span>
								<input type="date" class="form-control" id="fechaPago" placeholder="">
							</div>
							<div class="input-group">
								<div class="input-group-text">Nombre Cliente</div>
								<select class="form-select" id="clientCode" value = "">
									<option selected>Choose...</option>
								</select>
							</div>

							<div class="col-md-4">
								<div class="input-group">
									<div class="input-group-text">Total Pagado</div>
									<input type="text" class="form-control" id="total" placeholder="">
								</div>
							</div>
							<div class="col-md-8">
								<div class="input-group">
									<div class="input-group-text">Metodo de Pago</div>
									<select class="form-select" id="paymentType" value = "">
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


		let selectModalForPayType = document.querySelector("#paymentType");
		dataTypePayments.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForPayType.appendChild(newOption);
		});

		let selectModalForClient = document.querySelector("#clientCode");
		dataClients.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastname;
			selectModalForClient.appendChild(newOption);
		});

		document.getElementById('saveButton').addEventListener('click', async function () {
			// Obtener valores de los campos
			const fechaPago = document.getElementById('fechaPago').value;
			const clientCode = document.getElementById('clientCode').value;
			const total = document.getElementById('total').value;
			const paymentType = document.getElementById('paymentType').value;

			// Validar campos
			if (isEmpty(total) || isEmpty(paymentType) || isEmpty(fechaPago)) {
				alert('Todos los campos deben ser completados.');
				return;
			}

			// Validar tipos de datos
			if (isPositiveNumber(total)) {
				alert('El precio debe ser un número positivo.');
				return;
			}

			const paymentDTO = {
				payment: {
					payDate: fechaPago,
					total: parseFloat(total),
					client: { id: clientCode },
					paymentType: { id: parseInt(paymentType, 10) } // Suponiendo que solo necesitas el ID del tipo de pago
				},
				clientId: clientCode,
				payTypeId: parseInt(paymentType, 10)
			};

			await postFunction(paymentDTO, "payment");
			alert('Pago guardado con éxito.');
			addPaymentMenu(e);
		});

	}

	const fetchAndDisplayData = () => {
		createTable(dataPayments);
		updatePagination(dataPayments.length, currentPage, itemsPerPage, (pageNum) => {
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
			td2.textContent = opcion.client.name + ' ' + opcion.client.lastname;
			newRow.appendChild(td2);

			const td3 = document.createElement('td');
			td3.textContent = opcion.payDate;
			newRow.appendChild(td3);

			tbody.appendChild(newRow);
		};
	}
});