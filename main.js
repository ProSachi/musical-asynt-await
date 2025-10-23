
// 1. Selección de Nodos DOM
const boton = document.getElementById('btn-cita');
const textoCita = document.getElementById('texto-cita');
const historialContainer = document.getElementById('historial-chistes');

// Variable para llevar el contador de chistes
let contadorChistes = 0;

// 2. Declarar la función 'async' para obtener los datos
async function obtenerCita() {
  const url = 'https://api.chucknorris.io/jokes/random'; // API de citas gratuitas

  // 3. Usar 'try...catch' para el manejo de errores
  try {
    // 4. Usar 'await' para la petición 'fetch'
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar el mal chiste');
    }

    // 5. Usar 'await' para el '.json()'
    const datos = await respuesta.json();

    // Guardar el chiste anterior si existe y no es el mensaje inicial
    const chisteActual = textoCita.innerText;
    if (chisteActual && chisteActual !== 'Presiona el botón para una nueva dosis de Chuck Norris...') {
      agregarChisteAlHistorial(chisteActual);
    }

    // 6. Manipular el DOM con los datos recibidos
    textoCita.innerText = datos.value;
    textoCita.style.color = ''; // Resetear el color en caso de error previo

  } catch (error) {
    // 7. Manejar el error
    textoCita.innerText = 'Error al cargar la cita. Intenta de nuevo.';
    textoCita.style.color = 'red';
  }
}

// Función para agregar el chiste anterior al historial
function agregarChisteAlHistorial(chiste) {
  contadorChistes++;
  
  // Crear el elemento de la nueva tarjeta
  const tarjetaChiste = document.createElement('div');
  tarjetaChiste.className = 'historial-item';

  
  // Agregar contenido a la tarjeta
  tarjetaChiste.innerHTML = `
    <div class="historial-numero">#${contadorChistes}</div>
    <p class="historial-texto">${chiste}</p>
  `  ;
  
  // Insertar la nueva tarjeta al principio del historial (los más recientes primero)
  historialContainer.insertBefore(tarjetaChiste, historialContainer.firstChild);
  
  // Agregar animación de entrada
  setTimeout(() => {
    tarjetaChiste.classList.add('aparecer');
  }, 10);
}

// 8. Añadir el Event Listener al botón
boton.addEventListener('click', obtenerCita);
