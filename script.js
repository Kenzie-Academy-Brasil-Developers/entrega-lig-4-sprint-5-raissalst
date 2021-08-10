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















































/*end RAISSA*/
/*start BEATRIZ*/

















































/*end BEATRIZ*/
/*start PEDRO*/

















































/*end PEDRO*/
/*start YASMIN*/

















































/*end YASMIN*/