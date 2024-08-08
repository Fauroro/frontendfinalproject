export class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addLogoutEventListener();
    }

    render() {
        this.innerHTML = /*html*/`
        <nav class="nav-ppal">
            <i class='bx bx-menu toggle-sidebar'></i>
            <form action="#"></form>
            <span class="divider"></span>
            <div class="profile">
                <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="">
                <ul class="profile-link">
                    <li><a href="#" id="logoutButton"><i class='bx bxs-log-out-circle'></i> Logout</a></li>
                </ul>
            </div>
        </nav>
        `;
    }

    addLogoutEventListener() {
        const logoutButton = this.querySelector('#logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.logout();
            });
        }
    }

    logout() {
        localStorage.removeItem('token'); 
        alert('You have been logged out');
        window.location.href = "/index.html"; 
    }
}

customElements.define("nav-component", NavComponent);
