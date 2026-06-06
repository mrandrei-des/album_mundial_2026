import { supabase } from "./supabase.js"

const album = document.getElementById('album')
const sectionGrupoTitulo = document.getElementById('sectionGrupoTitulo')
const btnToggleMenu = document.getElementById('toggleMenu')

let albumPostales = [];
let catalogosPostales = [];
let postalesPegadas = [];
const timeOuts = {};

const btnEmergente = document.getElementById('btn_herramienta__emergente__configuracion');
const herramientasEmergentes = document.querySelectorAll('.caja__herramientas__herramienta:not(.herramienta__emergente)');   
const btnLimpiarBusqueda = document.getElementById('btnLimpiarBusqueda');
const btnDescargarFaltantes = document.getElementById('btn__descargar__faltantes');

btnDescargarFaltantes.addEventListener('click', () => {

    
    btnDescargarFaltantes.innerText = 'Iniciando descarga...';
    setTimeout(() => {
        let codigoPais = '';
        let codigoCatalogo = '';
        let postalesFaltantes = {};
        let textoDescarga = 'Postales faltantes por equipo:\n\n';

        albumPostales.forEach(grupo => { 
            let equipos = grupo.equipos;
            equipos.forEach(equipo => {
                codigoPais = equipo.codigo;
                codigoCatalogo = equipo.postales;
                postalesFaltantes[codigoPais] = catalogosPostales[codigoCatalogo].filter(postal => !postalesPegadas[codigoPais].includes(postal));                
            });
        });

        for(let codigo in postalesFaltantes) {
            textoDescarga += `${codigo}: ${postalesFaltantes[codigo].join(', ')}\n`;
        }

        btnDescargarFaltantes.innerText = 'Descargar faltantes';
        copiarAlPortapapeles(textoDescarga);
    }, 1000);
});

async function copiarAlPortapapeles(texto) {
    await navigator.clipboard.writeText(texto);

    // Agregar una notificación visual de que el texto ha sido copiado al portapapeles
    alert('Texto copiado al portapapeles');
}

btnEmergente.addEventListener('click', () => {
    herramientasEmergentes.forEach(herramienta => {
        herramienta.classList.toggle('mostrarHerramientaEmergente');
    });    
    btnEmergente.classList.toggle('btn_herramienta__emergente--activo');
});

btnLimpiarBusqueda.addEventListener('click', () => {
    const inputBusquedaPaises = document.getElementById('paisBusqueda');
    inputBusquedaPaises.value = '';
    btnLimpiarBusqueda.classList.remove('btn_limpiar__busqueda--visible');
});

const inputBusquedaPaises = document.getElementById('paisBusqueda');
inputBusquedaPaises.addEventListener('input', (event) => {

    if(event.target.value.trim() === '') btnLimpiarBusqueda.classList.remove('btn_limpiar__busqueda--visible');
    else btnLimpiarBusqueda.classList.add('btn_limpiar__busqueda--visible');
    
    if(event.target.value.trim().length >= 3) {
        console.log(event.target.value.trim());
    }else if(event.target.value.trim().length == 0) {
        console.log('No hay nada escrito');
    }
});

async function consultarEquipos() {
    const { data, error } = await supabase
        .from('equipos_x_grupo')
        .select('*')

    if (error) {
        console.error('Error de conexión:', error.message)
    }

    if(data.length > 0) {
        let albumFormateado = formatearRespuestaAlbum(data);        
        return albumFormateado.length > 0 ? albumFormateado : [];
    }
    return [];
}

async function consultarPostales() {
    const { data, error } = await supabase
        .from('catalogo_postales')
        .select('*')

    if (error) {
        console.error('Error de conexión:', error.message)
    }else {        
        if(data.length > 0) {                  
            return formatearCatalogoPostales(data); 
        }
    }
    return {};    
}

async function consultarPostalesPegadas() {
    const { data, error } = await supabase
        .from('postales_pegadas')
        .select('*')

    if (error) {
        console.error('Error de conexión:', error.message)
    }else {        
        if(data.length > 0) {                  
            return formatearPostalesPegadas(data); 
        }
    }
    return {};  
}

function formatearRespuestaAlbum(filas) {
    const gruposMap = new Map()

    filas.forEach(fila => {        
        if (!gruposMap.has(fila.codigogrupo)) {
            gruposMap.set(fila.codigogrupo.replaceAll(' ', ''), {
                codigo: fila.codigogrupo,
                equipos: []
            })
        }

        gruposMap.get(fila.codigogrupo.replaceAll(' ', '')).equipos.push({
            codigo: fila.codigo,
            nombre: fila.nombre,
            confederacion: fila.confederacion,
            postales: fila.postales
        })
    })

    return Array.from(gruposMap.values());
}

function formatearCatalogoPostales(catalogoPostales){

    let postalesFormateadas = {};

    catalogoPostales.forEach(catalogo => {
        let numeroInicio = catalogo.numero_inicio;
        let numeroFin = catalogo.numero_fin;

        let rangoPostales = crearArrayNumeros(numeroInicio, numeroFin);
        postalesFormateadas[catalogo.codigo] = rangoPostales;        
    });

    return postalesFormateadas;
}

