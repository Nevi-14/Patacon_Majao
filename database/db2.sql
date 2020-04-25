-- DATE FORMAT AND LANGUAGE
SET DATEFORMAT dmy
SET LANGUAGE Spanish
GO
-- CREATING DATABASE
CREATE DATABASE Patacon_Majao
USE   Patacon_Majao
GO
--- TABLES WITH NO DEPENDENCIES 

CREATE TABLE Roles(
Cod_Rol VARCHAR(2) NOT NULL PRIMARY KEY,
Tipo_Rol VARCHAR(15)
)
GO

CREATE TABLE Empleados(
Ced_Empleado VARCHAR(15) NOT NULL  PRIMARY KEY,
Nom_Empleado VARCHAR(20),
Primer_Apellido VARCHAR(20),
Segundo_Apellido VARCHAR(20),
Correo_Empleado VARCHAR(60),
Telefono_Empleado VARCHAR(15),

)
GO

CREATE TABLE Usuarios(
Cod_Login INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Usuario VARCHAR(60) NOT NULL,
Contraseña VARCHAR(60)  NOT NULL,
Ced_Empleado VARCHAR(15),
Cod_rol VARCHAR(2),
CONSTRAINT FK_Usuarios_Ced_Empleado  FOREIGN KEY (Ced_Empleado) REFERENCES Empleados(Ced_Empleado),
CONSTRAINT FK_Usuarios_Cod_rol  FOREIGN KEY (Cod_rol) REFERENCES Roles(Cod_rol)
)
GO

CREATE TABLE Clientes(
Cod_Cliente INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Ced_Cliente VARCHAR(15),
Nombre_Cliente VARCHAR(20),
Primer_Apellido VARCHAR(20),
Segundo_Apellido VARCHAR(20),
Correo_Cliente VARCHAR(60),
Telefono_Cliente VARCHAR(15),
)
GO

CREATE TABLE Estado_Evento(
Cod_Estado VARCHAR(2) NOT NULL PRIMARY KEY,
Nombre_Estado VARCHAR(15)
)
GO

CREATE TABLE Tipo_Evento(
Cod_Tipo_Evento VARCHAR(2) NOT NULL PRIMARY KEY,
Nombre_Tipo_Evento VARCHAR(20)
)
GO
CREATE TABLE  Solicitud_Cotizacion(
Cod_Solicitud INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Nombre_Cliente VARCHAR(60),
Correo_Cliente VARCHAR(60),
Telefono_Cliente VARCHAR(15),
Fecha_Solicitud TIMESTAMP,
Descripcion VARCHAR(200)
)

GO

CREATE TABLE  Categoria(
Cod_Categoria VARCHAR(2) NOT NULL PRIMARY KEY,
Nombre_Categoria VARCHAR(20),
)
GO

CREATE TABLE Producto(
Cod_Producto VARCHAR(2) NOT NULL PRIMARY KEY,
Nombre_Producto VARCHAR(30),
Precio_Producto NUMERIC(6,2),
Cod_Categoria VARCHAR(2),
Descripcion VARCHAR(200),
CONSTRAINT FK_Producto_Cod_Categoria  FOREIGN KEY (Cod_Categoria) REFERENCES Categoria(Cod_Categoria)
)
GO
CREATE TABLE Cotizacion(
Cod_Cotizacion INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Fecha_Cotizacion DATE,
Cantidad_Personas INT,
Cod_Cliente  INT,
Cod_Tipo_Evento VARCHAR(2)

CONSTRAINT FK_Cotizacion_Cod_Cliente FOREIGN KEY (Cod_Cliente) REFERENCES Clientes(Cod_Cliente),
CONSTRAINT FK_Cotizacion_Cod_Tipo_Evento  FOREIGN KEY (Cod_Tipo_Evento) REFERENCES Tipo_Evento(Cod_Tipo_Evento)

)

GO
CREATE TABLE Detalle_Cotizacion(
Cod_Detalle  INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Cod_Producto VARCHAR(2) NOT NULL,
Cantidad_Producto INT,
Precio_Producto NUMERIC(6,2),
Cod_Cotizacion INT,
CONSTRAINT FK_Detalle_Cotizacion_Cod_Cotizacion  FOREIGN KEY (Cod_Cotizacion) REFERENCES Cotizacion(Cod_Cotizacion)
)
GO



CREATE TABLE Eventos(
Cod_Evento INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Fecha_Evento DATE,
Direccion_Evento VARCHAR(200),
Detalles_Evento VARCHAR(200),
Cod_Cotizacion INT,
Ced_Empleado VARCHAR(15),
Cod_Estado VARCHAR(2),
CONSTRAINT FK_Eventos_Cod_Cotizacion FOREIGN KEY (Cod_Cotizacion) REFERENCES Cotizacion(Cod_Cotizacion),
CONSTRAINT FK_Eventos_Ced_Eventos_Empleado FOREIGN KEY (Ced_Empleado) REFERENCES Empleados(Ced_Empleado),
CONSTRAINT FK_Eventos_Cod_Estado  FOREIGN KEY (Cod_Estado) REFERENCES Estado_Evento(Cod_Estado)
)
GO
