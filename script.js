/*start RAISSA*/
//container geral do jogo
let containerLig = document.getElementById("lig__container");

//div para escrever se é a vez do Jogador 1 (disco preto) ou do Jogador 2 (disco vermelho);
let lineOfPlayer = document.createElement("div");
lineOfPlayer.setAttribute("id", "lineOfPlayer");
containerLig.appendChild(lineOfPlayer);
lineOfPlayer.innerText = "Player 1";

//div para fazer o disco andar em cima das colunas de acordo com a coluna que for selecionada
let lineDisk = document.createElement("div");
lineDisk.setAttribute("id", "lineDisk");
containerLig.appendChild(lineDisk);

//div do disco que vai andar por cima das colunas de acordo com o click do usuário em cima da coluna selecionada
let diskPlayer = document.createElement("div");
diskPlayer.setAttribute("id", "diskPlayer");
lineDisk.appendChild(diskPlayer);

//div para agrupar as divs do tabuleiro e distribuir com flexCSS
let ligTable = document.createElement("div");
ligTable.setAttribute("id", "ligTable");
containerLig.appendChild(ligTable);

//criando tabuleiro 6linhas(de 0 a 5) x 7colunas(de 0 a 6)

//função para montagem do tabuleiro
function mountTable() {
//colunas
    for (let i = 0; i < 7; i++) {
        let newDivCol = document.createElement("div");
        newDivCol.setAttribute("class", "divCol");
        newDivCol.setAttribute("data-col", `${[i]}`)
        ligTable.appendChild(newDivCol);

        //linhas
        for (let j = 0; j < 6; j++) {
            let newDivCel = document.createElement("div");
            newDivCel.setAttribute("class", "divCell");
            newDivCel.setAttribute("data-col", `${[i]}`)
            newDivCel.setAttribute("data-line", `${[j]}`)
            newDivCol.appendChild(newDivCel);
        };
    };
};
mountTable();














































/*end RAISSA*/
/*start BEATRIZ*/

















































/*end BEATRIZ*/
/*start PEDRO*/


// /* Handler do mouse */
for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++){
    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseover", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.add("selected")
    document.querySelector(`[data-col="${i}"]`).appendChild(document.querySelector("#diskPlayer"))
    document.querySelector("#diskPlayer").setAttribute("style", "top: -2.1vw")
})

    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseout", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.remove("selected")
    document.querySelector("#lineDisk").appendChild(document.querySelector("#diskPlayer"))
    document.querySelector("#diskPlayer").removeAttribute("style")
})}


/* Verifica vitória*/
for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
    /* se cada jogador tiver uma classe:*/
    for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
        // console.log(document.querySelector(`[data-col="${i}"][data-line="${j}"]`))
        document.addEventListener("click", function() {
            if (document.querySelector(`[data-col="${i}"][data-line="${j}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i}"][data-line="${j+1}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i}"][data-line="${j+2}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i}"][data-line="${j+3}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1")) {
                console.log("ae carai")
            }
        })
    }
}

for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
    /* se cada jogador tiver uma classe:*/
    for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
        // console.log(document.querySelector(`[data-col="${i}"][data-line="${j}"]`))
        document.addEventListener("click", function() {
            if (document.querySelector(`[data-col="${i}"][data-line="${j}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i+1}"][data-line="${j}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i+2}"][data-line="${j}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1") &&
                document.querySelector(`[data-col="${i+3}"][data-line="${j}"]`).className.includes(/*NOME DA CLASSE DO JOGADOR*/"player1")) {
                console.log("ae carai só que pro lado")
            }
        })
    }
}


document.querySelector("#ligTable").addEventListener("click", function(evt) {
    evt.target.classList.add("player1")
    console.log(evt.target)
})













































/*end PEDRO*/
/*start YASMIN*/
  const reset = document.createElement('button');
    reset.className = 'reset';
    reset.textContent = 'Reset';
    document.body.appendChild(reset);
    function resetJogo(){
   
        reset.addEventListener('click', function(){
        result("Clique em RESET para reiniciar o JOGO!");
        mountTable()
        
        })
  }















































/*end YASMIN*/