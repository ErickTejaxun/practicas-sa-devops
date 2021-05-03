# Laboratorio Software Avanzado
## Práctica 12

Esta práctica tiene como objetivo mostrar la utilización de Terraform 
para la implementación de la práctica de Infraestructura como código. 

Basandonos en la práctica número 11, vamos a utilizar terraform para clonar 
la infraestructura de un despliegue para poder replicarlo.

terraform import google_compute_instance.default projects/poised-diagram-177008/zones/us-east1-b/instances/servidor-web
terraform show -no-color > nuevo/main.tf

![Enlace al video](https://youtu.be/kA4jhUy7yNE)
https://youtu.be/kA4jhUy7yNE


![Final](./terraform-import.png)


### Despliegue de la intraestructura
![Final](./terraform-apply.png)
![Final](./terraform-apply2.png)

### Destrucción de la infraestructura
![Final](./terraform-destroy.png)
![Final](./terraform-destroy2.png)
