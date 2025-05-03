import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4' //funkce findWinner

let currentPlayer = "circle"; 

const button = document.querySelectorAll(".hraci-pole"); //všechna políčka na herní ploše
let playerElement = document.querySelector(".prave-hraje"); 


button.forEach((button) => {
button.addEventListener("click", (event) => {         
  if(currentPlayer === "circle") {                
    button.classList.add ("board_field--circle");
    currentPlayer = "cross";
    playerElement.innerHTML = `<img src="cross--white.svg">`;
    //playerElement.textContent = "Hraje: křížek";
  } else if (currentPlayer === 'cross') {
    button.classList.add ("board_field--cross");
    playerElement.innerHTML =`<img src="circle.svg"> `;
    //playerElement.textContent = "Hraje: kolečko";
    currentPlayer = "circle";
  }
  button.disabled = true;              //na toto políčko už znovu nejde kliknout
                      
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



