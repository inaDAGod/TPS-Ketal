insert into proveedores (nombre, telefono) values
('Pil', 214325),
('Delicia', 235325),
('Nestle', 353325),
('Sofia', 2525);

insert into tipo_producto values
('Fiambre'),
('Lacteos'),
('Cereales');

insert into productos (id_proveedor,tipo_producto,  precio_unitario, nombre,  fecha_caducidad, stock ) values
(1,'Lacteos',7.0,'Leche deslactosada', '16/12/2030', 1111),
(1,'Lacteos',6.0,'Leche normal', '16/12/2030', 1111),
(2,'Lacteos',6.0,'Leche de soya sabor', '16/12/2030', 1111),
(4,'Fiambre',6.0,'salchicha', '16/12/2030', 1111);

insert into sucursal (nombre, direccion) values 
('Sucursal 1', 'Obrajes'),
('Sucursal 2', 'Calacoto');

insert into empleado (id_sucursal, nombre, correo, superadmi, password) values
(1, 'Pedro', 'pedro@gmail.com', false, 'pedro123');

insert into tipo_pago values
('Efectivo'),
( 'Tarjeta');