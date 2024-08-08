import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';

document.addEventListener('DOMContentLoaded', function () {

	const employeeContent = document.querySelector(".content-data")
	const seeEmployee = document.querySelector("#see-employee")
	const addEmployee = document.querySelector("#add-employee")

	seeEmployee.addEventListener("click", seeEmployeeMenu)
	addEmployee.addEventListener("click", addEmployeeMenu)

	async function seeEmployeeMenu(e) {
		e.preventDefault();
		const data = await getFunction("employee");
		const dataOffices = data.offices;
		const dataPositions = data.positions;
		const dataEmployees = data.employees;
		// const dataProducts = respuesta.products;
		// const dataGamma = respuesta.gammas;
		employeeContent.innerHTML = ``;
		// Genera el contenido HTML para los productos
		employeeContent.innerHTML = /*html*/ `
			<div class="container text-center">
			<div class="row">
				<div class="col text-start">
					<h3>Empleados</h3>
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
						<label class="input-group-text" for="inputGroupSelect01">Id de Oficina</label>
						<input type="text" class="form-control form-officeId" aria-label="">
						<button class="btn btn-outline-success searchOfficeId" type="button">Filtrar</button>
					</div>
				</div>
			</div>
		</div>
		<table class="table table-bordered border border-3">
			<thead>
				<tr>
					<th scope="row"></th>
					<th scope="row">ID</th>
					<th scope="row">Nombre Empleado</th>
					<th scope="row">Rol</th>
					<th scope="row">Oficina</th>
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
										<div class="input-group-text">ID Empleado</div>
										<input type="text" class="form-control" id="codigoEmpleado" placeholder=""
											readonly>
									</div>
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Nombre Empleado</span>
									<input type="text" class="form-control" id="nombreEmpleado" placeholder="">
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Apellido Empleado</span>
									<input type="text" class="form-control" id="apellidoEmpleado" placeholder="">
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Correo Electronico</span>
									<input type="email" class="form-control" id="correoEmpleado"
										placeholder="name@example.com">
								</div>
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">Jefe Directo</div>
										<select class="form-select" id="jefeId">
											<option selected>Choose...</option>
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">Cargo</div>
										<select class="form-select" id="positionId">
											<option selected>Choose...</option>
										</select>
									</div>
								</div>
									<div class="input-group">
										<div class="input-group-text">Oficina</div>
										<select class="form-select" id="OfficeId">
											<option selected>Choose...</option>
										</select>
									</div>

							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-success">Guardar</button>
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
	</div>
	</div>
	</main>
	<!-- MAIN -->
	</section>
	`;

		// Rellena la tabla con los productos
		createTable(dataEmployees);

		// Rellena el select de gamma en el modal	
		// let selectForPayType = document.querySelector(".form-officeId");
		// dataTypePayments.forEach(opcion => {
		// 	const newOption = document.createElement('option');
		// 	newOption.value = opcion.id;
		// 	newOption.text = opcion.name;
		// 	selectForPayType.appendChild(newOption);
		// });

		// let searchPayTypeButton = document.querySelector(".searchPayType");
		// searchPayTypeButton.addEventListener('click', async () => {
		// 	const payType = selectForPayType.value;
		// 	const payTypeForId = await getFunction(`payment/payType/${payType}`);
		// 	createTable(payTypeForId);
		// });

		let inputForOfficeId = document.querySelector(".form-officeId")
		let searchOfficeIdButton = document.querySelector(".searchOfficeId");
		searchOfficeIdButton.addEventListener('click', async () => {
			const officeId = inputForOfficeId.value;
			if (isPositiveInteger(officeId)) {
				alert('El Id del cliente debe ser un número entero positivo.');
				return;
			}
			const employeeForOfficeId = await getFunction(`employee/employeesoffice/${officeId}`);
			createTable(employeeForOfficeId);
		});

		let selectModalForBoss = document.querySelector("#jefeId");
		dataEmployees.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastName;
			selectModalForBoss.appendChild(newOption);
		});
		let selectModalForOffice = document.querySelector("#OfficeId");
		dataOffices.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.addres;
			selectModalForOffice.appendChild(newOption);
		});

		let selectModalForPosition = document.querySelector("#positionId");
		dataPositions.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForPosition.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		let detallesBtn = document.querySelector("#detallesBtn");
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const codigoEmpleado = parseInt(selectedRadio.closest('th').classList[1]);
				const empleado = dataEmployees.find(p => p.id === codigoEmpleado);
				if (empleado) {
					document.querySelector('#codigoEmpleado').value = empleado.id;
					document.querySelector('#codigoEmpleado').setAttribute('disabled', true);
					document.querySelector('#nombreEmpleado').value = empleado.name;
					document.querySelector('#apellidoEmpleado').value = empleado.lastName;
					document.querySelector('#correoEmpleado').value = empleado.email;
					document.querySelector('#jefeId').value = empleado.boss.id;
					document.querySelector('#positionId').value = empleado.position.id;
					document.querySelector('#OfficeId').value = empleado.office.id;
				}
			} else {
				alert("Por favor, selecciona un cliente.");
			}

			document.querySelector('.btn-success').addEventListener('click', function () {
				// Obtener valores de los campos
				const codigoEmpleado = document.querySelector('#codigoEmpleado').value;
				const nombreEmpleado = document.querySelector('#nombreEmpleado').value;
				const apellidoEmpleado = document.querySelector('#apellidoEmpleado').value;
				const correoEmpleado = document.querySelector('#correoEmpleado').value;
				const jefeId = document.querySelector('#jefeId').value;
				const positionId = document.querySelector('#positionId').value;
				const officeId = document.querySelector('#OfficeId').value;

				// Validar campos
				if (isEmpty(nombreEmpleado) || isEmpty(correoEmpleado) || isEmpty(jefeId) || isEmpty(positionId) || isEmpty(officeId)) {
					alert('Todos los campos deben ser completados.');
					return;
				}

				// // Validar tipos de datos
				// if (isPositiveNumber(total)) {
				// 	alert('El precio debe ser un número positivo.');
				// 	return;
				// }

				const employeeUpdateDTO = {
					updatedEmployee: {
						id: parseInt(codigoEmpleado, 10),
						name: nombreEmpleado,
						lastName: apellidoEmpleado,
						email: correoEmpleado,
						boss: { id: parseInt(jefeId, 10) },
						office: { id: parseInt(officeId, 10) },
						position: { id: parseInt(positionId, 10) }
					},
					idBoss: parseInt(jefeId, 10),
					idPosition: parseInt(positionId, 10),
					idOffice: parseInt(officeId, 10)
				};
				putFunction(parseInt(codigoEmpleado), employeeUpdateDTO, "employee")
				alert('Producto actualizado con éxito.');
			});

			document.querySelector('.btnConfDel').addEventListener('click', async function () {
				const codigoEmpleado = document.getElementById('codigoEmpleado').value;
				try {
					await delFunction(codigoEmpleado, "employee");
					alert('Producto eliminado con éxito.');
				} catch (error) {
					alert('No es posible eliminar');
				}
			});
		});
	}

	async function addEmployeeMenu(e) {
		e.preventDefault();
		const data = await getFunction("employee");
		const dataOffices = data.offices;
		const dataPositions = data.positions;
		const dataEmployees = data.employees;

		employeeContent.innerHTML = /*html*/ `
			<div class="head">
				<h3>Agregar Empleados</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">ID Empleado</div>
										<input type="text" class="form-control" id="codigoEmpleado" placeholder="">
									</div>
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Nombre Empleado</span>
									<input type="text" class="form-control" id="nombreEmpleado" placeholder="">
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Apellido Empleado</span>
									<input type="text" class="form-control" id="apellidoEmpleado" placeholder="">
								</div>
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Correo Electronico</span>
									<input type="email" class="form-control" id="correoEmpleado"
										placeholder="name@example.com">
								</div>
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">Jefe Directo</div>
										<select class="form-select" id="jefeId">
											<option selected>Choose...</option>
										</select>
									</div>
								</div>
								<div class="col-md-6">
									<div class="input-group">
										<div class="input-group-text">Cargo</div>
										<select class="form-select" id="positionId">
											<option selected>Choose...</option>
										</select>
									</div>
								</div>
									<div class="input-group">
										<div class="input-group-text">Oficina</div>
										<select class="form-select" id="OfficeId">
											<option selected>Choose...</option>
										</select>
									</div>

							</form>
			<br>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button class="btn btn-success me-md-2" type="button" id="saveButton">Guardar</button>
			</div>
		`;

		let selectModalForBoss = document.querySelector("#jefeId");
		dataEmployees.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name + ' ' + opcion.lastName;
			selectModalForBoss.appendChild(newOption);
		});
		let selectModalForOffice = document.querySelector("#OfficeId");
		dataOffices.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.addres;
			selectModalForOffice.appendChild(newOption);
		});

		let selectModalForPosition = document.querySelector("#positionId");
		dataPositions.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForPosition.appendChild(newOption);
		});

		document.getElementById('saveButton').addEventListener('click', function () {
			// Obtener valores de los campos
			const codigoEmpleado = document.querySelector('#codigoEmpleado').value;
			const nombreEmpleado = document.querySelector('#nombreEmpleado').value;
			const apellidoEmpleado = document.querySelector('#apellidoEmpleado').value;
			const correoEmpleado = document.querySelector('#correoEmpleado').value;
			const jefeId = document.querySelector('#jefeId').value;
			const positionId = document.querySelector('#positionId').value;
			const officeId = document.querySelector('#OfficeId').value;

			// Validar campos
			if (isEmpty(nombreEmpleado) ||isEmpty(codigoEmpleado) || isEmpty(jefeId) || isEmpty(positionId) || isEmpty(officeId)) {
				alert('Todos los campos deben ser completados.');
				return;
			}

			// Validar tipos de datos
			if (isPositiveInteger(codigoEmpleado)) {
				alert('El ID Empleado debe ser un número positivo.');
				return;
			}

			const employeeUpdateDTO = {
				updatedEmployee: {
					 id: parseInt(codigoEmpleado, 10), // Asumimos que el ID es generado por el servidor, por lo que se inicializa en 0
					 name: nombreEmpleado,
					 lastName: apellidoEmpleado,
					 email: correoEmpleado,
					 boss: { id: parseInt(jefeId, 10) }, // Solo se necesita el ID del jefe
					 office: { id: parseInt(officeId, 10) }, // Solo se necesita el ID de la oficina
					 position: { id: parseInt(positionId, 10) } // Solo se necesita el ID de la posición
				},
				idBoss: parseInt(jefeId, 10),
				idPosition: parseInt(positionId, 10),
				idOffice: parseInt(officeId, 10)
		  };

			postFunction(employeeUpdateDTO, "employee");
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
			td2.textContent = opcion.name + ' ' + opcion.lastName;
			newRow.appendChild(td2);

			const td3 = document.createElement('td');
			td3.textContent = opcion.position.name;
			newRow.appendChild(td3);

			const td4 = document.createElement('td');
			td4.textContent = opcion.office.addres;
			newRow.appendChild(td4);

			tbody.appendChild(newRow);
		});
	}
});