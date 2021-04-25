# Laboratorio Software Avanzado
## Práctica 9

Se toma como base la práctica anterior y se agrega un tercer servicio a la arquitectura para agregar conexión a volúmenes lógicos con docker. 


## Base de datos 1: Contenedor con Imagen Mysql:latest
Una base de datos Mysql con los siguientes datos. 
-   Password root
-   Nombre db: sa_db
-   Puerto: 3007 (host)
-   Ejecuta el script [initscript.sql](./servidor1/initscript.sql) para iniciar la base de datos. 
-   Tiene un volumen lógico en la carpeta [./servidor1/mysql](./servidor1/mysql) donde se almacenarán de forma permanente los datos. 


## Base de datos 2: Contenedor con Imagen Mysql:latest
Una base de datos Mysql con los siguientes datos. 
-   Password root
-   Nombre db: sa_db
-   Puerto: 3008 (host)
-   Ejecuta el script [initscript.sql](./servidor1/initscript.sql) para iniciar la base de datos. 
-   Tiene un volumen lógico en la carpeta [./servidor2/mysql](./servidor1/mysql) donde se almacenarán de forma permanente los datos. 



## Servicio web 
Se ha desarrollado un servicio web que consume la base de datos y muestra el contenido en el 
navegador web. Escrito en Python3.7
Dependencias
-   Flask
-   Mysql connector


Para instalar las librerías necesarias:g
```bash
pip install -r requirements.txt
```

Para ejecutar 

```bash
flask run
```



## Despliegue de la arquitectura del sistema
Se requiere: 

-   Docker 19.03.13
-   Docker-compose 1.27.4

Para desplegar el sistema
```bash
docker-compose up --build
```





# Autor
  Erick Tejaxún
  erickteja@gmail.com
  201213050

