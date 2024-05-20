INSERT INTO proveedores (nombre, telefono) VALUES
('Pil', 214325),
('Delicia', 235325),
('Nestle', 353325),
('Sofia', 2525),
('La Suprema', 414325),
('SanCor', 525325),
('Arcor', 635325),
('Bimbo', 735325),
('Coca Cola', 835325),
('Pepsi', 935325),
('Danone', 1035325),
('Unilever', 1135325),
('Procter & Gamble', 1235325),
('Colgate-Palmolive', 1335325),
('Kimberly-Clark', 1435325),
('Johnson & Johnson', 1535325),
('Mars', 1635325),
('Mondelez', 1735325),
('General Mills', 1835325),
('Kraft Heinz', 1935325),
('Veduleria Margarita', 214325);

INSERT INTO tipo_producto (tipo_producto) VALUES
('Fiambre'),
('Lacteos'),
('Cereales'),
('Bebidas'),
('Frutas'),
('Verduras'),
('Carnes'),
('Pescados'),
('Mariscos'),
('Panadería'),
('Pastelería'),
('Congelados'),
('Snacks'),
('Salsas'),
('Especias'),
('Aceites'),
('Enlatados'),
('Limpieza'),
('Higiene Personal'),
('Cuidado del Hogar'),
('Mascotas');


INSERT INTO productos (id_proveedor, tipo_producto, precio_unitario, nombre, fecha_caducidad, stock) VALUES
(1, 'Lacteos', 7.0, 'Leche deslactosada', '2030-12-16', 1111),
(1, 'Lacteos', 6.0, 'Leche normal', '2030-12-16', 1111),
(2, 'Lacteos', 6.0, 'Leche de soya sabor', '2030-12-16', 1111),
(4, 'Fiambre', 6.0, 'Salchicha', '2030-12-16', 1111),
(3, 'Cereales', 4.0, 'Corn Flakes', '2030-12-16', 500),
(9, 'Bebidas', 1.0, 'Jugo de naranja', '2030-12-16', 800),
(21, 'Frutas', 2.0, 'Manzana', '2030-12-16', 600),
(21, 'Verduras', 1.0, 'Zanahoria', '2030-12-16', 700),
(4, 'Carnes', 10.0, 'Carne de res', '2030-12-16', 300),
(4, 'Pescados', 12.0, 'Salmón', '2030-12-16', 250),
(4, 'Mariscos', 15.0, 'Camarones', '2030-12-16', 200),
(8, 'Panadería', 1.0, 'Pan francés', '2030-12-16', 1000),
(8, 'Pastelería', 2.0, 'Pastel de chocolate', '2030-12-16', 150),
(7, 'Congelados', 8.0, 'Helado de vainilla', '2030-12-16', 300),
(13, 'Snacks', 1.0, 'Papas fritas', '2030-12-16', 800),
(21, 'Salsas', 2.0, 'Salsa de tomate', '2030-12-16', 600),
(15, 'Especias', 3.0, 'Pimienta negra', '2030-12-16', 400),
(21, 'Aceites', 5.0, 'Aceite de oliva', '2030-12-16', 500),
(17, 'Enlatados', 1.0, 'Atún enlatado', '2030-12-16', 700),
(18, 'Limpieza', 3.0, 'Detergente', '2030-12-16', 600),
(19, 'Higiene Personal', 4.0, 'Champú', '2030-12-16', 400),
(19, 'Cuidado del Hogar', 6.0, 'Ambientador', '2030-12-16', 500),
(20, 'Mascotas', 8.0, 'Comida para perros', '2030-12-16', 300);


insert into sucursal (nombre, direccion) values 
('Sucursal 1', 'Obrajes'),
('Sucursal 3', 'Achumani'),
('Sucursal 4', 'Miraflores'),
('Sucursal 2', 'Calacoto');

insert into empleado (id_sucursal, nombre, correo, superadmi, password) values
(1, 'Pedro', 'pedro@gmail.com', false, 'pedro123'),
(2, 'Maria', 'maria@gmail.com', false, 'pedro123'),
(3, 'Rosario', 'rosario@gmail.com', false, 'pedro123'),
(4, 'Flor', 'flor@gmail.com', false, 'pedro123');

insert into tipo_pago values
('Efectivo'),
( 'Tarjeta');

insert into cliente values 
(123, 'daniela', 'correo', 141243253);