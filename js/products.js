document.addEventListener('DOMContentLoaded', function () {


	const productContent = document.querySelector(".content-data")
	const seeProducts = document.querySelector("#see-products")
	const addProducts = document.querySelector("#add-products")

	seeProducts.addEventListener("click", seeProductsMenu)
	addProducts.addEventListener("click", addProductsMenu)


	async function seeProductsMenu(e) {
		e.preventDefault();

		// const inputForm = new FormData(form) /*obtiene input en forma clave valor
		// la clave es el name y el valor es el value ingresado*/
		// const objForm = Object.fromEntries(inputForm) //convertir las claves y valores en un objeto literal
		// const respuesta = await post(objForm)
		// console.log(respuesta);
		// const respuesta = await getProduct();
		// console.log(respuesta);


		productContent.innerHTML =  /*html*/ `
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
					<tbody>
						<tr>
							<th scope="row" class="radio">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
							</th>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Mark</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Otto</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Otto</label>
							</td>
						</tr>
						<tr>
							<th scope="row" class="radio">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
							</th>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Jacob</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Thornton</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Otto</label>
							</td>
						</tr>
						<tr>
							<th scope="row" class="radio">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
							</th>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Thornton</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Otto</label>
							</td>
							<td>
									<label class="form-check-label" for="flexRadioDefault1">Otto</label>
							</td>
						</tr>
					</tbody>
			</table>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button class="btn btn-info me-md-2" type="button">Detalles</button>
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
			<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					Launch static backdrop modal
			</button>
			<section id="modal">
					<!-- Button trigger modal -->

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
														<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
													</div>
											</div>

											<div class="input-group">
													<span class="input-group-text" id="basic-addon1">Nombre Producto</span>
													<input type="text" class="form-control" placeholder="" aria-label=""
														aria-describedby="basic-addon1">
											</div>

											<div class="col-md-6">
													<div class="input-group">
														<div class="input-group-text">Gamma Producto</div>
														<select class="form-select" id="autoSizingSelect">
															<option selected>Choose...</option>
															<option value="1">One</option>
															<option value="2">Two</option>
															<option value="3">Three</option>
														</select>
													</div>
											</div>
											<div class="col-md-6">
													<div class="input-group">
														<div class="input-group-text">Precio Producto</div>
														<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<div class="input-group-text">Stock</div>
												<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<div class="input-group-text">Alto mm</div>
												<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
											</div>
										</div>
										<div class="col-md-3">
											<div class="input-group">
												<div class="input-group-text">Ancho mm</div>
												<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
											</div>
										</div>
									<div class="col-md-3">
										<div class="input-group">
											<div class="input-group-text">Espesor mm</div>
											<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
										</div>
									</div>
									<div class="input-group">
										<span class="input-group-text">Descripcion</span>
										<textarea class="form-control" aria-label="With textarea"></textarea>
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

        `
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

		// const inputForm = new FormData(form) /*obtiene input en forma clave valor
		// la clave es el name y el valor es el value ingresado*/
		// const objForm = Object.fromEntries(inputForm) //convertir las claves y valores en un objeto literal
		// const respuesta = await post(objForm)
		// console.log(respuesta);
		const respuesta = await getGamma();
		console.log(respuesta);


		productContent.innerHTML =  /*html*/ `

			<div class="head">
				<h3>Agregar Productos</h3>
			</div>
			<form class="row gy-2 gx-3 align-items-center">
				<div class="col-md-6">
					<div class="input-group">
						<div class="input-group-text">Codigo Producto</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>

				<div class="input-group">
					<span class="input-group-text" id="basic-addon1">Nombre Producto</span>
					<input type="text" class="form-control" placeholder="" aria-label=""
						aria-describedby="basic-addon1">
				</div>

				<div class="col-md-6">
					<div class="input-group">
						<div class="input-group-text">Gamma Producto</div>
						<select class="form-select" id="autoSizingSelect">
							<option selected>Choose...</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
					</div>
				</div>
				<div class="col-md-6">
					<div class="input-group">
						<div class="input-group-text">Precio Producto</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<div class="input-group-text">Stock</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<div class="input-group-text">Alto mm</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<div class="input-group-text">Ancho mm</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<div class="input-group-text">Espesor mm</div>
						<input type="text" class="form-control" id="autoSizingInputGroup" placeholder="">
					</div>
				</div>
				<div class="input-group">
					<span class="input-group-text">Descripcion</span>
					<textarea class="form-control" aria-label="With textarea"></textarea>
				</div>
			</form>
			<br>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button class="btn btn-success me-md-2" type="button">Guardar</button>
			</div>

        `
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

});