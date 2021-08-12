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



ligTable.addEventListener("click" , eventClick())


function eventClick(){
    const tableColum = document.getElementsByClassName("divCol")
    let arrayColunas = []
    let check
    let tabCheia = 0
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
        

        console.log("posLinha: "+ positionB , "posColuna " + positionA)

        changePlayer(cont)
        tabCheia += permirtirAddDisc(check)


        let discInseridos = arrayDiscos()// array de discos inseridos
        let arrayResultados = arrayResults(discInseridos)

        //FUNCTION RESULTS (){ VITORIA DIAGONAL() ; VITORIA HORIZONTAL() ; VITORIA VERTICAL() , EMPATE()}
        //winDiagonalXY(arrayResultados ,positionA,positionB)
        //winDiagonalAB(arrayResultados , positionA , positionB)
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
        //FUNCTION ERRO
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

    let line = Number(positionB);
    let col = Number(positionA);
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
    console.log(diagXY)
    return diagXY
    }
}

function winDiagonalAB(matriz , positionA , positionB){
    let line = Number(positionB);
    let col = Number(positionA);
    let diagAB = [];

    console.table(matriz)

    if (col === 6 && line === 5) {

        while (col < 6 || line > 0) {
        diagAB.push(matriz[line][col]);
        line = line - 1;
        col = col + 1;
        }
        return diagAB;

    } else {
        console.log("mane" , "line "+line , "col "+col)
        while (col < 6 && line < 5) {
            line = line + 1;
            col = col + 1;
        }
        while (col >= 0 && line >= 0) {
            console.log("maluca" , "line "+line , "col "+col)
            diagAB.push(matriz[line][col]);
            line = line - 1;
            col = col - 1;
        }
    console.log(diagAB)
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

function resultados(arrayResultados,positionA,positionB){
    let matriz = arrayResultados
    winDiagonal(matriz , positionA , positionB)
    //vitoria horizontal , vitoria vertical
    return "lose"
}





















/*end BEATRIZ*/
/*start PEDRO*/


// /* Handler do mouse */
for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++){
    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseover", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.add("selected")
    document.querySelector("#diskPlayer").style.left = `${(i * 14.28) + 7.14}%`;
})

    document.querySelector(`[data-col="${i}"]`).addEventListener("mouseout", function (evt) {
    document.querySelector(`[data-col="${i}"]`).classList.remove("selected")
})}


for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
    for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
        document.addEventListener("click", function() {
            if (document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+1}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+2}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+3}"] div`).className.includes("discPlayer1")> 0) {
                    document.querySelector("#modalContainer").style.display = "unset"                    
                }
            })
        }
    }
    
    for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
        for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
            document.addEventListener("click", function() {
                if (document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i+1}"][data-line="${j}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i+2}"][data-line="${j}"] div`).className.includes("discPlayer1")> 0 &&
                document.querySelector(`[data-col="${i+3}"][data-line="${j}"] div`).className.includes("discPlayer1")> 0) {
                    document.querySelector("#modalContainer").style.display = "unset"                    
                }
            })
        }
    }
    for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
        for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
            document.addEventListener("click", function() {
                if (document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+1}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+2}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+3}"] div`).className.includes("discPlayer2")> 0) {
                    document.querySelector("#modalContainer").style.display = "unset"                    
                }
            })
        }
    }
    
    for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
        for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
            document.addEventListener("click", function() {
                if (document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i+1}"][data-line="${j}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i+2}"][data-line="${j}"] div`).className.includes("discPlayer2")> 0 &&
                document.querySelector(`[data-col="${i+3}"][data-line="${j}"] div`).className.includes("discPlayer2")> 0) {
                    document.querySelector("#modalContainer").style.display = "unset"  
            }
        })
    }
}










































/*end PEDRO*/
/*start YASMIN*/
const reset = document.createElement('button');
reset.className = 'reset';
reset.textContent = 'Reset';
document.body.appendChild(reset);
reset.addEventListener('click', function(){
let table = document.querySelector('#ligTable')
table.innerText = ''
mountTable();
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
            document.querySelector('#modalContainer').classList.remove("hidden")
        }   

} empate()












































/*end YASMIN*/