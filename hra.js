import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4' //funkce findWinner

let currentPlayer = "circle"; 

const button = document.querySelectorAll(".hraci-pole"); //všechna políčka na herní ploše
let playerElement = document.querySelector(".prave-hraje"); 


button.forEach((button) => {
button.addEventListener("click", (event) => {         
  if(currentPlayer === "circle") {                
    button.classList.add("board_field--circle");
    currentPlayer = "cross";
    playerElement.innerHTML = `Hraje: <img src="cross--white.svg">`;
    
  } else  {
    button.classList.add("board_field--cross");
    playerElement.innerHTML =`Hraje: <img src="circle.svg"> `;
    currentPlayer = "circle";
    }
  button.disabled = true; //na toto políčko už znovu nejde kliknout                   


//Získání aktuálního stavu herního pole
const herniPole = Array.from(document.querySelectorAll(".hraci-pole")).map((btn) => {
  if(btn.classList.contains("board_field--circle")) return"o";
  if(btn.classList.contains("board_field--cross")) return "x";
  return"_";
});

//Kontrola vítěze
const vitez = findWinner(herniPole);
if (vitez=== "o" || vitez=== "x" ) {
  setTimeout(() => {
    alert(`Vyhrál hráč se symbolem ${vitez}.`)
    location.reload(); //Restart hry po oznámení vítěze
  }, 200);
}
});
});

//Restart hry
const restartLink = document.querySelector (".znovu");
restartLink.addEventListener("click", (event) => {
  const response = confirm("Opravdu chceš restartovat hru?");
  if (!response) {
    event.preventDefault();
  }
});



