class pedido
{
    constructor(codigoUsuario, codigo)
    {
        this.codigoUsuario = codigoUsuario;
        this.detalle = [];
        this.date =  Date.now();
        this.status = 'En espera';
        this.codigo = codigo;
    }

    actualizarStatus()
    {
        switch(this.status)
        {
            case 'En espera':
                this.setPreparando();
            break;
            
            case 'En preparación':
                this.setEnviado();
            break;

            case 'Enviado, en camino':
                this.setEntregado();
            break;
        }
    }


    setPreparando()
    { 
        this.status ='En preparación';
    }

    setEnviado()
    {
        this.status = 'Enviado, en camino';
        //avisarRepartidor(this.codigo);
    }

    setEntregado()
    {
        this.status = 'Entregado';
    }

    //Agregar detalle
    addDetail(detail)
    {
        this.detalle.push(detail);
    }
}

class Detalle
{
    constructor(codeProd, cant)
    {
        this.codigo = codeProd;
        this.cantidad = cant;
    }
}

var productos = 
[
    
    {
        "id": "PF001",
        "name": 'Spaguetti Cavatini',
        "price": 75.05
    }
    ,
    {
        "id": "PF002",
        "name": 'Rissotto con champiñones',
        "price": 44.99
    }
    ,
    {
        "id": "PF003",
        "name": 'Spaguetti a la boloñesa',
        "price": 47.75
    },
    {
        "id": "PF004",
        "name": 'Pizza de pepperoni Personal',
        "price": 52.75
    },
    {
        "id": "PF005",
        "name": 'Pizza Margarita Personal',
        "price": 52.75
    },
    {
        "id": "PF006",
        "name": 'Ravioles',
        "price": 49.99
    },
    {
        "id": "PF007",
        "name": 'Pollo a la parmigiana',
        "price": 37.05
    },
    {
        "id": "PF008",
        "name": 'Lasaña clásica',
        "price": 43.75
    },
    {
        "id": "BF701",
        "name": 'Pepsi Cola',        
        "presentation": 'Lata 355 ml',
        "price": 8.99        
    },
    {
        "id": "BF702",
        "name": 'Seven Up',        
        "presentation": 'Lata 355 ml',
        "price": 8.99        
    },
    {
        "id": "BF703",
        "name": 'Mirinda Naranja',
        "presentation": 'Lata 355 ml',
        "price": 8.99        
    },
    {
        "id": "BF704",
        "name": 'Coca Cola',
        "presentation": 'Lata 355 ml',
        "price": 8.99        
    },
    {
        "id": "BF705",
        "name": 'Cerveza Gallo',
        "presentation": 'Lata 355 ml',
        "price": 11.99        
    }            
];

var restaurantes = 
[
    {
        "codigo": 'GT001',
        "name": "Restaurante Nápoles",
        "address": 'Zona 10'
    },
    {
        "codigo": 'GT003',
        "name": "Pizzería Don Corleone",
        "address": 'Zona 12'
    },    
    {
        "codigo": 'GT005',
        "name": "Restaurante el dragón",
        "address": 'Zona 08'
    }    
];


exports.pedido = pedido;
exports.Detalle = Detalle;
exports.productos = productos;
exports.restaurantes = restaurantes;