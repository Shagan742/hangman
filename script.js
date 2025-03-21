//wordlist

const wordList=['saint', 'green', 'golden', 'rainbow', 'prize', 'coin', 'clover','leprechaun','tradition'];

//declare variables

let selectedWord='';
let displayWord='';
let wrongGuesses = 0;
let guessedLetters=[];
const maxMistakes=6;

//starts the game, runs everything in the game
function startGame(level) {
    //reset game
    wrongGuesses=0;
    guessedLetters=[];

    selectedWord=getRandomWord(level)
    displayWord='_'.repeat(selectedWord.length);


    updateUI()



    updateDifficultyDisplay(level)


    //show game area and difficulty display + hide selection buttons

    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');

    document.getElementById('difficultySelection').classList.add('d-none');

    document.getElementById('letterInput').focus(); //allows for not needing to press input box to start typing
}

function getRandomWord(level) {
    let filteredWords=wordList.filter(word=>{
        if (level==='easy') return word.length<=4
        if (level==='medium') return word.length>5 && word.length<=7
        if (level==='hard') return word.length>=8
    })

    return filteredWords[Math.floor(Math.random()*filteredWords.length)];
}

//update difficulty display
function updateDifficultyDisplay(level) {
    let difficultyBox=document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if(level==='easy') {
        difficultyBox.classList.add('easy')
        difficultyBox.textContent='Difficulty: easy';
    } else if(level==='medium') {
        difficultyBox.classList.add('medium')   
        difficultyBox.textContent='Difficulty: medium';

    } else if(level==='hard') {
        difficultyBox.classList.add('hard')
        difficultyBox.textContent='Difficulty: hard';
    }
}


function updateUI() {
    document.getElementById('wordDisplay').textContent=displayWord.split("").join(" "); //displays word with spaces between it in underscores
}


function guessedLetters() {
    let inputField=document.getElementById('letterInput') // get input box thing
    let guessedLetter=inputField.value.toLowerCase() //lowercasing everything
    //check and see if valid input

    if(!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter'); //alerts user to put in valid letter
        inputField.value=''; //empties input box
        return //exit function
    }


    //before the guessed letter is stored in array, the letter must not already be in there
    if(guessedLetters.includes(guessedLetter)) {
        alert('Please enter a different letter')
        inputField.value='';
        return;
    }

    //put user's guessed letter in the array
    guessedLetters.push(guessedLetter);

    if(selectedWord.includes(guessedLetter)) {
        updateCorrectGuess(guessedLetter)
    } else {
        updateWrongGuess(guessedLetter)
    }

    inputField.value=''; //empties the input box
    document.getElementById('letterInput').focus() //refocus input field for next guess
}



