import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4' //funkce findWinner

let currentPlayer = "circle"; 
const boardFields = Array.from(document.querySelectorAll(".hraci-pole"));
console.log("Pole boardFields:", boardFields);
let playerElement = document.querySelector(".prave-hraje"); 
const restartButton = document.querySelector(".znovu");


boardFields.forEach((field) => {
field.addEventListener("click", () => {         
  if(currentPlayer === "circle") {                
    field.classList.add("board_field--circle");
    currentPlayer = "cross";
    playerElement.innerHTML = `Hraje: <img src="cross--white.svg" alt="bílý křížek">`;
    
  } else  {
    button.classList.add("board_field--cross");
    playerElement.innerHTML =`Hraje: <img src="circle.svg" alt="bílé kolečko"> `;
    currentPlayer = "circle";
    }
  field.disabled = true; //na toto políčko už znovu nejde kliknout                   


//Získání aktuálního stavu herního pole
const boardState = boardFields.map((btn) => { 
  if(btn.classList.contains("board_field--circle")) return"o";
  if(btn.classList.contains("board_field--cross")) return "x";
  return"_";
});
console.log("Stav hracího pole:", boardState);

//Kontrola vítěze
const winner = findWinner(boardState);
if (winner === "o" || winner === "x" ) {
  setTimeout(() => {
    alert(`Vyhrál hráč se symbolem ${winner}.`)
    location.reload(); //Restart hry po oznámení vítěze
  }, 200);
} else if (currentPlayer === "cross") {
  console.log("Na tahu je křížek, zkouším získat tah AI");
  getAIMove(boardState).then(({ x, y}) => {
    console.log("Souřadnice z API - x:", x, "y:", y);
     if (typeof x === 'number' && typeof y === 'number') {
    const index =  x + y * 10;
    console.log("vypočítaný index:", index);
    const targetField = boardFields[index];
    if (targetField) {
       targetField.click();
      } else {
   console.error("Chyba:tlačítko na indexu neexistuje pro vypočítaný index", index);
  }
  } else {
    console.error("Chyba: API nevrátilo platné souřadnice tahu.");
  }
});
}
});
});


//Restart hry
restartButton.addEventListener("click", (event) => {
  const response = confirm("Opravdu chceš restartovat hru?");
  if (!response) {
    event.preventDefault();
  }
});


//AI 
const getAIMove = async (board) => {
  console.log("Data odesílaná na API:",{ board: board, player: "x" });
  const response = await fetch("https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",{
  method: "POST",
  headers: {"Content-Type": "application/json" },
  body: JSON.stringify({
    board: board, 
    player: "x"
  })
  });
  const data = await response.json();
  return data;
  
};