function formatearPostalesPegadas(postalesPegadas){
    let postalesPegadasFormateadas = {};

    postalesPegadas.forEach(equipo => {
        let codigo = equipo.equipo_codigo;
        let listaPegadas = equipo.pegadas;

        postalesPegadasFormateadas[codigo] = listaPegadas;        
    });
    return postalesPegadasFormateadas;
}

function crearArrayNumeros(numeroInicio, numeroFin) {
    return Array.from({ length: numeroFin - numeroInicio + 1 }, (_, i) => i + numeroInicio);
}

document.addEventListener('DOMContentLoaded', async (e)=> {    
    albumPostales = await consultarEquipos();
    catalogosPostales = await consultarPostales();
    postalesPegadas = await consultarPostalesPegadas();
    
    if(!albumPostales || !catalogosPostales || !postalesPegadas) return

    renderizarAlbum();    
});

// Esta función se encarga de renderizar el álbum con toda la información obtenida de la base de datos
function renderizarAlbum() {
// Se procede a rendereizar cada uno de los grupos.
    const contenedorFragmento = document.createDocumentFragment();
    album.innerHTML = ''
    
    // Se crea el contenedor de los grupos con todo su título
    albumPostales.forEach(grupo => {        
        let contenedorGrupo = document.createElement('div')
        contenedorGrupo.classList.add('contenedor__grupo')
        contenedorGrupo.setAttribute('id', grupo.codigo)

        contenedorGrupo.innerHTML = 
        `
            <section class="grupo__contenedor__titulo">
                <div class="titulo__barra"></div>
                <h2 class="titulo__grupo">Grupo ${grupo.codigo}</h2>
            </section>
        `
        // Se renderizan los equipos de ese grupo
        let contenedorEquipos = document.createElement('div');
        contenedorEquipos.classList = 'grupo__contenedor__equipos';

        // Se crea el grupo que contiene 4 equipos excepto el primero que solo es la FIFA
        grupo.equipos.forEach(equipo => {
            let totalPostales = catalogosPostales[equipo.postales].length
            let cantidadPostalesPegadas = postalesPegadas[equipo.codigo].length
            let porcentajeCompletado = Math.round((cantidadPostalesPegadas / totalPostales) * 100)

            let pegadas = new Set(postalesPegadas[equipo.codigo])
            
            let grupoEquipo = document.createElement('div')
            grupoEquipo.classList.add('grupo__equipo')

            let nombreImagen = equipo.codigo == 'FIFA' ? 'img/FIFA.png' : `img/${equipo.codigo}.webp`
            
            // Se crea el equipo
            grupoEquipo.innerHTML = 
            `<div class="equipo__pais" id="${equipo.codigo}">
                <div class="bandera">
                    <img src="${nombreImagen}" alt="Bandera de ${equipo.nombre}">
                </div>
                <div class="pais__informacion">
                    <p class="nombre__pais">${equipo.nombre}</p>
                    <p class="nombre__confederacion">${equipo.confederacion}</p>
                </div>
                <div class="pais__completado">
                    <img class="img_completado" src="img/completado.png" alt="Logo de completado al 100%">
                </div>                
            </div>
            <div class="equipo__progreso">
                <div class="progreso__completado">
                    <span>Completado: </span>
                    <div class="completado__barra__inferior">
                        <div class="barra__superior cargando"></div>
                    </div>
                    <span>
                        <strong class="cantidad">${porcentajeCompletado}%</strong>
                    </span>
                </div>
                <div class="progreso__cantidad">
                    <span>Postales:</span>
                    <span>
                        <strong class="cantidad">${totalPostales}</strong>
                    </span>
                    <span>Pegadas:</span>
                    <span>
                        <strong class="cantidad conseguidas">${cantidadPostalesPegadas}</strong>
                    </span>
                </div>
            </div>
            `

            // Se le da valor a la barra de progreso del país
            grupoEquipo.querySelectorAll('.completado__barra__inferior').forEach(item => {
                var barra = item.querySelector('.barra__superior')                
                barra.style.setProperty('--width', `${porcentajeCompletado}%`);
                barra.style.width = `${porcentajeCompletado}%`
            });
            
            let postalesEquipo = catalogosPostales[equipo.postales];
            let equipoPostales = document.createElement('div')
            equipoPostales.classList.add('equipo__postales');

            // Se crean las postales, 20 por cada equipo
            postalesEquipo.forEach(numPostal => {
                let clasesCSS = 'postal', tituloPostal = ''
                if(equipo.postales == 'equipos') {
                    clasesCSS += numPostal == 1 ? ' postal__escudo' : '';
                    clasesCSS += numPostal == 13 ? ' postal__equipo' : '';

                    tituloPostal = numPostal == 1 ? 'Escudo' : '';
                    tituloPostal += numPostal == 13 ? 'Foto Equipo' : '';
                }
                
                let postalPegada = pegadas.has(numPostal)
                clasesCSS += postalPegada ? ' postal__marcada' : '';

                let divPostal = document.createElement('div');
                divPostal.className = clasesCSS;
                divPostal.setAttribute('title', tituloPostal);
                divPostal.textContent = numPostal;

                divPostal.addEventListener('click', (e) => {
                    // Se actualiza la lista de postales pegadas                    
                    if(divPostal.classList.contains('postal__marcada')) {
                        postalesPegadas[equipo.codigo] = postalesPegadas[equipo.codigo].filter(n => n !== parseInt(numPostal));
                    }else {
                        postalesPegadas[equipo.codigo].push(parseInt(numPostal));
                    }
                    // Se actualizan los contadores en pantalla
                    actualizarContadores(divPostal, grupoEquipo, equipo, catalogosPostales[equipo.postales].length, postalesPegadas[equipo.codigo].length);
                    divPostal.classList.toggle('postal__marcada');
                    
                    if(timeOuts[equipo.codigo]) clearTimeout(timeOuts[equipo.codigo]);

                    // Se presiona una postal, se esperan 2 segundos y se invoca a actualizar la lista de postales pegadas en el proceso
                    timeOuts[equipo.codigo] = setTimeout(async () => {                       
                        postalPresionada(equipo.codigo);
                        delete timeOuts[equipo.codigo];
                    }, 2000);
                });
                equipoPostales.appendChild(divPostal);
            });
            grupoEquipo.append(equipoPostales);
            contenedorEquipos.appendChild(grupoEquipo);
        });
        contenedorGrupo.append(contenedorEquipos);
        contenedorFragmento.appendChild(contenedorGrupo);
    });
    album.appendChild(contenedorFragmento);
}

