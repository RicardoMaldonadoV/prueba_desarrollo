CREATE TABLE tipo_doc(
   id_tipo_doc NUMBER(2),
   tipo_doc VARCHAR2(5), 
   desc_tipo_doc VARCHAR2(50),
   fecha_crea DATE,
   CONSTRAINT tipo_doc_pk PRIMARY KEY(id_tipo_doc)
);
COMMIT;
CREATE TABLE departamento(
   id_departamento NUMBER(2),
   nombre VARCHAR2(50),
   CONSTRAINT departamento_pk PRIMARY KEY(id_departamento)
);
COMMIT;
CREATE TABLE ciudad(
   id_ciudad NUMBER(5),
   nombre VARCHAR2(50),
   id_departamento NUMBER(2),
   CONSTRAINT ciudad_pk PRIMARY KEY(id_ciudad),
   CONSTRAINT ciudad_departamento_fk FOREIGN KEY(id_departamento)
	REFERENCES departamento (id_departamento)
);
COMMIT;
CREATE TABLE barrio(
   id_barrio NUMBER(10),
   nombre VARCHAR2(50),
   id_ciudad NUMBER(5),
   CONSTRAINT barrio_pk PRIMARY KEY(id_barrio),
   CONSTRAINT barrio_ciudad_fk FOREIGN KEY(id_ciudad)
	REFERENCES ciudad (id_ciudad)
);
COMMIT;
CREATE TABLE tienda(
   id_tienda NUMBER(3),
   nombre VARCHAR2(50),
   id_departamento NUMBER(2),
   id_ciudad NUMBER(5),
   id_barrio NUMBER(10),
   CONSTRAINT tienda_pk PRIMARY KEY(id_tienda),
   CONSTRAINT tienda_departamento_fk FOREIGN KEY(id_departamento)
	REFERENCES departamento (id_departamento),
   CONSTRAINT tienda_ciudad_fk FOREIGN KEY(id_ciudad)
	REFERENCES ciudad (id_ciudad),
   CONSTRAINT tienda_barrio_fk FOREIGN KEY (id_barrio)
	REFERENCES barrio (id_barrio)
);
COMMIT;
CREATE TABLE cliente(
   id_cliente NUMBER(10),
   p_nombre VARCHAR2(50),
   s_nombre VARCHAR2(50),
   p_apellido VARCHAR2(50),
   s_apellido VARCHAR2(50),
   id_tipo_doc NUMBER(2),
   documento VARCHAR2(20),
   celular NUMBER(12),
   correo VARCHAR2(30),
   direccion VARCHAR2(50),
   id_departamento NUMBER(2),
   id_ciudad NUMBER(5),
   id_barrio NUMBER(10),
   CONSTRAINT cliente_pk PRIMARY KEY(id_cliente),
   CONSTRAINT cliente_tipo_doc_fk FOREIGN KEY (id_tipo_doc)
	REFERENCES tipo_doc (id_tipo_doc),
   CONSTRAINT cliente_departamento_fk FOREIGN KEY (id_departamento)
	REFERENCES departamento (id_departamento),
   CONSTRAINT cliente_ciudad_fk FOREIGN KEY (id_ciudad)
	REFERENCES ciudad (id_ciudad),
   CONSTRAINT cliente_barrio_fk FOREIGN KEY (id_barrio)
	REFERENCES barrio (id_barrio)
);
COMMIT;
CREATE TABLE mecanico(
   id_mecanico NUMBER(10),
   p_nombre VARCHAR2(50),
   s_nombre VARCHAR2(50),
   p_apellido VARCHAR2(50),
   s_apellido VARCHAR2(50),
   id_tipo_doc NUMBER(2),
   documento VARCHAR2(20),
   celular NUMBER(12),
   correo VARCHAR2(30),
   direccion VARCHAR2(50),
   id_departamento NUMBER(2),
   id_ciudad NUMBER(5),
   id_barrio NUMBER(10),
   estado NUMBER (1),
   id_tienda  NUMBER(3),
   CONSTRAINT mecanico_pk PRIMARY KEY(id_mecanico),
   CONSTRAINT mecanico_tipo_doc_fk FOREIGN KEY (id_tipo_doc)
	REFERENCES tipo_doc (id_tipo_doc),
   CONSTRAINT mecanico_departamento_fk FOREIGN KEY (id_departamento)
	REFERENCES departamento (id_departamento),
   CONSTRAINT mecanico_ciudad_fk FOREIGN KEY (id_ciudad)
	REFERENCES ciudad (id_ciudad),
   CONSTRAINT mecanico_barrio_fk FOREIGN KEY (id_barrio)
	REFERENCES barrio (id_barrio),
   CONSTRAINT mecanico_tienda_fk FOREIGN KEY (id_tienda)
	REFERENCES tienda (id_tienda)
);
COMMIT;
CREATE TABLE vehiculo(
   id_vehiculo NUMBER(10),
   placa VARCHAR2(10),
   marca VARCHAR2(50),
   modelo NUMBER(4),
   color VARCHAR2(50),
   id_cliente NUMBER(10),
   status_vehiculo NUMBER(1),
   fecha_registro DATE,
   CONSTRAINT vehiculo_pk PRIMARY KEY(id_vehiculo),
   CONSTRAINT vehiculo_cliente_fk FOREIGN KEY (id_cliente)
	REFERENCES cliente (id_cliente)
);
COMMIT;
CREATE TABLE producto(
   id_producto NUMBER(6),
   descripcion VARCHAR2(100),
   precio NUMBER(8),
   CONSTRAINT producto_pk PRIMARY KEY(id_producto)
);
COMMIT;
CREATE TABLE inventario(
   id_tienda  NUMBER(3),
   id_producto NUMBER(6),
   stock NUMBER(5),
   CONSTRAINT inventario_tienda_fk FOREIGN KEY (id_tienda)
	REFERENCES tienda (id_tienda),
   CONSTRAINT inventario_producto_fk FOREIGN KEY (id_producto)
	REFERENCES producto (id_producto)
);
COMMIT;
CREATE TABLE servicio(
   id_servicio NUMBER(6),
   descripcion VARCHAR2(100),
   valor_min NUMBER(7),
   valor_man NUMBER(7),
   CONSTRAINT servicio_pk PRIMARY KEY(id_servicio)
);
COMMIT;
CREATE TABLE mantenimiento(
   id_mantenimiento NUMBER(10),
   id_tienda  NUMBER(3),
   estado VARCHAR2(20),
   id_vehiculo NUMBER(10),
   id_cliente NUMBER(10),
   descripcion VARCHAR2(200),
   presupuesto NUMBER(7),
   url_pictures VARCHAR2(100),
   CONSTRAINT mantenimiento_pk PRIMARY KEY(id_mantenimiento),
   CONSTRAINT mantenimiento_vehiculo_fk FOREIGN KEY (id_vehiculo)
	REFERENCES vehiculo (id_vehiculo),
   CONSTRAINT mantenimiento_cliente_fk FOREIGN KEY (id_cliente)
	REFERENCES cliente (id_cliente),
   CONSTRAINT mantenimiento_tienda_fk FOREIGN KEY (id_tienda)
	REFERENCES tienda (id_tienda)
);
COMMIT;
CREATE TABLE mantenimiento_producto(
   id_mantenimiento NUMBER(10),
   id_producto NUMBER(6),
   Cantidad NUMBER(3),
   CONSTRAINT mantenimiento_producto_mantenimiento_fk FOREIGN KEY (id_mantenimiento)
	REFERENCES mantenimiento (id_mantenimiento),
   CONSTRAINT mantenimiento_producto_producto_fk FOREIGN KEY (id_producto)
	REFERENCES producto (id_producto)
);
COMMIT;
CREATE TABLE mantenimiento_servicio(
   id_mantenimiento NUMBER(10),
   id_mecanico NUMBER(10),
   id_servicio NUMBER(6),
   valor_mno_obra NUMBER(7),
   CONSTRAINT mantenimiento_servicio_mecanico_fk FOREIGN KEY (id_mecanico)
	REFERENCES mecanico (id_mecanico),
   CONSTRAINT mantenimiento_servicio_mantenimiento_fk FOREIGN KEY (id_mantenimiento)
	REFERENCES mantenimiento (id_mantenimiento),
   CONSTRAINT mantenimiento_servicio_servicio_fk FOREIGN KEY (id_servicio)
	REFERENCES servicio (id_servicio)
);
COMMIT;
CREATE TABLE factura(
   id_factura NUMBER(5),
   fecha_factura DATE,
   id_cliente NUMBER(10),
   id_mecanico NUMBER(10),
   id_mantenimiento NUMBER(10),
   id_tienda  NUMBER(3),
   sub_total NUMBER(10),
   descuento NUMBER(10),
   detalle_descuento VARCHAR2(100),
   total NUMBER(10),
   iva NUMBER(10),
   CONSTRAINT factura_pk PRIMARY KEY(id_factura),
   CONSTRAINT factura_cliente_fk FOREIGN KEY (id_cliente)
	REFERENCES cliente (id_cliente),
   CONSTRAINT factura_mecanico_fk FOREIGN KEY (id_mecanico)
	REFERENCES mecanico (id_mecanico),
   CONSTRAINT factura_mantenimiento_fk FOREIGN KEY (id_mantenimiento)
	REFERENCES mantenimiento (id_mantenimiento),
   CONSTRAINT factura_tienda_fk FOREIGN KEY (id_tienda)
	REFERENCES tienda (id_tienda)
);
COMMIT;
--Usuario par la conexión con la Api
CREATE USER DEVBASE IDENTIFIED BY "123456";
GRANT ALL PRIVILEGES TO DEVBASE;
GRANT EXECUTE ANY PROCEDURE TO DEVBASE;
GRANT UNLIMITED TABLESPACE TO DEVBASE;
GRANT CONNECT, RESOURCE TO DEVBASE;

