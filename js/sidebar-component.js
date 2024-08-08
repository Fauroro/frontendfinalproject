export class SidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`

            <a href="#" class="brand"><i class='bx bxs-florist icon'></i>GardenStore</a>
            <ul class="side-menu">
                <li><a href="#" class="active"><i class='bx bxs-dashboard icon'></i> Dashboard</a></li>
                <li class="divider" data-text="main">Main</li>
                <li>
                    <a href="#"><i class='bx bxs-package icon'></i> Productos <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-products">Agregar Productos</a></li>
                        <li><a href="#" id="see-products">Ver Productos</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-user-detail icon'></i> Clientes <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-clients">Agregar Clientes</a></li>
                        <li><a href="#" id="see-clients">Ver Clientes</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class='bx bx-money-withdraw icon'></i></i> Pagos <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-payment">Agregar Pagos</a></li>
                        <li><a href="#" id="see-payment">Ver Pagos</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class='bx bx-male-female icon'></i> Empleados <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-employee">Agregar Empleados</a></li>
                        <li><a href="#" id="see-employee">Ver Empleados</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class='bx bxs-buildings icon'></i> Oficinas <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-office">Agregar Oficinas</a></li>
                        <li><a href="#" id="see-office">Ver Oficinas</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class='bx bx-shopping-bag icon'></i> Pedidos <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#" id="add-orders">Agregar Pedidos</a></li>
                        <li><a href="#" id="see-orders">Ver Pedidos</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class='bx bxs-chart icon'></i> Charts</a></li>
                <li><a href="#"><i class='bx bxs-widget icon'></i> Widgets</a></li>
                <li class="divider" data-text="table and forms">Table and forms</li>
                <li><a href="#"><i class='bx bx-table icon'></i> Tables</a></li>
                <li>
                    <a href="#"><i class='bx bxs-notepad icon'></i> Forms <i class='bx bx-chevron-right icon-right'></i></a>
                    <ul class="side-dropdown">
                        <li><a href="#">Basic</a></li>
                        <li><a href="#">Select</a></li>
                        <li><a href="#">Checkbox</a></li>
                        <li><a href="#">Radio</a></li>
                    </ul>
                </li>
            </ul>
        `;
    }
}

customElements.define("sidebar-component", SidebarComponent);
