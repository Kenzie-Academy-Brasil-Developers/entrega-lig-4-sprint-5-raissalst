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


let newModalContainer = document.querySelector('#modalContainer');
let closingModal = document.getElementById("close");

closingModal.addEventListener("click", closeMessageModal)
//fechando no botão X
function closeMessageModal() {
newModalContainer.style.display = "none";
};











































/*end RAISSA*/
/*start BEATRIZ*/


let cont = 0

ligTable.addEventListener("click" , eventClick())


function eventClick(){
    const tableColum = document.getElementsByClassName("divCol")
    let arrayColunas = []
    let check
    let tabCheia
    let cont = 0
    let positionA = 0
    let positionB = 0

    let arrayControle = [0,0,0,0,0,0,0]

    for (let index = 0; index < tableColum.length; index++) {
        arrayColunas = [...arrayColunas,tableColum[index]]
    }

    arrayColunas.forEach(element => {
        element.addEventListener("click" , function clicarColuna(event){
            
        let colunaClicada = event.currentTarget
        let conteudoCel = colunaClicada.children

        for(let dir = 0 ; dir < 1 ; dir++){
            if(arrayControle[colunaClicada.getAttribute("data-col")] < 5)
                arrayControle[colunaClicada.getAttribute("data-col")] += 1
        }

        let disc = document.createElement("div")

        check = verificaCel(conteudoCel,disc,cont)

        if(disc.parentElement !== null){
            positionA = disc.parentElement.getAttribute("data-col")
            positionB = disc.parentElement.getAttribute("data-line")
        }

        changePlayer(cont)
        tabCheia += permirtirAddDisc(check)


        let discInseridos = arrayDiscos()// array de discos inseridos
        let arrayResultados = arrayResults(discInseridos)

        //FUNCTION RESULTS (arrayResultados , positionA , positionB){ VITORIA DIAGONAL() ; VITORIA HORIZONTAL() ; VITORIA VERTICAL() , EMPATE()}
       
        let final = resultados(arrayResultados , positionA , positionB)

        //FUNCTION RESULTS (){ VITORIA DIAGONAL() ; VITORIA HORIZONTAL() ; VITORIA VERTICAL() , EMPATE()}
        //winDiagonalXY(arrayResultados ,positionA,positionB)
        //winDiagonalAB(arrayResultados , positionA , positionB)
        let linhaParaArray = Number(positionB);
        let colunaParaArray = Number(positionA);
        victoryVert(arrayResultados, colunaParaArray);
        victoryHor(arrayResultados, linhaParaArray);
        diagonalTotal(arrayResultados , positionA , positionB)
        //resultados(arrayResultados , positionA ,positionB)
        
            //controle de clicks

            if(arrayControle[colunaClicada.getAttribute("data-col")] < 6){
                    return cont += 1
            }else{
                return cont
            }
        }) 
    })
}



function changePlayer(cont){

    if((cont%2) !== 0){
        lineOfPlayer.innerText = ""
        lineOfPlayer.innerText = "Player 2"
        diskPlayer.classList.remove("discPlayer1")
        diskPlayer.classList.add("discPlayer2")

    }else{
        lineOfPlayer.innerText = ""
        lineOfPlayer.innerText = "Player 1"
        diskPlayer.classList.remove("discPlayer2")
        diskPlayer.classList.add("discPlayer1")
    }
}


function verificaCel(conteudoCel, disc,cont){

    if((cont%2) !== 0){
        disc.classList.remove("discPlayer2")
        disc.classList.add("discPlayer1")

    }else{
        disc.classList.remove("discPlayer1")
        disc.classList.add("discPlayer2")
    }

    let status 

    for(let i = conteudoCel.length -1 ; i >= 0 ; i--){

        status = conteudoCel[i]

        if(status.childElementCount < 1){

            status.appendChild(disc)

            return true
        }
    }
    return false
}


function permirtirAddDisc(check){

    if(check === false){
        console.log("Erro. Tente outra coluna")
        erroAlert()
        return 1
    }
    return 0
}

function arrayDiscos(){
    
    let discos = []
    for (let linha = 0; linha < 6; linha++) {
        for (let col = 0; col < 7; col++) {
            discos = [...discos , (document.querySelector(`[data-line= ${CSS.escape(linha.toString())}][data-col=${CSS.escape(col.toString())}]`))]
        }
    }
   return discos
}


