let currentPlayer = "circle"; //proměnná, která uchová info, kdo je na tahu

const fields = document.querySelectorAll(".hraci_pole"); //všechna políčka na herní ploše
const playerElement = document.querySelector(".prave_hraje"); //element, kdo právě hraje

for(let i = 0; i < 10;i++) {               //cyklus projde prvních deset políček
fields[i].addEventListener("click", (event) => {         //posluchač události, až na něj někdo klikne
  const field  = event.target;    //proměnná field, na kt. políčko uživatel klikl

  if(currentPlayer === "circle") {                //když je na tahu kolečko, přepíšeš do textu nahoru křížek
    field.classList.add ("board_field--circle");
    playerElement.textContent = "hraje: křížek";
    currentPlayer = "cross";
  } else {
    field.classList.add ("board_field--cross");  //když je na tahu křížek, přepíšeš do textu nahoru kolečko
    playerElement.textContent = "hraje: kolečko";
    currentPlayer = "circle";
  }

  field.disabled = true;              //na toto políčko už znovu nejde kliknout
});
}


//Restart hry

const restartLink = document.querySelector (".game_link");

restartLink.addEventListener("click", (event) => {
  const confirmed = confirm("Opravdu chceš restartovat hru?");
  if (!confirmed) {
    event.preventDefault();
  }
})
