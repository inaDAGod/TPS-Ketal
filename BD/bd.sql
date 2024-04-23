-- LLamar a la BD "ketal"
CREATE TABLE cliente (
    nit_cliente int  ,
    nombre varchar(100)  ,
    correo varchar(100)  ,
    telefono int  ,
    CONSTRAINT cliente_pk PRIMARY KEY (nit_cliente)
);

-- Table: empleado
CREATE TABLE empleado (
    id_empleado  SERIAL PRIMARY KEY ,
    id_sucursal int  ,
    nombre varchar(100)  ,
    correo varchar(100)  ,
    superadmi boolean  ,
    password varchar(20) 
);

-- Table: productos
CREATE TABLE productos (
    id_producto  SERIAL PRIMARY KEY  ,
    id_proveedor int  ,
    tipo_producto varchar(100)  ,
    precio_unitario money  ,
    nombre varchar(100)  ,
    fecha_caducidad date  ,
    stock int 
);

-- Table: proveedores
CREATE TABLE proveedores (
    id_proveedor  SERIAL PRIMARY KEY  ,
    nombre varchar(100)  ,
    telefono int 
);

-- Table: sucursal
CREATE TABLE sucursal (
    id_sucursal  SERIAL PRIMARY KEY,
    nombre varchar(100)  ,
    direccion varchar(100) 
);

-- Table: tipo_pago
CREATE TABLE tipo_pago (
    tipo_pago varchar(100)  ,
    CONSTRAINT tipo_pago_pk PRIMARY KEY (tipo_pago)
);

-- Table: tipo_producto
CREATE TABLE tipo_producto (
    tipo_producto varchar(100)  ,
    CONSTRAINT tipo_producto_pk PRIMARY KEY (tipo_producto)
);

-- Table: ventas
CREATE TABLE ventas (
    id_venta  SERIAL PRIMARY KEY ,
    id_empleado int  ,
    nit_cliente int  ,
    tipo_pago varchar(100)  ,
    fecha_venta date  ,
    total money 
);

-- Table: ventas_productos
CREATE TABLE ventas_productos (
    id_venta int  ,
    id_producto int  ,
    cantidad int  ,
    subtotal money  ,
    CONSTRAINT ventas_productos_pk PRIMARY KEY (id_venta,id_producto)
);

-- foreign keys
-- Reference: empleado_sucursal (table: empleado)
ALTER TABLE empleado ADD CONSTRAINT empleado_sucursal
    FOREIGN KEY (id_sucursal)
    REFERENCES sucursal (id_sucursal)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: productos_proveedores (table: productos)
ALTER TABLE productos ADD CONSTRAINT productos_proveedores
    FOREIGN KEY (id_proveedor)
    REFERENCES proveedores (id_proveedor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: productos_tipo_producto (table: productos)
ALTER TABLE productos ADD CONSTRAINT productos_tipo_producto
    FOREIGN KEY (tipo_producto)
    REFERENCES tipo_producto (tipo_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ventas_cliente (table: ventas)
ALTER TABLE ventas ADD CONSTRAINT ventas_cliente
    FOREIGN KEY (nit_cliente)
    REFERENCES cliente (nit_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ventas_empleado (table: ventas)
ALTER TABLE ventas ADD CONSTRAINT ventas_empleado
    FOREIGN KEY (id_empleado)
    REFERENCES empleado (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ventas_productos_productos (table: ventas_productos)
ALTER TABLE ventas_productos ADD CONSTRAINT ventas_productos_productos
    FOREIGN KEY (id_producto)
    REFERENCES productos (id_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ventas_productos_ventas (table: ventas_productos)
ALTER TABLE ventas_productos ADD CONSTRAINT ventas_productos_ventas
    FOREIGN KEY (id_venta)
    REFERENCES ventas (id_venta)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ventas_tipo_pago (table: ventas)
ALTER TABLE ventas ADD CONSTRAINT ventas_tipo_pago
    FOREIGN KEY (tipo_pago)
    REFERENCES tipo_pago (tipo_pago)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

