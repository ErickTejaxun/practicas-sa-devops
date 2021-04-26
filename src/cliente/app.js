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

var cliente_dir = "servidor-cliente";
var esb_dir = "servidor-esb";
var repartidor_dir = "servidor-repartidor";
var restaurante_dir = "servidor-restaurante";

/**
 * 
 * @param {*} codigo  Codigo del pedido que se ha registrado y se envía al restaurante.
 */
var enviarPedidoRestaurante = function(codigo)
{
    var host = esb_dir;
    var port = PORTEBS;
    var path = '/restaurante/pedido/'+codigo;

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
    var req = request.get( options, (err, res, body)=>
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


/**
 * Endpoint para registrar el pedido. 
 * Se le notifica al restaurante el pedido realizado por el cliente
 * @param {*} codigo para su preparación.
 * 
 */

app.get('/pedido/:codigo', (req, res)=>
{
    var codigo = req.params['codigo'];
    enviarPedidoRestaurante(codigo);  
    var mensaje = "\n---------------------\nSe ha comenzado su pedido el pedido: " + codigo+ ".\n---------------------\n";    
    console.log(mensaje);      
    res.send(mensaje);
});


/**
 * Endpoint para notificar al cliente que el repartidor ha entregado 
 * el pedido. 
 * { codigo } el código del pedido
 */
app.get('/pedido/notificacion/:codigo', (req, res)=>
{
    var codigo = req.params['codigo'];    
    var mensaje = "\n---------------------\nConfirmación de pedido " + codigo+ " recibido.\n---------------------\n";
    console.log(mensaje);
    res.send(mensaje);
});


app.listen(PORTCLIENTE,()=>
{
    console.log('Iniciando micro servicio Cliente. Puerto '+PORTCLIENTE);
});

