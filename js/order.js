import { isEmpty, isPositiveInteger, isPositiveNumber } from './validations.js';
import { getFunction, postFunction, putFunction, delFunction } from '../api/apirest.js';

document.addEventListener('DOMContentLoaded', function () {

    const orderContent = document.querySelector(".content-data")
    const seeOrders = document.querySelector("#see-orders")
    const addOrders = document.querySelector("#add-orders")

    seeOrders.addEventListener("click", seeOrdersMenu)
    addOrders.addEventListener("click", addOrdersMenu)

    async function seeOrdersMenu(e) {
        e.preventDefault();
        const dataOrders = await getFunction("orders");
        console.log(dataOrders);
        const dataStatuses = await getFunction("orders/status");
        console.log(dataStatuses);
        const dataClients = await getFunction("clients");
        console.log(dataClients);

        orderContent.innerHTML = ``;
        // Genera el contenido HTML para los pedidos
        orderContent.innerHTML = /*html*/ `
        <div class="container text-center">
            <div class="row">
                <div class="col text-start">
                    <h3>Órdenes</h3>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Cliente</label>
                        <select class="form-select form-client" id="inputGroupSelect01">
                            <option selected value="">Choose...</option>
                        </select>
                        <button class="btn btn-outline-success searchClient" type="button">Filtrar</button>
                    </div>
                </div>
                <div class="col text-end">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="estado">Estado</label>
                        <select class="form-select form-status" id="estado">
                            <option  selected value="">Choose...</option>
                        </select>
                        <button class="btn btn-outline-success searchStatus" type="button">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-bordered border border-3">
            <thead>
                <tr>
                    <th scope="row"></th>
                    <th scope="row">Código</th>
                    <th scope="row">Fecha de Pedido</th>
                    <th scope="row">Fecha de Entrega</th>
                    <th scope="row">Estado</th>
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
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles Orden</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row gy-2 gx-3 align-items-center">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <div class="input-group-text">Código Orden</div>
                                        <input type="text" class="form-control" id="codigoOrden" placeholder="" readonly>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon1">Fecha de Pedido</span>
                                    <input type="text" class="form-control" id="fechaPedido" placeholder="" readonly>
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon1">Fecha de Entrega</span>
                                    <input type="date" class="form-control" id="fechaEntrega" placeholder="">
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon1">Comentario</span>
                                    <input type="text" class="form-control" id="comentario" placeholder="">
                                </div>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <div class="input-group-text">Estado</div>
                                        <select class="form-select" id="estadoModal">
                                            <option selected value="">Choose...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <div class="input-group-text">Cliente</div>
                                        <select class="form-select" id="cliente">
                                            <option selected value="">Choose...</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success">Guardar</button>
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

        // Rellena la tabla con las órdenes
        createTable(dataOrders);

        // Rellena los selectores en el modal   (funcionando)
        let selectForClient = document.querySelector(".form-client");
        dataClients.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectForClient.appendChild(newOption);
        });
        //FIXME : no funciona porque bota los datos del cliente no los que corresponden al pedido del cliente
        let searchClientButton = document.querySelector(".searchClient");
        searchClientButton.addEventListener('click', async () => {
            const clientID = selectForClient.value;
            const ordersForClient = await getFunction(`clients/${clientID}`);
            createTable(ordersForClient);

        });

        //funciona
        let selectEstado = document.querySelector("#estado");
        dataStatuses.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectEstado.appendChild(newOption);
        });

        let selectEstadoModal = document.querySelector("#estadoModal");
        dataStatuses.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectEstadoModal.appendChild(newOption);
        });

        //FIXME : funciona 
        let searchStatusButton = document.querySelector(".searchStatus");
        searchStatusButton.addEventListener('click', async () => {
            try {
                const statusID = document.querySelector(".form-status").value;
                console.log('Status ID:', statusID);

                if (isEmpty(statusID)) {
                    alert('Por favor, seleccione un estado.');
                    return;
                }

                const ordersForStatus = await getFunction(`orders/status/${statusID}`);
                console.log('Orders for status:', ordersForStatus);

                createTable(ordersForStatus);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Hubo un problema al obtener los pedidos.');
            }
        });

        //funcionando
        let selectCliente = document.querySelector("#cliente");
        dataClients.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectCliente.appendChild(newOption);
        });

        //  funcionando
        let detallesBtn = document.querySelector("#detallesBtn");
        detallesBtn.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');

            if (selectedRadio) {
                const orderCode = selectedRadio.closest('th').classList[1];
                const order = dataOrders.find(p => p.orderCode === orderCode);
                if (order) {
                    document.querySelector('#codigoOrden').value = order.orderCode;
                    document.querySelector('#codigoOrden').setAttribute('disabled', true);
                    document.querySelector('#fechaPedido').value = order.orderDate;
                    document.querySelector('#fechaEntrega').value = order.deliverDate;
                    document.querySelector('#comentario').value = order.commentary;
                    document.querySelector('#estadoModal').value = order.status ? order.status.id : '';
                    document.querySelector('#cliente').value = order.client ? order.client.id : '';
                }
            } else {
                alert("Por favor, selecciona una orden.");
            }
            // funcionando
            document.querySelector('.btn-success').addEventListener('click', function () {
                // Obtener valores de los campos
                const orderCode = document.querySelector('#codigoOrden').value;
                const orderDate = document.querySelector('#fechaPedido').value;
                const deliverDate = document.querySelector('#fechaEntrega').value;
                const commentary = document.querySelector('#comentario').value;
                const status = document.querySelector('#estadoModal').value;
                const client = document.querySelector('#cliente').value;

                // Validar campos
                // if (isEmpty(orderCode) || isEmpty(orderDate) || isEmpty(deliverDate) || isEmpty(status) || isEmpty(client)) {
                //     alert('Todos los campos deben ser completados.');
                //     return;
                // }

                // Crear objeto de orden
                const orderDTO = {
                    order: {
                        orderCode: orderCode,
                        orderDate: orderDate, 
                        deliverDate: deliverDate, 
                        commentary: commentary
                    },
                    clientId: parseInt(client),
                    statusId: parseInt(status),
                    details: [] 
                };

                putFunction(orderCode, orderDTO, "orders");
                alert('Orden actualizada con éxito.');
            });

            //no funcionando
            document.querySelector('.btnConfDel').addEventListener('click', async function () {
                const orderCode = document.getElementById('codigoOrden').value;
                try {
                    await delFunction(orderCode, "orders");
                    alert('Orden eliminada con éxito.');
                } catch (error) {
                    alert('No es posible eliminar');
                }
            });
        });

    }

    async function addOrdersMenu(e) {
        e.preventDefault();
        const dataStatuses = await getFunction("orders/status");
        const dataClients = await getFunction("clients");

        orderContent.innerHTML = /*html*/ `
            <div class="head">
                <h3>Agregar Órdenes</h3>
            </div>
            <form class="row gy-2 gx-3 align-items-center">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-text">Código Orden</div>
                    <input type="text" class="form-control" id="codigoOrden" placeholder="">
                </div>
            </div>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">Fecha de Pedido</span>
                <input type="datetime-local" class="form-control" id="fechaPedido" placeholder="">
            </div>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">Fecha de Entrega</span>
                <input type="date" class="form-control" id="fechaEntrega" placeholder="">
            </div>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">Comentario</span>
                <input type="text" class="form-control" id="comentario" placeholder="">
            </div>
            <div class="col-md-8">
                <div class="input-group">
                    <div class="input-group-text">Estado</div>
                    <select class="form-select" id="estado">
                        <option selected value="">Choose...</option>
                    </select>
                </div>
            </div>
            <div class="col-md-8">
                <div class="input-group">
                    <div class="input-group-text">Cliente</div>
                    <select class="form-select" id="cliente">
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
        //funcionando
        let selectEstado = document.querySelector("#estado");
        dataStatuses.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectEstado.appendChild(newOption);
        });
        //funcionando
        let selectCliente = document.querySelector("#cliente");
        dataClients.forEach(opcion => {
            const newOption = document.createElement('option');
            newOption.value = opcion.id;
            newOption.text = opcion.name;
            selectCliente.appendChild(newOption);
        });

        // no funcionando
        document.querySelector('.btn-success').addEventListener('click', function () {
            // Obtener valores de los campos
            const orderCode = document.getElementById('codigoOrden').value;
            const orderDate = document.getElementById('fechaPedido').value;
            const deliverDate = document.getElementById('fechaEntrega').value;
            const commentary = document.getElementById('comentario').value;
            const status = document.getElementById('estado').value;
            const client = document.getElementById('cliente').value;

            // Validar campos
            if (isEmpty(orderCode)) {
                alert('Id debe ser completado');
                return;
            }

            // Validar tipos de datos
            if (!isPositiveInteger(orderCode)) {
                alert('El código de la orden debe ser un número entero positivo.');
                return;
            }

            // Crear objeto de orden
            const orderDTO = {
                order: {
                    orderCode: orderCode,
                    orderDate: orderDate, 
                    deliverDate: deliverDate,
                    commentary: commentary
                },
                clientId: parseInt(client),
                statusId: parseInt(status),
                details: [] 
            };

            console.log(orderDTO);

            postFunction(orderDTO, "orders");
            alert('Orden creada con éxito.');
        });


    }

    // funcionando
    const createTable = (data) => {
        let tbody = document.querySelector(".tbody");
        tbody.innerHTML = ``;  // Limpiar el contenido anterior

        data.forEach((opcion, index) => {
            const newRow = document.createElement('tr');

            // Crear celda para el radio button
            const th1 = document.createElement('th');
            th1.setAttribute('scope', 'row');
            th1.classList.add('radio', opcion.orderCode);

            const radioInput = document.createElement('input');
            radioInput.classList.add('form-check-input');
            radioInput.type = 'radio';
            radioInput.name = 'flexRadioDefault';
            radioInput.id = `flexRadioDefault${index}`;

            th1.appendChild(radioInput);
            newRow.appendChild(th1);

            // Crear y agregar celda para código de orden
            const td1 = document.createElement('td');
            td1.textContent = opcion.orderCode || 'N/A';
            newRow.appendChild(td1);

            // Crear y agregar celda para fecha de pedido
            const td2 = document.createElement('td');
            td2.textContent = opcion.orderDate || 'N/A';
            newRow.appendChild(td2);

            // Crear y agregar celda para fecha de entrega
            const td3 = document.createElement('td');
            td3.textContent = opcion.deliverDate || 'N/A';
            newRow.appendChild(td3);

            // Crear y agregar celda para estado
            const td4 = document.createElement('td');
            // Asegurarse de que opcion.status es un objeto y tiene la propiedad name, de lo contrario mostrar 'N/A'
            td4.textContent = typeof opcion.status === 'object' && opcion.status !== null ? opcion.status.name : 'N/A';
            newRow.appendChild(td4);

            tbody.appendChild(newRow);
        });
    };

});
