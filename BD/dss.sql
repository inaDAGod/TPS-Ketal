CREATE TABLE h_ventas (
    id_h_venta  SERIAL PRIMARY KEY,
	id_venta  int,
	nit_cliente int,
    nombre_sucursal varchar(100),
	zona_sucursal varchar(100),
	nombre_proveedor varchar(100),
	producto varchar(100),
	tipo_producto varchar(100),
	precio_unitario money,
	cantidad_producto int,
	tipo_pago varchar(100),
	subtotal_venta money,
    fecha_venta date
);


CREATE OR REPLACE FUNCTION addVenta()
RETURNS trigger AS
$BODY$
DECLARE
	v_id_venta  int;
	v_nit_cliente int;
    v_nombre_sucursal VARCHAR(100);
    v_zona_sucursal VARCHAR(100);
    v_nombre_proveedor VARCHAR(100);
    v_producto VARCHAR(100);
    v_tipo_producto VARCHAR(100);
    v_precio_unitario MONEY;
    v_cantidad_producto INT;
    v_tipo_pago VARCHAR(100);
    v_subtotal_venta MONEY;
    v_fecha_venta DATE;
BEGIN

    SELECT a.nombre INTO v_nombre_sucursal
    FROM sucursal a
    JOIN empleado b ON a.id_sucursal = b.id_sucursal
    WHERE b.id_empleado = (SELECT id_empleado FROM ventas WHERE id_venta = NEW.id_venta);

   

    SELECT a.direccion INTO v_zona_sucursal
    FROM sucursal a
    JOIN empleado b ON a.id_sucursal = b.id_sucursal
    WHERE b.id_empleado = (SELECT id_empleado FROM ventas WHERE id_venta = NEW.id_venta);

    

    SELECT tipo_pago, fecha_venta, nit_cliente INTO v_tipo_pago, v_fecha_venta,v_nit_cliente
    FROM ventas
    WHERE id_venta = NEW.id_venta;
	
	v_id_venta := NEW.id_venta;
    

    v_producto := (SELECT nombre FROM productos WHERE id_producto = NEW.id_producto);
    

    v_tipo_producto := (SELECT tipo_producto FROM productos WHERE id_producto = NEW.id_producto);
  

    v_precio_unitario := (SELECT precio_unitario FROM productos WHERE id_producto = NEW.id_producto);
    

    v_cantidad_producto := NEW.cantidad;
    v_subtotal_venta := NEW.subtotal;

    v_nombre_proveedor := (
        SELECT a.nombre
        FROM proveedores a
        JOIN productos b ON a.id_proveedor = b.id_proveedor
        WHERE b.id_producto = NEW.id_producto
    );
   


    INSERT INTO h_ventas (
		id_venta ,
		nit_cliente,
        nombre_sucursal,
        zona_sucursal,
        nombre_proveedor,
        producto,
        tipo_producto,
        precio_unitario,
        cantidad_producto,
        tipo_pago,
        subtotal_venta,
        fecha_venta
    ) VALUES (
		v_id_venta ,
		v_nit_cliente,
        v_nombre_sucursal,
        v_zona_sucursal,
        v_nombre_proveedor,
        v_producto,
        v_tipo_producto,
        v_precio_unitario,
        v_cantidad_producto,
        v_tipo_pago,
        v_subtotal_venta,
        v_fecha_venta
    );
   

    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_venta_productos
AFTER INSERT ON ventas_productos
FOR EACH ROW
EXECUTE FUNCTION addVenta();

select *from h_ventas