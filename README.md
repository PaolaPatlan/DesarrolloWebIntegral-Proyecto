# DesarrolloWebIntegral-EVENTICKNOW 
EventickNow es una aplicación web para gestionar la venta de boletos de eventos musicales, permitiendo a los usuarios crear eventos o simplemente comprar boletos según el rol que se elija. Esta aplicación será de gran ayuda para agilizar el proceso de venta de boletos de una empresa dedicada a la creación de espectáculos musicales, la cual busca brindar una alternativa de compra para sus clientes pues vender sólo boletos físicos les resulta poco eficiente

## Matriz de roles

| Rol             | Nombre                             |
|-----------------|-----------------------------------|
| Product Owner   | Juan Luis Negrete Labrada         |
| Scrum Master    | Paola Guadalupe Patlán Gonzalez   |
| Developers      | Pedro Emmanuel Martinez Rodriguez |
|                 | María Guadalupe Mendoza Ramirez   |
|                 | Juan Luis Negrete Labrada         |
|                 | Paola Guadalupe Patlán Gónzalez   |


## Tipos de usuarios

| Nombre            | Descripción                                                |
|-------------------|------------------------------------------------------------|
| Administrador     | Valida el estatus de los eventos (Acepta o Rechaza).      |
| Creador de eventos| Crea eventos y tiene acceso a la compra de boletos.       |
| Usuario           | Compra boletos para los eventos.                           |

## Historias de usuario
| CATEGORÍA                                          | ID  | ROL          | CARACTERÍSTICA/FUNCIONALIDAD               | RAZON/RESULTADO                                     | CRITERIO DE ACEPTACIÓN                                                                                                                                                                              |
|----------------------------------------------------|-----|--------------|-------------------------------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Construcción de la arquitectura del proyecto       | HU0 | Desarrollador| Definir la arquitectura de la aplicación  | Diagrama de componentes de la arquitectura seleccionada| El diagrama es claro y entendible.                                                                                                                                                                  |
| Definición de requerimientos funcionales           | HU1 | Desarrollador| Entregable Definición de Requerimientos    | El documento cuenta con una introducción que describe el documento. Los requerimientos se especifican en tablas con Identificador, Nombre, Descripción y Tipo de usuario.                             |
| Definición de requerimientos no funcionales        | HU2 | Desarrollador| Entregable Definición de Requerimientos    | -                                                                                                                                                                                                  |
| Realizar el modelo de la base de datos             | HU3 | Desarrollador| Diagrama relacional de la BD              | Cumple las 3 formas normales. Nomenclatura camelCase. Los nombres de tablas y columnas deben ser descriptivos. Los tipos de datos son los adecuados.                                           |
| Desarrollo de Registro y login (manejo de roles)   | HU4 | Desarrollador| Preparación del entorno de desarrollo en Angular y Spring Boot | Maquetado del proyecto, conexión a la base de datos y API. Realizar una consulta exitosa desde el backend a la base de datos. Realizar una petición desde el frontend al backend. |
| Desarrollo del componente Registro                 | HU5 | Desarrollador| Componente completo en el backend y frontend. | Se muestra la alerta “Registro exitoso” al agregar un nuevo registro de usuario.                                                                                                                    |
| Desarrollo del componente Login y manejo de roles  | HU6 | Desarrollador| Componente completo en el backend y frontend. | Ingresar los datos: email: “admin.eventiknow@gmail.com” contraseña: evnw1010. El sistema redirige al inicio “Administrador”                                                                       |
| Desarrollo del módulo operaciones administrativas | HU7 | Desarrollador| Desarrollo del componente Administrador   | Leer, editar y eliminar eventos Mostrar todos los eventos, filtrarlos por categoría. Editar un evento y observar la alerta “Guardado correctamente” Eliminar un evento y observar la alerta “Eliminado correctamente”  |
| Desarrollo del módulo creador de eventos           | HU8| Desarrollador| Desarrollo del componente Eventos         | CRUD de eventos Mostrar todos los eventos, filtrarlos por categoría. Crear y editar un evento y observar la alerta “Guardado correctamente” Eliminar un evento y observar la alerta “Eliminado correctamente”  |
| Desarrollo del módulo usuario                      | HU9| Desarrollador| Desarrollo del componente Usuario         | Componente completo en el back y frontend. Visualizar la pantalla de inicio del rol “Usuario”                                                                                                      |