-- Secuencias para el id cliente
CREATE SEQUENCE cliente_seq START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
-- Trigger secuencia cliente
CREATE OR REPLACE TRIGGER al_insertar_cliente BEFORE INSERT ON cliente FOR EACH ROW
BEGIN 
   SELECT cliente_seq.NEXTVAL INTO :NEW.id_cliente FROM dual;
END;
/
-- Secuencias para el id mantenimiento
CREATE SEQUENCE mantenimiento_seq START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
-- Trigger secuencia mantenimiento
CREATE OR REPLACE TRIGGER al_insertar_mantenimiento BEFORE INSERT ON mantenimiento FOR EACH ROW
BEGIN 
   SELECT mantenimiento_seq.NEXTVAL INTO :NEW.id_mantenimiento FROM dual;
END;
/
-- Secuencias para el id vehiculo
CREATE SEQUENCE vehiculo_seq START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
-- Trigger fecha registro carro y id vehiculo
CREATE OR REPLACE TRIGGER al_insertar_vehiculo BEFORE INSERT ON vehiculo FOR EACH ROW
BEGIN 
   SELECT SYSDATE INTO :NEW.fecha_registro FROM dual;
   SELECT vehiculo_seq.NEXTVAL INTO :NEW.id_vehiculo FROM dual;
END;
/

-- DROP TABLE tipo_doc CASCADE CONSTRAINTS;
-- DROP TABLE departamento CASCADE CONSTRAINTS;
-- DROP TABLE ciudad CASCADE CONSTRAINTS;
-- DROP TABLE barrio CASCADE CONSTRAINTS;
-- DROP TABLE tienda CASCADE CONSTRAINTS;
-- DROP TABLE cliente CASCADE CONSTRAINTS;
-- DROP TABLE mecanico CASCADE CONSTRAINTS;
-- DROP TABLE vehiculo CASCADE CONSTRAINTS;
-- DROP TABLE producto CASCADE CONSTRAINTS;
-- DROP TABLE inventario CASCADE CONSTRAINTS;
-- DROP TABLE servicio CASCADE CONSTRAINTS;
-- DROP TABLE mantenimiento CASCADE CONSTRAINTS;
-- DROP TABLE mantenimiento_producto CASCADE CONSTRAINTS;
-- DROP TABLE mantenimiento_servicio CASCADE CONSTRAINTS;
-- DROP TABLE factura CASCADE CONSTRAINTS;