const { series, parallel } = require('gulp');
const zip = require('gulp-zip');
const gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var gulpCopy = require('gulp-copy');
var run = require('gulp-run');

/**
 * Esta función realiza la taread de compresión de archivos de cada uno de los servicios.
 * @param {*} cb Función callback
 */
async function  minificar(cb) 
{	
	await comprimir('cliente');
	await comprimir('esb');
	await comprimir('repartidor');
	await comprimir('restaurante');
	cb();
}

/**
 * Esta función tiene como objetivo miniifcar cada uno de los scripts
 * de cada uno de los microservicios antes de su empaqutado. 
 * @param {*} servicio Nombre del servicio 
 */
function comprimir(servicio)
{
	gulp.src(`src/${servicio}/*.js`,{allowEmpty: true})
	.pipe(uglify())
	.pipe(gulp.dest(`dist/${servicio}/`));
}


/**
 * 
 * @param {*} cb Servicio 
 */
function copiarModules(cb)
{
	copiarModulos('cliente');
	copiarModulos('esb');
	copiarModulos('repartidor');
	copiarModulos('restaurante');
	cb();
}


/**
 * Esta función permite copiar los módulos necesarios en la carpeta destino antes de su 
 * empaquetamiento.
 * @param {*} servicio Servicio a trabajar
 */
function copiarModulos(servicio)
{
	gulp.src([`src/${servicio}/node_modules/**/*`], {base: '.', allowEmpty: true}).pipe(gulp.dest(`dist/${servicio}`));
	//run(`cp -r src/${servicio}/node_modules dist/${servicio}/node_modules`).exec();		
	//await run(`cp -r src/${servicio}/package.json dist/${servicio}/package.json`).exec();	
	/*	
	gulp.src(`src/${servicio}/node_modules/*`)
	.pipe(gulp.dest(`dist/${servicio}/node_modules`));
	*/
}


/**
 * Esta función realiza la tarea de limpieza de la carpeta destino
 * del artefacto que se distribuirá. Limpia la carpeta dist
 * @param {*} cb Función de callback
 */
function limpiarDest(cb)
{
	gulp.src('dist/*', {read: false, allowEmpty: true})
		.pipe(clean());
	console.log('Limpiando carpeta dist.');		
	cb();
}


/**
 * Esta función nos permite empaquetar el código fuente de un microservicio
 * dentro de una carpeta zip para la entrega del artefacto. 
 * @param {*} servicio Nombre del servicio a empaquetar.
 */
function buildService(servicio)
{		
	console.log(`Creando artefacto ${servicio}.zip para su distribución.`);
	gulp.src(`src/${servicio}`, {allowEmpty: true})
		.pipe(zip(`${servicio}.zip`))
		.pipe(gulp.dest(`dist/${servicio}`));
}

/**
 * Esta función realiza la tarea de empaquetamiento de los micro servicios. 
 * @param {*} cb Función callback
 */
function build(cb)
{
	buildService('cliente');
	buildService('esb');
	buildService('repartidor');
	buildService('restaurante');	
	cb();
}

function buildSystem(cb)
{
	console.log(`Creando artefactos para su distribución.`);
	gulp.src(`dist`)
		.pipe(zip(`delivery.zip`))
		.pipe(gulp.dest(`dist/`));	
	cb();
}


exports.build2 = build;
exports.build= buildSystem;
exports.minificar = minificar;
exports.limpiar = limpiarDest;
exports.copiarModules = copiarModules;
exports.default = series(limpiarDest, minificar, build, buildSystem);