-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2022 a las 04:24:46
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: camisas
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla clientes
--

CREATE TABLE Users (
  ID int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  is_superusuario boolean not null,
  username varchar(25),
  email varchar(50),
  password char(60),
  nombre_completo varchar(500) NOT NULL,
  direccion text NOT NULL,
  ciudad text NOT NULL,
  estado text NOT NULL,
  cp text NOT NULL,
  telefono varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Productos (
  ID int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(25),
  precio float,
  descripcion varchar(100),
  in_stock boolean,
  imagen text,
  blanco_negro boolean
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Carrito (
  user_ID int(11) NOT NULL,
  producto_id int(11) NOT NULL,
  cantidad int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Pedidos (
  pedido_ID int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_ID int(11) NOT NULL,
  subtotal float,
  iva float,
  total float,
  direccion text NOT NULL,
  ciudad text NOT NULL,
  estado text NOT NULL,
  cp text NOT NULL,
  telefono varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Pedidos_productos (
  user_ID int(11) NOT NULL,
  producto_id int(11) NOT NULL,
  cantidad int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla compras
--

CREATE TABLE compras (
  ID_compra int(11) NOT NULL,
  codigo_interno varchar(30) NOT NULL,
  fecha datetime NOT NULL,
  ID_tipo int(11) NOT NULL,
  ID_proveedor int(11) NOT NULL,
  ID_usuario int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla compras_detalle
--

CREATE TABLE compras_detalle (
  ID_detalle int(11) NOT NULL,
  ID_compra int(11) NOT NULL,
  ID_producto int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  cantidad_desc decimal(18,2) NOT NULL,
  ID_unidad int(11) NOT NULL,
  costo decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla facturas
--

CREATE TABLE facturas (
  ID_factura int(11) NOT NULL,
  codigo_interno varchar(50) NOT NULL,
  fecha datetime NOT NULL,
  ID_tipo int(11) NOT NULL,
  ID_cliente int(11) NOT NULL,
  ID_usuario int(11) NOT NULL,
  credito bit(32) NOT NULL,
  fecha_vencimiento_credito datetime NOT NULL,
  total decimal(18,2) NOT NULL,
  total_pagado decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla clientes
--
ALTER TABLE clientes
  ADD PRIMARY KEY (ID_cliente);

--
-- Indices de la tabla compras
--
ALTER TABLE compras
  ADD PRIMARY KEY (ID_compra),
  ADD KEY ID_tipo (ID_tipo),
  ADD KEY ID_proveedor (ID_proveedor),
  ADD KEY ID_usuario (ID_usuario);

--
-- Indices de la tabla compras_detalle
--
ALTER TABLE compras_detalle
  ADD PRIMARY KEY (ID_detalle),
  ADD KEY ID_compra (ID_compra),
  ADD KEY ID_producto (ID_producto),
  ADD KEY ID_unidad (ID_unidad);

--
-- Indices de la tabla facturas
--
ALTER TABLE facturas
  ADD PRIMARY KEY (ID_factura),
  ADD KEY ID_tipo (ID_tipo),
  ADD KEY ID_cliente (ID_cliente),
  ADD KEY ID_usuario (ID_usuario);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla compras
--
ALTER TABLE compras
  ADD CONSTRAINT compras_ibfk_1 FOREIGN KEY (ID_tipo) REFERENCES compras (ID_compra),
  ADD CONSTRAINT compras_ibfk_2 FOREIGN KEY (ID_proveedor) REFERENCES compras (ID_compra),
  ADD CONSTRAINT compras_ibfk_3 FOREIGN KEY (ID_usuario) REFERENCES compras (ID_compra);

--
-- Filtros para la tabla compras_detalle
--
ALTER TABLE compras_detalle
  ADD CONSTRAINT compras_detalle_ibfk_1 FOREIGN KEY (ID_compra) REFERENCES compras_detalle (ID_detalle),
  ADD CONSTRAINT compras_detalle_ibfk_2 FOREIGN KEY (ID_producto) REFERENCES compras_detalle (ID_detalle),
  ADD CONSTRAINT compras_detalle_ibfk_3 FOREIGN KEY (ID_unidad) REFERENCES compras_detalle (ID_detalle);

--
-- Filtros para la tabla facturas
--
ALTER TABLE facturas
  ADD CONSTRAINT facturas_ibfk_1 FOREIGN KEY (ID_tipo) REFERENCES facturas (ID_factura),
  ADD CONSTRAINT facturas_ibfk_2 FOREIGN KEY (ID_cliente) REFERENCES facturas (ID_factura),
  ADD CONSTRAINT facturas_ibfk_3 FOREIGN KEY (ID_usuario) REFERENCES facturas (ID_factura);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
