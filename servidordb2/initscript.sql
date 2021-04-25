CREATE TABLE IF NOT EXISTS departamento
(
	codigo VARCHAR(20) NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO departamento(codigo,nombre) VALUES
('VEN','Ventas'),('CONTA','Contabilidad'),('RH','Recursos Humanos'),('COM','Compras'),
('CAL','Calidad');

