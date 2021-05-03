# Configuración del proveedor
provider "google" {
  credentials = file("poised-diagram-177008-fe46e00dd828.json")
  project = "poised-diagram-177008"
  region  = "us-east1"  
}


# Creamos el firewall y establecemos las reglas 
resource "google_compute_firewall" "instance" {
  name    = "terraform-servidor-web-instance"
  network = "default"

  source_ranges = ["0.0.0.0/0"]

  allow {
    protocol = "tcp"
    ports    = ["8080"]
  }
}

# Creamos una nueva instancia (VM)
resource "google_compute_instance" "servidor-web" {
  name          = "servidor-web"
  machine_type  = "f1-micro"
  zone          = "us-east1-b"
  
  boot_disk {
    initialize_params {
      image = "ubuntu-1804-lts"
    }
  }
  
  network_interface {
    network = "default"

    access_config {
      // Ephemeral IP La IP va a ser efímera
    }
  }
  
  tags = ["terraform-despliegue-sa-practica11"]
  
  metadata_startup_script = "echo 'SA 2021, Practica 10 IaC' > index.html ; nohup busybox httpd -f -p 8080 &"
}

# Output variable: Obtenemos la IP pública que se le ha dado a nuestra instancia
output "public_ip" {
  value = "${google_compute_instance.servidor-web.network_interface.0.access_config.0.nat_ip}"
}