CREATE DATABASE IF NOT EXISTS sa_db;
USE sa_db;

create table usuario
(
	id int auto_increment primary key ,
	name varchar(60) not null,
	lastname varchar(60) not null,
	email varchar(60) not null,
	address varchar(100) not null
);

insert into usuario(name, lastname, email, address)  values ('Erick', 'Tejaxun','erickteja@gmail.com','Zona 10 Guatemala'),
                                                            ('Juan Carlos', 'Tejaxun','jctx@gmail.com','Zona 12 Guatemala'),
                                                            ('Edgar', 'Ruano','edgarruano@gmail.com','Chimaltenango'),
                                                            ('Juan Pablo', 'Estrada','jpestrada@gmail.com','Zona 12, Panajachel'),
                                                            ('José', 'Márquez','josemarquez@gmail.com','Antigua Guatemala'),
                                                            ('Luis José', 'Paredes','luisparedes@gmail.com','Chiquimula');
select * from usuario;