async function postalPresionada(codigoEquipo) {
    let respuestaActualizacion = await actualizarPostalesPegadas(codigoEquipo, postalesPegadas[codigoEquipo]);
    if(respuestaActualizacion == 200) {
        // Aquí se muestra la notificación
        alert('Los cambios han sido guardados correctamente.');
    }else {
        alert("Ha ocurrido un problema a la hora de marcar la postal como pegada.");
    }
}

async function actualizarPostalesPegadas(codigoEquipo, postalesPegadas) {
    const { data, error, status } = await supabase
        .from('postales_pegadas')
        .update({ pegadas : postalesPegadas})
        .eq('equipo_codigo', codigoEquipo)
        .select('*')

    if (error) {
        console.error('Error de conexión:', error.message)
    }else {        
        return status;
    }
    return -1;  
}

function actualizarContadores(postalSeleccionada, grupoEquipo, equipo, totalPostales, cantidadPostalesPegadas) {
    let porcentajeCompletado = Math.round((cantidadPostalesPegadas / totalPostales) * 100)
    let postalEliminar = postalSeleccionada.innerText;

    // Al quitar la clase y cambiar el width el navegador hace los dos cambios en el mismo momento y por eso no aplica la transition
    grupoEquipo.querySelectorAll('.completado__barra__inferior').forEach(item => {
        item.querySelector('.barra__superior').classList.remove('cargando')

        // Lo que se hace es que se fuerza a que procese a cada uno por aparte y así garantizar que la animación continue
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                item.querySelector('.barra__superior').style.width = `${porcentajeCompletado}%`
            });
        });
    });

    let strPorcentajeProgreso = grupoEquipo.querySelector('.progreso__completado strong.cantidad')
    let imgCompletado = grupoEquipo.querySelector('.pais__completado img.img_completado')

    strPorcentajeProgreso.innerText = `${porcentajeCompletado}%`
    if(porcentajeCompletado == 100) {
        strPorcentajeProgreso.classList.add('equipoCompleto')
        imgCompletado.classList.add('animado')            
    }else {
        strPorcentajeProgreso.classList.remove('equipoCompleto');
        imgCompletado.classList.remove('animado');
    }

    let strCantidadConseguidas = grupoEquipo.querySelector('.progreso__cantidad strong.cantidad.conseguidas')
    strCantidadConseguidas.innerText = cantidadPostalesPegadas
}

btnToggleMenu.addEventListener('click', (e)=> {
    e.stopPropagation();
    const menuGrupos = document.getElementById('menuGrupos');
    btnToggleMenu.innerHTML = !menuGrupos.classList.contains('desplegar__grupos') ? `<i class="fa-solid fa-xmark"></i>` : `<i class="fa-solid fa-bars"></i>`
    menuGrupos.classList.toggle('desplegar__grupos');
});

document.addEventListener('click', (e) => {
    const sectionMenu = document.getElementById('headerPage');
    
    if(!sectionMenu.contains(e.target)) {
        if(menuGrupos.classList.contains('desplegar__grupos')) {
            menuGrupos.classList.remove('desplegar__grupos');            
            btnToggleMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`
        }
    }
});