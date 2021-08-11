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

    let arrayControle = [0,0,0,0,0,0,0]

    for (let index = 0; index < tableColum.length; index++) {
        arrayColunas = [...arrayColunas,tableColum[index]]
    }

    arrayColunas.forEach(element => {
        element.addEventListener("click" , function clicarColuna(event){
            
        let colunaClicada = event.currentTarget

        for(let dir = 0 ; dir < 1 ; dir++){
            if(arrayControle[colunaClicada.getAttribute("data-col")] < 7)
                arrayControle[colunaClicada.getAttribute("data-col")] += 1
        }

        let conteudoCel = colunaClicada.children // retorna node com os filhos da coluna clicada

        let disc = document.createElement("div")

        check = verificaCel(conteudoCel,disc,cont)
        tabCheia += permirtirAddDisc(check)

        arrayDiscos()// array de discos inseridos
        //FUNCTION RESULTS (){ VITORIA DIAGONAL() ; VITORIA HORIZONTAL() ; VITORIA VERTICAL() , EMPATE()}
        
        
            //controle de clicks

            if(arrayControle[colunaClicada.getAttribute("data-col")] < 7){
                    return cont += 1
            }else{
                return cont
            }
        })
    })
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
            if (document.querySelector(`[data-col="${i}"][data-line="${j}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+1}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+2}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i}"][data-line="${j+3}"]`).childElementCount > 0) {
                let vitoria = document.createTextNode("O jogador ganhou")
                document.querySelector("#lineOfPlayer").innerText = `o jogador ${document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className} ganhou`
            }
        })
    }
}

for (let i = 0; i < document.querySelector("#ligTable").childElementCount; i++) {
    for (let j = 0; j < document.querySelector(`[data-col="${i}"]`).childElementCount; j++) {
        document.addEventListener("click", function() {
            if (document.querySelector(`[data-col="${i}"][data-line="${j}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i+1}"][data-line="${j}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i+2}"][data-line="${j}"]`).childElementCount > 0 &&
                document.querySelector(`[data-col="${i+3}"][data-line="${j}"]`).childElementCount > 0) {
                let vitoria = document.createTextNode("O jogador ganhou")
                document.querySelector("#lineOfPlayer").innerText = `o jogador ${document.querySelector(`[data-col="${i}"][data-line="${j}"] div`).className} ganhou`
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
 //let table = document.querySelector('#ligTable')
// table.innerText = '';
// mountTable();
let divCell = document.querySelectorAll('.divCell')
let newCell = [...divCell]; 
for(let i = 0; i < newCell.length;i++){ 
    newCell[i].innerHTML = '' ;
    
}

lineOfPlayer.innerText = "Iniciar NOVO jogo";
})

  //empate

  let divCell = document.querySelectorAll('.divCell')
let newCell = [...divCell]; 
let cellLocation = 0;
let posicaoAtual;
function empate(event){
// let target = event.currentTarget;
// let table = document.querySelector('#ligTable')

// for(let i = 0; i < newCell.length;i++){ 
// if(table === newCell){
// document.getElementById('modalContainerDraw').className = '';

// if(cellLocation === 1){
// result("Clique em RESET para reiniciar o JOGO!");
// cellLocation = 0;
//      }
//    }
//   }
} empate()


function erroAlert(){
let alert = document.querySelector('#modalContainer');
 alert.style.display = 'unset';
document.querySelector('p').innerText = 'Essa coluna já está cheia';

setTimeout(function(){
alert.style.display = 'none';
},1500)
}











































/*end YASMIN*/