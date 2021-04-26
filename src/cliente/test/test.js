var assert = require('assert');
//const { json } = require('body-parser');
var expect = require('expect');
var Request = require("request");
var should = require("should");
const { apagar } = require('../app');

var pedido = require('../app');


var PORTRESTAURANTE = 5000;
var PORTREPARTIDOR  = 5600;
var PORTCLIENTE     = 5800;
var PORTEBS         = 6000;

var codigoPedido = 0001;
var codigoUsuario = 10010;

describe('Pruebas unitarias sobre la clase pedido que contiene la lógica de pedidos',()=>
{
    var tmpPedido = new pedido(codigoUsuario, codigoPedido);
    it('Instancia correcta de la clase pedido', (done)=>
    {        
        tmpPedido.codigo.should.equal(codigoPedido);
        tmpPedido.codigoUsuario.should.equal(codigoUsuario);        
        done();
    });

    it('Verificando el estado inicial del nuevo pedido <<En espera>>',(done)=>
    {
        tmpPedido.status.should.equal('En espera');
        done();
    });

    it('Verificando cambio de estado a <<En preparacion>>',(done)=>
    {
        tmpPedido.actualizarStatus();
        tmpPedido.status.should.equal('En preparación');
        done();
    });

    it('Verificando cambio de estado a <<Enviado, en camino>>',(done)=>
    {
        tmpPedido.actualizarStatus();
        tmpPedido.status.should.equal('Enviado, en camino');
        done();
    });

    it('Verificando cambio de estado a <<Entregado>>',(done)=>
    {
        tmpPedido.actualizarStatus();
        tmpPedido.status.should.equal('Entregado');
        done();
    });

});






/*
describe('Pruebas unitarias sobre el servidor micro servicio ', ()=>
{

    it('Pagina de inicio. Prueba de salud de la página. Debe regresar código 200', (done)=>
    {
        Request.get(            
        {
            url:`http://127.0.0.1:${puerto}/`,
        },
        function(error, response, body)
        {
            console.log(`http://127.0.0.1:${puerto}/`);
            if(!error)
            {
                console.log(response.body.payload);
                response.statusCode.should.equal(200);                               
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });


    it('Pagina de información. Prueba de salud de la página. Debe regresar código 200', (done)=>
    {
        Request.get(            
        {
            url:`http://127.0.0.1:${puerto}/info`,
        },
        function(error, response, body)
        {
            if(!error)
            {
                console.log(response.body.payload);
                response.statusCode.should.equal(200);                               
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });

    it('Pagina de Información. Prueba de payload', (done)=>
    {
        Request.get(            
        {
            url:`http://127.0.0.1:${puerto}/info`,
        },
        function(error, response, body)
        {
            if(!error)
            {
                console.log(response.body.payload);
                expect(response.body).toBe('informacion');                                  
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });



    it('Pagina de error. Prueba de salud de la página. Debe regresar código 200', (done)=>
    {
        Request.get(            
        {
            url:`http://127.0.0.1:${puerto}/error`,
        },
        function(error, response, body)
        {
            if(!error)
            {
                console.log(response.body.payload);
                response.statusCode.should.equal(200);                               
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });

    it('Pagina de error. Prueba de payload', (done)=>
    {
        Request.get(            
        {
            url:`http://127.0.0.1:${puerto}/error`,
        },
        function(error, response, body)
        {
            if(!error)
            {
                console.log(response.body.payload);
                expect(response.body).toBe('error');                                  
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });    
 
  

});
*/