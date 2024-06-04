DO $$
DECLARE
    v_id_venta  int;
    v_nit_cliente int;
    v_nombre_sucursal varchar(100);
    v_id_empleado int;
    v_nombre_empleado varchar(100);
    v_zona_sucursal varchar(100);
    v_nombre_proveedor varchar(100);
    v_producto varchar(100);
    v_tipo_producto varchar(100);
    v_precio_unitario money;
    v_cantidad_producto int;
    v_tipo_pago varchar(100);
    v_subtotal_venta money;
    v_fecha_venta date;
BEGIN
    FOR i IN 1..10 LOOP
        v_id_venta := i;
        
        -- Seleccionar un cliente al azar
        SELECT nit_cliente INTO v_nit_cliente FROM cliente ORDER BY random() LIMIT 1;
        
        -- Seleccionar una sucursal al azar y su zona correspondiente
        SELECT s.nombre, s.direccion INTO v_nombre_sucursal, v_zona_sucursal
        FROM sucursal s
        ORDER BY random() LIMIT 1;
        
        -- Seleccionar un empleado al azar de la sucursal seleccionada
        SELECT e.id_empleado, e.nombre INTO v_id_empleado, v_nombre_empleado
        FROM empleado e
        WHERE e.id_sucursal = (SELECT id_sucursal FROM sucursal WHERE nombre = v_nombre_sucursal)
        ORDER BY random() LIMIT 1;
        
        -- Seleccionar un producto al azar y su información relacionada
        SELECT p.nombre, p.tipo_producto, p.precio_unitario, pr.nombre 
        INTO v_producto, v_tipo_producto, v_precio_unitario, v_nombre_proveedor
        FROM productos p
        JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
        ORDER BY random() LIMIT 1;
        
        -- Generar una cantidad de producto al azar
        v_cantidad_producto := floor(random() * 100 + 1)::int;
        
        -- Seleccionar un tipo de pago al azar
        SELECT tipo_pago INTO v_tipo_pago FROM tipo_pago ORDER BY random() LIMIT 1;
        
        -- Calcular el subtotal de la venta
        v_subtotal_venta := v_precio_unitario * v_cantidad_producto;
        
        -- Generar una fecha de venta al azar en el año 2023
        v_fecha_venta := '2023-01-01'::date + (random() * 365)::int;

        -- Insertar la venta en la tabla h_ventas
        INSERT INTO h_ventas (
            id_venta,
            nit_cliente,
            nombre_sucursal,
            id_empleado,
            nombre_empleado,
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
            v_id_venta,
            v_nit_cliente,
            v_nombre_sucursal,
            v_id_empleado,
            v_nombre_empleado,
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
    END LOOP;
END;
$$ LANGUAGE plpgsql;