-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 28-11-2022 a las 21:35:53
-- Versión del servidor: 10.5.16-MariaDB
-- Versión de PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id19914187_db`
--
CREATE DATABASE IF NOT EXISTS `id19914187_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id19914187_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Carrito`
--

CREATE TABLE `Carrito` (
  `user_ID` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos`
--

CREATE TABLE `Pedidos` (
  `pedido_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `subtotal` float DEFAULT NULL,
  `iva` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `direccion` text NOT NULL,
  `ciudad` text NOT NULL,
  `estado` text NOT NULL,
  `cp` text NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos_productos`
--

CREATE TABLE `Pedidos_productos` (
  `pedido_ID` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Productos`
--

CREATE TABLE `Productos` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `blanco_negro` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Productos`
--

INSERT INTO `Productos` (`ID`, `nombre`, `precio`, `descripcion`, `in_stock`, `imagen`, `blanco_negro`) VALUES
(1, 'camisa chida', 1000, 'camisa chida', 1, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `is_superusuario` tinyint(1) NOT NULL DEFAULT 0,
  `username` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `nombre_completo` varchar(500) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `ciudad` text DEFAULT NULL,
  `estado` text DEFAULT NULL,
  `cp` text DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`ID`, `is_superusuario`, `username`, `email`, `password`, `nombre_completo`, `direccion`, `ciudad`, `estado`, `cp`, `telefono`) VALUES
(1, 1, 'abraham', 'aagundisr@gmail.com', '$2y$10$4T2U3Eq/YUc7x8ioL7GSw.VQNXaoO7GON1e3FKDRbst7iC.A5dL2e', 'Abraham Agundis Rico', 'Direccion', 'leon', 'guanajuato', '12345', '123456789');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`pedido_ID`);

--
-- Indices de la tabla `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  MODIFY `pedido_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Productos`
--
ALTER TABLE `Productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
