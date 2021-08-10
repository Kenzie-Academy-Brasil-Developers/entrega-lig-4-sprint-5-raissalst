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
    let finished = false

    for (let index = 0; index < tableColum.length; index++) {
        arrayColunas = [...arrayColunas,tableColum[index]]
    }

    

    arrayColunas.forEach(element => {
        element.addEventListener("click" , function clicarColuna(event){
        
        cont += 1
        
        let colunaClicada = event.currentTarget

        let conteudoCel = colunaClicada.children // retorna node com os filhos da coluna clicada

        let disc = document.createElement("div")

        check = verificaCel(conteudoCel,disc,cont)
        tabCheia += permirtirAddDisc(check)

        finished = endGame(tabCheia)

        arrayDiscos()// array de discos inseridos

        })
    })
}


function verificaCel(conteudoCel, disc,cont){
    
    if((cont%2) !== 0){
        disc.classList.remove("discPlayer2")
        disc.classList.add("discPlayer1")

    }else{
        console.log("maluca")
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
        return 1
    }
    return 0
}


function endGame(tabCheia){
    if(tabCheia < 7){
        return false
    }
    console.log("Fim de Jogo")
    return true
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


//console.log(document.querySelector("[data-line=" + CSS.escape(linha.toString()) + "][data-col=" + CSS.escape(col.toString()) + "]"))





























/*end BEATRIZ*/
/*start PEDRO*/

















































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