import { drawCanvas, drawLines, clearScreen, writeCorrectLetter, writeIncorrectLetter, drawDollHead, drawDollBody, drawDollLimbsLeft, drawDollLimbsRight } from "./canvas.js";

/*var button = document.getElementById("div-game");

    button.addEventListener("click", function(){
        var titulo = document.getElementById("titulo");

        if(titulo.style.display === "none") {
            titulo.style.display = "block";
        }
        else {
            titulo.style.display = "none";
        }
    })*/

const btnStartGame = document.getElementById('btn-start-game');
const btnEndGame = document.getElementById('btn-end-game');
const btnNewGame = document.getElementById('btn-new-game');
const btnAddWord = document.getElementById("btn-add-word");
const btnSaveWord = document.getElementById("btn-saveWord");
const btnCancel = document.getElementById("btn-cancel");
const divGame = document.getElementById("div-game");
const divButtons =  document.getElementById("botaoInicio");
const divAddWord = document.getElementById("div-addWord");

//vetor de palavras a serem usadas no jogo
let words = ["function", "console", "prompt", "gradient", "string", "sintaxe", "background", "style"];
let letters = [];
let lettersIncorrect = [];
let lettesCorrect = [];
let errors = 6;
export let secretWord = "";

// start game
btnStartGame.addEventListener('click', startGame);

function startGame(){
    hideElement(divButtons);
    showElement(divGame);
    raffleWords();
    console.log(secretWord);
    clearScreen();
    drawCanvas();
    drawLines(secretWord);

    document.onkeyup = (e) =>{
        let letter = e.key.toUpperCase();
        
        if(checkLetter(letter) && secretWord.includes(letter)){
            for (let i = 0; i < secretWord.length; i++) {
                if(secretWord[i] === letter){
                    writeCorrectLetter(i);
                    lettesCorrect.push(letter);
                    if(lettesCorrect.length == secretWord.length){
                        alert(`Parabéns, você acertou!`);
                    }
                }
            }
        }else{
            addLetterIncorrect(letter);

            switch (errors) {
                case 5:
                    drawDollHead(250, 150, 30, '#0A3871');
                    drawDollHead(250, 150, 20, '#F3F5FC');
                    break;
                case 4:
                    drawDollBody(250, 180, 150);
                    break;
                case 3:
                    drawDollLimbsLeft(250, 330, 50);
                    break;
                case 2:
                    drawDollLimbsRight(250, 330, 50);
                    break;
                case 1:
                    drawDollLimbsLeft(250, 200, 50);
                    break;
                case 0:
                    drawDollLimbsRight(250, 200, 50);;
                    alert(`Errou! Palavra correta: ${secretWord}`);
                    break;
            
                default:
                    reloadPage();
                    break;
            }
            writeIncorrectLetter(letter, errors);
        }
    }
}//starGame

function checkLetter(key){
    let state = false;
    if(key >= 65 && letters.indexOf(key) || key <= 90 && letters.indexOf(key)){
        letters.push(key);
        console.log(key);
        console.log(letters);
        return state;
    }else{
        state = true;
        letters.push(key);
        console.log(key);
        console.log(letters, "if true");
        return state;
    }
}
// captar letra teclada
// verificar se é uma letra
// conferir se a palavra contem a letra
// escrever letra correta
// escrever letra incorreta
// contar numero de erros


//end game
btnEndGame.addEventListener('click', reloadPage);

//new game
btnNewGame.addEventListener('click', reloadPage);

// botão adicionar nova palavra
btnAddWord.addEventListener('click', function(){
    hideElement(divButtons);
    showElement(divAddWord);
});

// Adicionar nova palavra;
btnSaveWord.addEventListener('click', () =>{
    let wordInput = document.querySelector("#text").value;
    addWord(wordInput);
    hideElement(divAddWord);
    startGame();
});

// cancelar adição de nova palavra
btnCancel.addEventListener('click', ()=>{
    reloadPage();
})

// função para sortear palavra
function raffleWords(){
    secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// função adicionar palavra
function addWord(word){
    words.push(word);
}

//função para esconder elemento
function hideElement(element){
    element.style.display = "none";
}

// função para mostrar elemento
function showElement(element){
    element.style.display = "block";
}

// função decrementar erros
function addLetterIncorrect(letter){
    if(lettersIncorrect.length == 0){
        lettersIncorrect.push(letter);
        for (let iterator of lettersIncorrect) {
            // FALTA VERIFICAR SE A LETRA INCORRETA JÁ EXISTE NO VETOR
            if(iterator != letter){
                lettersIncorrect.push(letter);
            }
        }
    }
    console.log(lettersIncorrect);
    errors--;
}

// função recarregar pagina
function reloadPage(){
    window.location.reload();
}