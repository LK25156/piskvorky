import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4' //funkce findWinner

let currentPlayer = "circle"; 


const button = document.querySelectorAll(".hraci-pole"); //všechna políčka na herní ploše
let playerElement = document.querySelector(".prave-hraje"); 


button.forEach((button) => {
button.addEventListener("click", (event) => {         
  if(currentPlayer === "circle") {                
    button.classList.add("board_field--circle");
    currentPlayer = "cross";
    playerElement.innerHTML = `Hraje: <img src="cross--white.svg" alt="bílý křížek">`;
    
  } else  {
    button.classList.add("board_field--cross");
    playerElement.innerHTML =`Hraje: <img src="circle.svg" alt="bílé kolečko"> `;
    currentPlayer = "circle";
    }
  button.disabled = true; //na toto políčko už znovu nejde kliknout                   


//Získání aktuálního stavu herního pole
const board = Array.from(document.querySelectorAll(".hraci-pole")).map((btn) => {  //herniPole puvodne
  if(btn.classList.contains("board_field--circle")) return"o";
  if(btn.classList.contains("board_field--cross")) return "x";
  return"_";
});

//Kontrola vítěze
const vitez = findWinner(board);
if (vitez=== "o" || vitez=== "x" ) {
  setTimeout(() => {
    alert(`Vyhrál hráč se symbolem ${vitez}.`)
    location.reload(); //Restart hry po oznámení vítěze
  }, 200);
} else if (currentPlayer === "cross") {
  getAIMove(board).then(({ x, y}) => {
    const index = x + y * 10;
    button[index].click();
  });
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


//AI 

const getAIMove = async (board) => {
  const response = await fetch("https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",{
  method: "POST",
  headers: {"Content-Type": "application/json"
  },
  body: JSON.stringify({
    board: board, 
    player: "x"})
  });
  const data = await response.json();
  return data;
  }
