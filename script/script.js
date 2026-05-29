import { supabase } from "./supabase.js"

const album = document.getElementById('album')
const sectionGrupoTitulo = document.getElementById('sectionGrupoTitulo')
const btnToggleMenu = document.getElementById('toggleMenu')

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
    const album = await consultarEquipos();
    const catalogoPostales = await consultarPostales();
    const postalesPegadas = await consultarPostalesPegadas();
    
    if(!album || !catalogoPostales || !postalesPegadas) return

    renderizarAlbum(album, catalogoPostales, postalesPegadas);    
});

function renderizarAlbum(gruposAlbum, postalesAlbum, postalesPegadasAlbum) {
// Se procede a rendereizar cada uno de los grupos.
    album.innerHTML = ''
    
    gruposAlbum.forEach(grupo => {        
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
        let contenedorEquipos = document.createElement('div')
        contenedorEquipos.classList = 'grupo__contenedor__equipos'

        grupo.equipos.forEach(equipo => {
            let totalPostales = postalesAlbum[equipo.postales].length
            let cantidadPostalesPegadas = postalesPegadasAlbum[equipo.codigo].length
            let porcentajeCompletado = Math.round((cantidadPostalesPegadas / totalPostales) * 100)

            let pegadas = new Set(postalesPegadasAlbum[equipo.codigo])
            
            let grupoEquipo = document.createElement('div')
            grupoEquipo.classList.add('grupo__equipo')

            let nombreImagen = equipo.codigo == 'FIFA' ? 'img/FIFA.png' : `img/${equipo.codigo}.webp`
            
            grupoEquipo.innerHTML = 
            `<div class="equipo__pais">
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
            grupoEquipo.querySelectorAll('.completado__barra__inferior').forEach(item => {
                var barra = item.querySelector('.barra__superior')                
                barra.style.setProperty('--width', `${porcentajeCompletado}%`);
                barra.style.width = `${porcentajeCompletado}%`
            });
            
            let postalesEquipo = postalesAlbum[equipo.postales];
            let equipoPostales = document.createElement('div')
            equipoPostales.classList.add('equipo__postales');

            postalesEquipo.forEach(numPostal => {
                let clasesCSS = 'postal', tituloPostal = ''
                if(equipo.postales == 'equipos') {
                    clasesCSS += numPostal == 1 ? ' postal__escudo' : ''
                    clasesCSS += numPostal == 13 ? ' postal__equipo' : ''

                    tituloPostal = numPostal == 1 ? 'Escudo' : ''
                    tituloPostal += numPostal == 13 ? 'Foto Equipo' : ''
                }
                
                let postalPegada = pegadas.has(numPostal)
                clasesCSS += postalPegada ? ' postal__marcada' : ''

                equipoPostales.innerHTML += `
                    <div class="${clasesCSS}" title="${tituloPostal}">${numPostal}</div>
                `
            })
            
            equipoPostales.querySelectorAll('.postal').forEach(postal => {
                postal.addEventListener('click', async ()=> {
                    let respuestaActualizacion = 0;
                    let postalSelected = postal.innerText;
                    postalSelected = parseInt(postalSelected);

                    if(postal.classList.contains('postal__marcada')) {
                        postalesPegadasAlbum[equipo.codigo] = postalesPegadasAlbum[equipo.codigo].filter(n => n !== parseInt(postalSelected));
                    }else {                        
                        postalesPegadasAlbum[equipo.codigo].push(parseInt(postalSelected));
                    }
                    
                    respuestaActualizacion = await actualizarPostalesPegadas(equipo.codigo, postalesPegadasAlbum[equipo.codigo]);
                    if(respuestaActualizacion == 200) {
                        actualizarContadores(postal, grupoEquipo, equipo, postalesAlbum[equipo.postales].length, postalesPegadasAlbum[equipo.codigo].length);
                        postal.classList.toggle('postal__marcada');
                    }else {
                        alert("Ha ocurrido un problema a la hora de marcar la postal como pegada.");
                    }
                });
            });

            grupoEquipo.append(equipoPostales)
            contenedorEquipos.appendChild(grupoEquipo)
        });

        contenedorGrupo.append(contenedorEquipos)
        album.appendChild(contenedorGrupo);        
    });   
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