function arrayResults(discInseridos){
    let results = discInseridos
    let diskPlayers = [ [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                    ]

    let contador1 = 0

    for(let posCol = 0 ; posCol < diskPlayers.length ; posCol++){
        for (let posLine = 0; posLine < diskPlayers[posCol].length; posLine++){

            if(results[contador1].childElementCount === 0){
                diskPlayers[posCol][posLine] = 0
            }else{
                diskPlayers[posCol][posLine] = results[contador1].lastElementChild.className
            }
            
            contador1++
    
        }
    }
    return diskPlayers
}


function winDiagonalXY(matriz , positionA , positionB){

    let line = positionB;
    let col = positionA;
    let diagXY = [];

    if (col === 0 && line === 5) {

        while (col < 6 || line > 0) {
        diagXY.push(matriz[line][col]);
        line = line - 1;
        col = col + 1;
        }
        return diagXY;

    } else{
        while (col > 0 && line < 5) {
            line = line + 1;
            col = col - 1;
        }
        while (col <= 6 && line >= 0) {
            diagXY.push(matriz[line][col]);
            line = line - 1;
            col = col + 1;
        }
    
    return diagXY
    }
}

function winDiagonalAB(matriz , positionA , positionB){
    let line = positionB;
    let col = positionA;
    let diagAB = [];

    if (col === 6 && line === 5) {

        while (col < 6 || line > 0) {
        diagAB.push(matriz[line][col]);
        line = line - 1;
        col = col + 1;
        }
        return diagAB;

    } else {
    
        while (col < 6 && line < 5) {
            line = line + 1;
            col = col + 1;
        }
        while (col >= 0 && line >= 0) {
           
            diagAB.push(matriz[line][col]);
            line = line - 1;
            col = col - 1;
        }
    
    return diagAB
    }
}

function compare(diagonal){
    let arrDiag = diagonal
    let playOne = []
    let playTwo = []

    if(arrDiag.length < 4){
        return false
    }
    if(arrDiag.length >=4){
        for (let index = 0; index < arrDiag.length; index++) {
            if(arrDiag[index] === "discPlayer1"){
                playOne.push(arrDiag[index])
            }
            if(arrDiag[index] === "discPlayer2"){
                playTwo.push(arrDiag[index])
            }
        }
        if(playOne.length === 4){
            console.log("playOne: "+playOne.length)
            return true
        }
        if(playTwo.length === 4){
            console.log("playOne: "+playOne.length)
            return true
        }
        return false
    }
}

function diagonalTotal(array2D, posA , posB){

    let sentidoEsqDir = winDiagonalXY(array2D, posA , posB)
    let sentidoDirEsq = winDiagonalAB(array2D, posA , posB)
    let verifyLR = compare(sentidoEsqDir)
    let verifyRL = compare(sentidoDirEsq)

    if(verifyLR === true || verifyRL === true){
        console.log("voce venceu")
        return true
    }
    console.log("continue jogando")
    return false
}

function resultados(arrayResultados , positionA , positionB){
    let matriz = arrayResultados
    let posicaoA = Number(positionA)
    let posicaoB = Number(positionB)
    let winDiagonal = diagonalTotal(matriz, posicaoA , posicaoB)
    let winVertical = victoryVert(matriz, posicaoA)
    let winHorizontal = victoryHor(matriz, posicaoB)
    let withoutWinner = empate()
    
    if(winDiagonal === true){
        return true
    }
     if(winVertical === true){
        return true
    }
     if(winHorizontal === true){
        return true
    }
     if(withoutWinner === true){
        return true
    }
    return false
}





















/*end BEATRIZ*/
/*start PEDRO*/


// /* Handler do mouse *//
for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++){
    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseover", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.add("selected")
    document.querySelector("#diskPlayer").style.left = `${(i * 14.28) + 7.14}%`;
})

    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseout", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.remove("selected")
})}


function victoryVert(arrayResultados, colunaParaArray) {
    let arrayDiskColorsCol = [];
    for (let i = 0; i < 6; i++) {
        arrayDiskColorsCol.push(arrayResultados[i][colunaParaArray]);
    }
    for (let i = 0; i < 3; i++) {
        if (arrayDiskColorsCol[i] === arrayDiskColorsCol[i + 1] &&
            arrayDiskColorsCol[i] === arrayDiskColorsCol[i + 2] &&
            arrayDiskColorsCol[i] === arrayDiskColorsCol[i + 3] &&
            arrayDiskColorsCol[i] !== 0) {
            document.querySelector("#modalContainer").style.display = "unset"
        }
    }
}
function victoryHor(arrayResultados, linhaParaArray) {
    let arrayDiskColorsLine = [];
    for (let i = 0; i < 7; i++) {
        arrayDiskColorsLine.push(arrayResultados[linhaParaArray][i]);
    }
    for (let i = 0; i < 4; i++) {
        if (arrayDiskColorsLine[i] === arrayDiskColorsLine[i + 1] &&
            arrayDiskColorsLine[i] === arrayDiskColorsLine[i + 2] &&
            arrayDiskColorsLine[i] === arrayDiskColorsLine[i + 3] &&
            arrayDiskColorsLine[i] !== 0) {
            document.querySelector("#modalContainer").style.display = "unset"
        }
    }
}







































/*end PEDRO*/
/*start YASMIN*/
const reset = document.createElement('button');
reset.className = 'reset';
reset.textContent = 'Reset';
document.body.appendChild(reset);

reset.addEventListener('click', function(){
let divCell = document.querySelectorAll('.divCell')
let newCell = [...divCell]; 

for(let i = 0; i < newCell.length;i++){ 
        newCell[i].innerHTML = '' ;
    }
    cont = 0
})

  //empate
function empate(){
let divCell = document.querySelectorAll('.divCell')
let newCell = [...divCell]; 
let newArrayEmpate = []
        for(let i = 0; i < newCell.length;i++){ 
        newArrayEmpate.push(newCell[i].firstChild)
        }
        if(!newArrayEmpate.includes(null)){
          erroAlert()
           document.querySelector('p').innerText = 'EMPATE !!, Reinicie Novo JOGO';
           return true;
        }
        return false

} 


function erroAlert(){
let alert = document.querySelector('#modalContainer');
alert.style.display = 'unset';
document.querySelector('p').innerText = 'Essa coluna já está cheia';
setTimeout(function sairModal(){
alert.style.display = 'none';
},1500)
}











































/*end YASMIN*/