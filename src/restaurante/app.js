const express = require('express');
const { json } = require('express');
var http = require('https');
var querystring = require('querystring');
var request = require('request');
var bodyParser = require('body-parser');
var pedido = require('./utils/pedidos');

const app = express();
app.use( express.json() );
app.use(express.urlencoded());


var PORTRESTAURANTE = 5000;
var PORTREPARTIDOR  = 5600;
var PORTCLIENTE     = 5800;
var PORTEBS         = 6000;
var pedidos = [];
var contadorPedido = 0;

var pedidoInicial = new pedido.pedido('PD001',0);
pedidoInicial.addDetail(new pedido.Detalle('BD001',20));

var pedido2 = new pedido.pedido('PD002',1);
pedido2.addDetail(new pedido.Detalle('BD002',20));
pedidos.push(pedidoInicial);
pedidos.push(pedido2);

/**
 * 
 * @param {*} codigo del pedido
 */
var avisarRepartidor = function(codigo)
{
    var host = 'localhost';
    var port = PORTEBS;
    var path = '/repartidor/pedido/recoger';

    var options = 
    {
        uri: 'http://'+host+':'+port+path,        
        form:
        {
            codigo: codigo,            
            id: codigo,  
        }
    };

    /*
    Ahora enviamos la petición post
     */    
    var req = request.post( options, (err, res, body)=>
    {
        if(err)
        {
            console.error('Peticion HTTP fallida\t'+err);
        }
        else
        {
            console.error('Peticion HTTP exitosa\t');
            console.log(body);
        }
    });

}


async function simularPreparacionPedido(codigo)
{

    var pedido = pedidos[0];
    Object.keys(pedidos).map((item)=>
    {
        var ped = pedidos[item];              
        if(ped.codigo == codigo)
        {
            pedido =   ped;                     
        }

    });

    console.log('El pedido '+codigo+ '. Estado: '+pedido.status);
    var contador = 0;
    while(contador<3)
    {
        var resultado = await simularTiempos();    
        pedido.actualizarStatus();  
        console.log('El pedido '+codigo+ '. Estado: '+pedido.status);  
        contador++;        
    }   
    avisarRepartidor(codigo);
}


function simularTiempos()
{
    return new Promise(resolve=>
        {
            setTimeout(() => {
                resolve(true);
            } , 2000 );
        
    });
}




app.get('/', (req,res) => 
{
    return res.send('Micro servicio Restaurantes');
});


/**
 * Endpoint para obtener datos de un pedido.
 */
app.get('/obtener/:id', (req, res)=>
{
    if(req.params['id'] =='all')
    {
        return res.json(restaurantes);
    }
    else
    {        
        return res.json(restaurantes[req.params['id']]);
        //return res.json({"codigo":"No existe el código solicitado"});        
    }
    
});


/**
 * Endpoint para la recepción de pedido por parte del cliente.
 */
app.get('/pedido/:pedido', (req, res)=>
{
    var pedido = req.params['pedido'];
    console.log('Recibiendo pedido No. '+pedido);
    if(pedido!=null)
    {
        pedidos.push(pedido);
        simularPreparacionPedido(pedido);
    }
    return res.json(restaurantes);
});


/**
 * Endpoint para actualizar el estado de un pedido
 * 
 */
app.post('/pedido/status', (req,res)=>
{
    //var idPedido = req.body.codigo;
    var idPedido = contadorPedido;
    var pedido = pedidos[idPedido];
    var encontrado = false;
    //console.log(idPedido);

    Object.keys(pedidos).map((item)=>
    {
        var ped = pedidos[item];
        //console.log(ped.codigo +'=='+ idPedido);        
        if(ped.codigo == idPedido)
        {            
            ped.actualizarStatus();        
            console.log("Se ha actualizado el estado del pedido "+ped.codigo + ' al estado '+ped.status);
            encontrado = true;
            return res.json
            (
                {
                    "id":idPedido,
                    "status": pedido.status
                }
            );            
        }

    });

    if(!encontrado)
    {
        var mensaje = 'No se ha encontrado el pedido solicitado.';
        console.log(mensaje);
        return res.send(mensaje);
    }
});



/**
 * Endpoint para poder indicar al restaurante que el pedido 
 * ha sido entregado por parte del repartidor
 */
app.get('/pedido/status/close/:codigo', (req,res)=>
{
    var mensaje = 'El pedido ' +req.params['codigo']+' ha sido completado';
    console.log(mensaje);    
});

/**
 * Endpoint para consultar al restaurante sobre el estado del pedido.
 * 
 */
app.post('/pedido/update', (req,res)=>
{
    var idPedido = req.body.id;
    
    var pedido = pedidos[idPedido];    
    if(pedido!=null)
    {
        pedido.actualizarStatus();
        pedido = pedidos[idPedido];    
        return res.json
        (
            {
                "id":idPedido,
                "status": pedido.status
            }
        );
    }
    return res.send('No se ha encontrado el pedido solicitado.');    
});



//app.listen(process.env.PORTRESTAURANTE, ()=>)
app.listen(PORTRESTAURANTE,()=>
{
    console.log('Iniciando micro servicio restuarante. En el puerto '+PORTRESTAURANTE );
});