const express = require('express');
const { json } = require('express');
var http = require('https');
var querystring = require('querystring');
var request = require('request');
const { resolve } = require('path');
const app = express();
app.use( express.json() );
app.use(express.urlencoded());

var PORTRESTAURANTE = 5000;
var PORTREPARTIDOR  = 5600;
var PORTCLIENTE     = 5800;
var PORTEBS         = 6000;

var pedidos = [];


async function simularEntregaPedidos(codigo)
{
    console.log('El pedido '+codigo+ ' ha sido recogido');
    var contador = 0;
    while(contador<6)
    {
        var resultado = await simularTiempoEntrega();
        console.log("El pedido "+codigo+" llegará en "+(30-(contador*5))+" minutos.");
        contador++;        
    }
    console.log("----------------------El pedido "+codigo+" ha sido entregado.-----------");
    pedidos.pop();
    notificarEntregaRestaurante(codigo);
    notificarEntregaCliente(codigo);

}

function simularTiempoEntrega()
{
    return new Promise(resolve=>
        {
            setTimeout(() => {
                resolve(true);
            } , 2000 );
        
    });
}


/**
 * 
 * @param {*} codigo del pedido
 */
var notificarEntregaRestaurante = function(codigo)
{
    var host = 'localhost';
    var port = PORTEBS;
    var path = '/restaurante/pedido/status/close/'+codigo;

    var options = 
    {
        uri: 'http://'+host+':'+port+path,        
        form:
        {
            codigo: codigo,            
        },
        body:    "codigo="+codigo
    };

    /*
    Ahora enviamos la petición post
     */    
    var req = request.get( options, (err, res, body)=>
    {
        if(err)
        {
            console.error('Peticion HTTP hacia el restaurante fallida\t'+err);
        }
        else
        {
            console.error('Peticion HTTP hacia el restaurante exitosa\t');            
        }
    });

}



/**
 * Esta función tiene como objetivo notificar al cliente que su pedido ha sido entregado. 
 * @param {*} codigo Codigo del pedido que se está manejando.
 */
var notificarEntregaCliente = function(codigo)
{
    var host = 'localhost';
    var port = PORTEBS;
    var path = '/cliente/notificacion/'+codigo;

    var options = 
    {
        uri: 'http://'+host+':'+port+path,        
        form:
        {
            codigo: codigo,            
        },
        body:    "codigo="+codigo
    };

    /*
    Ahora enviamos la petición post
     */    
    var req = request.get( options, (err, res, body)=>
    {
        if(err)
        {
            console.error('Peticion HTTP hacia el cliente fallida\t'+err);
        }
        else
        {
            console.error('Peticion HTTP hacia el cliente exitosa\t');            
        }
    });
}


/**
 * Endpoint para indicarle al repartidor que puede recoger el pedido.
 */
app.post('/pedido/recoger', (req, res)=>
{
    var codigo = req.body.codigo; 
    pedidos.push(codigo);
    var mensaje = '***********Se le ha notificado al repartidor que puede recoger el pedido. Código: '+codigo + '************';    
    console.log(mensaje);    
    console.log('Lista de pedidos\t'+pedidos);
    res.send(mensaje); 
    simularEntregaPedidos(codigo);
});




/**
 * Este método tiene como objetivo enviar el mensaje al restaurante de que el 
 * pedido que se le ha entregado al repartidor ha sido entregado exitosamente. 
 * @param {*} codigo Pedido a entregar
 */
var entregar = function(codigo)
{
    var host = 'localhost';
    var port = PORTEBS;
    var path = '/pedido/update';

    var options = 
    {
        uri: 'http://'+host+':'+port+path,  
        form:
        {
            codigo: codigo,            
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



//app.listen(process.env.PORTRESTAURANTE, ()=>)
app.listen(PORTREPARTIDOR,()=>
{
    console.log('Iniciando micro servicio Repartidor. Puerto '+PORTREPARTIDOR);
});