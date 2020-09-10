// Variables
const formulario = document.querySelector('#formulario');
const listadoTweets = document.querySelector('#listado');
const contentError = document.querySelector('#mensajes');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando carga el DOM 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        // console.log(tweets);
        listarTweets();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Acceder al textarea del formulario para almacenar lo que escriba en el 
    const tweet = document.querySelector('#tweet').value;

    // Validar que no este vacio o con espacios en blanco l tweet
    if (tweet === "" || tweet === " ") {
        mostrarError('ERROR: El tweet no puede estar vacio!')
        return;
    }

    // Crear un objeto para almacenar el tweet
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir a nuestro arreglo de tweets
    tweets = [...tweets, tweetObj]
    listarTweets();

    // Limpiar el formulario
    formulario.reset();
}

function mostrarError(err) {
    let existeError = contentError.hasChildNodes();

    if (!existeError) {
        const msg = document.createElement('p');
        msg.textContent = err;
        msg.classList.add('alert');
        msg.classList.add('alert-danger');

        contentError.appendChild(msg);

        //Remover el mensaje de error
        setTimeout( () => {
            msg.remove();
        }, 3000);
    }
}

function listarTweets() {

    // Limpiar listado antes de mostrarlo
    limpiarListado();

    if (tweets.length > 0) {
        tweets.forEach( tweetObj => {
            // Creamos un boton para eliminacion
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('fa');
            btnEliminar.classList.add('fa-trash');
            
            
            // Crear funcionalidad para eliminar el tweet
            btnEliminar.onclick = () => {
                eliminarTweet(tweetObj.id);
            }

            // Crear el nuevo elemento
            const li = document.createElement('li');
            li.innerHTML = tweetObj.tweet;

            li.appendChild(btnEliminar);
            listadoTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agregar los tweets al storage
 function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
 }

function limpiarListado() {
    while (listadoTweets.firstChild) {
        listadoTweets.removeChild(listadoTweets.firstChild);
    }
}

function eliminarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    listarTweets();
}