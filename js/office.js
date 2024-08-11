import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';
import { updatePagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', function () {

	const officeContent = document.querySelector(".content-data")
	const seeOffice = document.querySelector("#see-office")
	const addOffice = document.querySelector("#add-office")

	seeOffice.addEventListener("click", seeOfficeMenu)
	addOffice.addEventListener("click", addOfficeMenu)

	const itemsPerPage = 5; // Número de elementos por página
	let currentPage = 1; // Página actual
	let dataOffices = [];

	async function seeOfficeMenu(e) {
		e.preventDefault();
		const data = await getFunction("office");
		dataOffices = data.offices;
		const dataCities = data.cities;

		officeContent.innerHTML = ``;
		// Genera el contenido HTML para los productos
		officeContent.innerHTML = /*html*/ `
		<div class="container text-center">
		<div class="row">
			<div class="col text-start">
				<h3>Oficinas</h3>
			</div>
		</div>
	</div>
	<table class="table table-bordered border border-3">
		<thead>
			<tr>
				<th scope="row"></th>
				<th scope="row">ID</th>
				<th scope="row">Direccion</th>
				<th scope="row">Telefono</th>
				<th scope="row">Ciudad</th>
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
						<h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles Oficina</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="row gy-2 gx-3 align-items-center">
							<div class="col-md-6">
								<div class="input-group">
									<div class="input-group-text">ID Oficina</div>
									<input type="text" class="form-control" id="officeId" placeholder="" readonly>
								</div>
							</div>
							<div class="input-group">
								<span class="input-group-text" id="basic-addon1">Direccion Oficina</span>
								<input type="text" class="form-control" id="addressOffice" placeholder="">
							</div>
							<div class="col-md-6">
								<div class="input-group">
									<span class="input-group-text" id="basic-addon1">Telefono Oficina</span>
									<input type="text" class="form-control" id="telOffice" placeholder="">
								</div>
							</div>
							<div class="col-md-6">
								<div class="input-group">
									<div class="input-group-text">Ciudad</div>
									<select class="form-select" id="cityOffice" value = "">
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

		fetchAndDisplayData(); // Inicializa la tabla y la paginación


		let selectModalForCities = document.querySelector("#cityOffice");
		dataCities.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForCities.appendChild(newOption);
		});

		// Función para llenar el modal con los detalles del producto seleccionado
		let detallesBtn = document.querySelector("#detallesBtn");
		detallesBtn.addEventListener('click', () => {
			const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

			if (selectedRadio) {
				const codigoOficina = parseInt(selectedRadio.closest('th').classList[1]);
				const oficina = dataOffices.find(p => p.id === codigoOficina);
				if (oficina) {
					document.querySelector('#officeId').value = oficina.id;
					document.querySelector('#officeId').setAttribute('disabled', true);
					document.querySelector('#addressOffice').value = oficina.addres;
					document.querySelector('#telOffice').value = oficina.telephone;
					document.querySelector('#cityOffice').value = oficina.city ? oficina.city.id : '';
				}
			} else {
				alert("Por favor, selecciona una ciudad.");
			}

			document.querySelector('.btn-success').addEventListener('click', async function () {
				// Obtener valores de los campos
				const officeId = document.querySelector('#officeId').value;
				const addressOffice = document.querySelector('#addressOffice').value;
				const telOffice = document.querySelector('#telOffice').value;
				const cityOffice = document.querySelector('#cityOffice').value;

				// Validar campos
				if (isEmpty(addressOffice) || isEmpty(telOffice) || isEmpty(cityOffice)) {
					alert('Todos los campos deben ser completados.');
					return;
				}

				const officeDTO = {
					office: {
						id: parseInt(officeId),
						addres: addressOffice,
						telephone: telOffice,
						city: {
							id: parseInt(cityOffice)
						}
					},
					idCity: parseInt(cityOffice)
				};
				await putFunction(parseInt(officeId), officeDTO, "office")
				alert('Oficina actualizada con éxito.');
				seeOfficeMenu(e); // Recarga la vista de oficinas

			});

			document.querySelector('.btnConfDel').addEventListener('click', async function () {
				const officeId = document.getElementById('officeId').value;
				try {
					await delFunction(officeId, "office");
					alert('Oficina eliminada con éxito.');
				} catch (error) {
					console.error('Error al eliminar la oficina:', error);
					alert('No es posible eliminar la oficina. Intenta de nuevo más tarde.');
				}
				seeOfficeMenu(e); 
			});

		});
	}

	async function addOfficeMenu(e) {
		e.preventDefault();
		const data = await getFunction("office");
		dataOffices = data.offices;
		const dataCities = data.cities;

		officeContent.innerHTML = /*html*/ `
			<div class="head">
				<h3>Agregar Oficinas</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
			<div class="input-group">
				<span class="input-group-text" id="basic-addon1">Direccion Oficina</span>
				<input type="text" class="form-control" id="addressOffice" placeholder="">
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-text" id="basic-addon1">Telefono Oficina</span>
					<input type="text" class="form-control" id="telOffice" placeholder="">
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<div class="input-group-text">Ciudad</div>
					<select class="form-select" id="cityOffice" value = "">
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

		let selectModalForCities = document.querySelector("#cityOffice");
		dataCities.forEach(opcion => {
			const newOption = document.createElement('option');
			newOption.value = opcion.id;
			newOption.text = opcion.name;
			selectModalForCities.appendChild(newOption);
		});

		document.getElementById('saveButton').addEventListener('click', async function () {
			// Obtener valores de los campos
			const addressOffice = document.querySelector('#addressOffice').value;
			const telOffice = document.querySelector('#telOffice').value;
			const cityOffice = document.querySelector('#cityOffice').value;

			// Validar campos
			if (isEmpty(addressOffice) || isEmpty(telOffice) || isEmpty(cityOffice)) {
				alert('Todos los campos deben ser completados.');
				return;
			}

			const officeDTO = {
				office: {
					addres: addressOffice,
					telephone: telOffice,
					city: {
						id: cityOffice
					}
				},
				idCity: cityOffice
			};

			await postFunction(officeDTO, "office");
			alert('Oficina guardada con éxito.');
			addOfficeMenu(e); 

		});

	}

	const fetchAndDisplayData = () => {
		createTable(dataOffices);
		updatePagination(dataOffices.length, currentPage, itemsPerPage, (pageNum) => {
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
			td2.textContent = opcion.addres;
			newRow.appendChild(td2);

			const td3 = document.createElement('td');
			td3.textContent = opcion.telephone;
			newRow.appendChild(td3);

			const td4 = document.createElement('td');
			td4.textContent = opcion.city.name;
			newRow.appendChild(td4);

			tbody.appendChild(newRow);
		}
	};
});