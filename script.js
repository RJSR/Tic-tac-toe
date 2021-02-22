  
// Se obtiene el estado del juego y se guarda en una variable
const statusDisplay = document.querySelector('.game--status');

// Declaración de Variables
let juegoActivo = true; // Permite controlar si el juego está funcionando
let jugadorActual = "X"; // Nos dice quien es el jugador actual
let estadoJuego = ["", "", "", "", "", "", "", "", ""]; // Arreglo que contiene el estado del juego

const mensajeGanador = () => `¡El jugador ${jugadorActual} ha ganado!`; // Mensaje ganador
const mensajeEmpate = () => `¡El juego terminó en empate!`; // Mensaje para empate
const jugadorActualTurn = () => `Es el turno de: ${jugadorActual}`; // Mensaje mostrado para el turno de cada jugador

// Modificar el documento para mostrar el mensaje del turno
statusDisplay.innerHTML = jugadorActualTurn();


// Condiciones para Ganar, Combinaciones de casillas para ganar
const CondicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Función para manejar que celda se jugó
function manejoCeldaJugada(celdaClickeada, indiceCeldaClick) {
    estadoJuego[indiceCeldaClick] = jugadorActual;
    celdaClickeada.innerHTML = jugadorActual;
    if ( jugadorActual == "X" ) { // Si el jugador actual es X, asignarle un color
        document.querySelectorAll('.cell')[indiceCeldaClick].style.color = "#6ddccf";
    }else{ // Si es O, asignarle otro color
        document.querySelectorAll('.cell')[indiceCeldaClick].style.color = "#e45826";
    }
}

// Función para cambiar de jugador
function manejoCambioJugador() {
    jugadorActual = jugadorActual === "X" ? "O" : "X";
    statusDisplay.innerHTML = jugadorActualTurn(); // Cambiar el mensaje del turno con el jugador siguiente
}

// Función para validar el resultado
function manejoValidacionResultado() {
    let rondaGanada = false;
    for (let i = 0; i <= 7; i++) {
        const condicionGanar = CondicionesGanadoras[i];
        let a = estadoJuego[condicionGanar[0]];
        let b = estadoJuego[condicionGanar[1]];
        let c = estadoJuego[condicionGanar[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) { // Si existe la combinación de casillas ganadoras
            rondaGanada = true; // Activar la variable de ronda ganadora
            break
        }
    }

    if (rondaGanada) { // Terminar el juego si existe la ronda ganadora
        statusDisplay.innerHTML = mensajeGanador();
        juegoActivo = false;
        return;
    }

    let rondaEmpate = !estadoJuego.includes(""); 
    if (rondaEmpate) { // Terminar el juego si existe un empate
        statusDisplay.innerHTML = mensajeEmpate();
        juegoActivo = false;
        return;
    }

    manejoCambioJugador(); // Luego de terminar una ronda, y aún no finaliza la partida, cambia de jugador.
}


// Función para manejar que celda fue clickeada
function manejoCeldaClickeada(celdaClickeadaEvent) {
    const celdaClickeada = celdaClickeadaEvent.target;
    const indiceCeldaClick = parseInt(celdaClickeada.getAttribute('data-cell-index'));

    if (estadoJuego[indiceCeldaClick] !== "" || !juegoActivo) {
        return;
    }

    manejoCeldaJugada(celdaClickeada, indiceCeldaClick);
    manejoValidacionResultado();
}

// Función para manejar cuando un juego se reinicia
function handleRestartGame() {
    juegoActivo = true; // Iniciar el juego
    jugadorActual = "X"; // Empezar de nuevo con el primer jugador
    estadoJuego = ["", "", "", "", "", "", "", "", ""]; // Reiniciar el estado del juego
    statusDisplay.innerHTML = jugadorActualTurn(); // Mostrar el mensaje del 1er jugador
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); // Reiniciar las casillas
}

// Listeners para la ejecución del programa

// Para cada celda
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', manejoCeldaClickeada));
// Para el botón de reinicio
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);