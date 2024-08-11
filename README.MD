### Proyecto: Sistema de Gestión Integral de Recursos Empresariales

---

#### Descripción del Proyecto

Este proyecto es un sistema de gestión integral que abarca múltiples aspectos de las operaciones empresariales, incluyendo la gestión de productos, clientes, empleados, pagos, oficinas y pedidos. Desarrollado utilizando un stack tecnológico robusto con Spring Boot en el backend y tecnologías web como HTML, CSS, y JavaScript en el frontend, el sistema permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada una de las entidades mencionadas. Además, el sistema incluye funcionalidades avanzadas de filtrado que permiten a los usuarios manejar y visualizar la información de manera más eficiente y personalizada desde la interfaz de usuario.

El proyecto hace uso de **Bootstrap** para los estilos en el frontend, lo que asegura un diseño moderno, responsivo y consistente a lo largo de todas las páginas. Además, para garantizar la seguridad, el sistema implementa **JWT (JSON Web Tokens)**, permitiendo la autenticación segura de los usuarios y protegiendo las rutas sensibles en la aplicación.

El proyecto está dividido en dos partes principales:

1. **Frontend**: Implementado con tecnologías web estándar y Bootstrap para proporcionar una interfaz de usuario interactiva y fácil de usar.
2. **Backend**: Desarrollado en Java utilizando Spring Boot, que actúa como el servidor backend, manejando la lógica de negocio, acceso a la base de datos y la exposición de una API RESTful para interactuar con el frontend.

---

#### Estructura del Proyecto

**1. Frontend**

El frontend del proyecto está organizado en varios archivos y directorios:

- **index.html & main.html**: Archivos HTML principales que constituyen la interfaz de usuario del sistema. Estos archivos definen la estructura de las páginas y contienen los elementos HTML necesarios para mostrar y manejar las interacciones de los usuarios.
  
- **css/**: Contiene los archivos de estilo CSS, principalmente generados y estructurados utilizando Bootstrap. Este framework de CSS asegura que la apariencia visual del sistema sea moderna y responsiva, ofreciendo una experiencia de usuario mejorada.

- **js/**: Este directorio contiene archivos JavaScript que manejan la lógica de la interfaz de usuario. Aquí se encuentran los scripts que gestionan eventos del usuario, realizan solicitudes AJAX al backend y actualizan dinámicamente la interfaz sin necesidad de recargar la página. Además, se incluyen las funcionalidades de filtrado que permiten a los usuarios seleccionar y visualizar únicamente la información relevante.

- **api/**: Un directorio que podría contener archivos relacionados con la integración o documentación de la API, como archivos de configuración o utilidades para facilitar la interacción con el backend.

- **.vscode/** y **.git/**: Directorios relacionados con el entorno de desarrollo y control de versiones, respectivamente.

**2. Backend**

El backend del proyecto está estructurado de la siguiente manera:

- **pom.xml**: Archivo de configuración de Maven, que define las dependencias necesarias para el proyecto, los plugins utilizados, y otros aspectos del ciclo de vida de construcción y despliegue de la aplicación.

- **src/**: Contiene el código fuente del proyecto. Dentro de este directorio, se encuentran las clases y paquetes que conforman la aplicación, incluyendo controladores, servicios, repositorios, y entidades. El código está organizado según una arquitectura en capas que sigue las mejores prácticas de desarrollo con Spring Boot.

- **target/**: Este directorio se genera después de compilar el proyecto y contiene los artefactos resultantes de la compilación, como archivos JAR o WAR listos para ser desplegados.

- **.gitignore**: Archivo que especifica qué archivos o directorios deben ser ignorados por Git para evitar que se incluyan en el control de versiones.

---

#### Funcionalidades Principales

- **Gestión de Productos**: Permite administrar el catálogo de productos de la empresa, incluyendo la creación, actualización y eliminación de productos, así como la visualización detallada de la información de cada producto.

- **Gestión de Clientes**: Facilita la administración de la base de datos de clientes, permitiendo agregar, editar y eliminar clientes, así como acceder a la información completa de los mismos.

- **Gestión de Empleados**: Permite crear, visualizar, actualizar y eliminar empleados. Cada empleado puede estar asociado a una oficina específica, pero también es posible que un empleado no tenga oficina asignada.

- **Gestión de Pagos**: Proporciona herramientas para manejar las transacciones de pagos, permitiendo el registro de nuevos pagos y la visualización del historial de transacciones.

- **Gestión de Oficinas**: Permite realizar operaciones CRUD sobre las oficinas. Una oficina puede tener múltiples empleados asociados, pero el sistema está diseñado para asegurar que la eliminación de una oficina no afecte a los empleados, estableciendo su campo `oficina_id` a `NULL` en lugar de eliminarlos.

- **Gestión de Pedidos**: Permite la administración de pedidos, incluyendo la creación de nuevos pedidos, la actualización de pedidos existentes y la posibilidad de filtrarlos según criterios como la fecha, el cliente, el estado del pedido, etc.

- **Filtros Avanzados en la Interfaz**: El sistema incorpora funcionalidades de filtrado que permiten a los usuarios seleccionar y mostrar únicamente la información relevante, mejorando la eficiencia en la gestión y visualización de grandes volúmenes de datos.

- **Seguridad con JWT**: Para proteger la integridad y confidencialidad de la aplicación, se ha implementado un sistema de autenticación basado en JWT (JSON Web Tokens). Esto asegura que solo los usuarios autenticados puedan acceder a ciertas rutas y operaciones críticas dentro de la aplicación.

- **Integración Frontend-Backend**: El frontend se comunica con el backend a través de una API RESTful. Las operaciones CRUD se manejan a través de solicitudes HTTP que son procesadas por los controladores en el backend, quienes interactúan con la base de datos MySQL para persistir los datos.

---

#### Requisitos del Sistema

- **Java 17+**: La aplicación backend está desarrollada en Java, por lo que se requiere una instalación de Java 17 o superior.
- **Spring Boot 2.5+**: Framework utilizado para el desarrollo del backend.
- **Maven 3.8+**: Utilizado para la gestión de dependencias y construcción del proyecto.
- **MySQL 8.0+**: Sistema de gestión de bases de datos utilizado para almacenar la información de productos, clientes, empleados, pagos, oficinas y pedidos.
- **Navegador Web Moderno**: Para interactuar con la interfaz de usuario, se recomienda utilizar la última versión de un navegador web moderno (Chrome, Firefox, Edge).

---

#### Instrucciones de Configuración

**1. Configuración del Backend:**

1. Clonar el repositorio del proyecto.
2. Configurar la base de datos MySQL y actualizar las credenciales en el archivo `application.properties`.
3. Ejecutar el comando `mvn clean install` para compilar el proyecto.
4. Iniciar la aplicación utilizando el comando `mvn spring-boot:run`.

**2. Configuración del Frontend:**

1. Navegar al directorio del frontend.
2. Abrir `index.html` o `main.html` en un navegador web para interactuar con el sistema.
3. Asegurarse de que el backend esté corriendo para que las operaciones CRUD, la seguridad JWT y los filtros funcionen correctamente.

---