//wordlist

const wordList = ['saint', 'green', 'golden', 'rainbow', 'prize', 'coin', 'gold', 'pot', 'clover', 'leprechaun', 'tradition'];

//declare variables

let selectedWord = '';
let displayWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

//starts the game, runs everything in the game
function startGame(level) {
    //reset game
    wrongGuesses = 0;
    guessedLetters = [];

    selectedWord = getRandomWord(level)
    displayWord = '_'.repeat(selectedWord.length);


    updateUI()



    updateDifficultyDisplay(level)


    //show game area and difficulty display + hide selection buttons
    document.getElementById('mainHeading').classList.add('d-none')

    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('btnRestart').classList.remove('d-none')
    document.getElementById('btnRestart').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');

    document.getElementById('difficultySelection').classList.add('d-none');


    document.getElementById('letterInput').focus(); //allows for not needing to press input box to start typing

}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length > 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

//update difficulty display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if (level === 'easy') {
        difficultyBox.classList.add('easy')
        difficultyBox.textContent = 'Difficulty: Easy';
    } else if (level === 'medium') {
        difficultyBox.classList.add('medium')
        difficultyBox.textContent = 'Difficulty: Medium';

    } else if (level === 'hard') {
        difficultyBox.classList.add('hard')
        difficultyBox.textContent = 'Difficulty: Hard';
    }
}


function updateUI() {
    document.getElementById('wordDisplay').textContent = displayWord.split("").join(" "); //displays word with spaces between it in underscores

}

document.getElementById("letterInput").addEventListener("keydown", function (event) {

    // if user puts in something in the input box, whatever they put in goes in the array by pressing enter
    if (event.key === 'Enter') {
        guessLetter();
    }
})

function guessLetter() {
    let inputField = document.getElementById('letterInput') // get input box thing
    let guessedLetter = inputField.value.toLowerCase() //lowercasing everything
    //check and see if valid input

    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter'); //alerts user to put in valid letter
        inputField.value = ''; //empties input box
        return //exit function
    }


    //before the guessed letter is stored in array, the letter must not already be in there
    if (guessedLetters.includes(guessedLetter)) {
        alert('Please enter a different letter')
        inputField.value = '';
        return;
    }

    //put user's guessed letter in the array
    guessedLetters.push(guessedLetter);

    if (selectedWord.includes(guessedLetter)) {
        updateCorrectGuess(guessedLetter)
    } else {
        updateWrongGuess(guessedLetter)
    }

    inputField.value = ''; //empties the input box
    document.getElementById('letterInput').focus(); //refocus input field for next guess


}

const audioWrong = new Audio('sounds/wrongAnswerSound.mp3') //saves sound as variable
function updateWrongGuess(guessedLetter) {
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter} ` //puts wrong guess in display
    document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuesses}.jpg`; //updates img based on number which means whatever # guesses are there will be img for that.
    audioWrong.play();
    if (wrongGuesses === maxMistakes) {
        endGame(false)
    }

}

const audioCorrect = new Audio('sounds/correctAnswerSound.mp3'); //saves sound as variable
function updateCorrectGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++) { //scans the selected word
        if (selectedWord[i] === guessedLetter) { //if anything in selected word matches what user guessed
            newDisplayedWord += guessedLetter //updates the letter
            audioCorrect.play(); //audio plays
        } else {
            newDisplayedWord += displayWord[i]
        }
    }

    displayWord = newDisplayedWord;
    updateUI()

    if (!displayWord.includes('_')) {
        endGame(true);
    }

}

const audioWinning = new Audio('sounds/winningSound.mp3'); //saves sound as variable
const audioLosing = new Audio('sounds/losingSound.mp3'); //saves sound as variable

function endGame(won) {
    if (won === true) {
        audioWinning.play(); //audio plays
        document.getElementById('winningStatement').textContent = 'Congrats you won!!!!'
        //does it job to show what was hidden and hide what was shown

        document.getElementById('gameArea').classList.remove('d-block')
        document.getElementById('gameArea').classList.add('d-none');



        //displays whatever block of code i want
        document.getElementById('youWon').classList.remove('d-none')
        document.getElementById('youWon').classList.add('d-block');

        document.getElementById('btnRestart').classList.remove('d-none')
        document.getElementById('btnRestart').classList.add('d-block')

    } else if (won === false) {

        audioLosing.play(); //audio plays

        document.getElementById('losingStatement').textContent = `Awww, you lost, too bad :((; the correct word was ${selectedWord}.`


        //does it job to show what was hidden and hide what was shown
        document.getElementById('gameArea').classList.remove('d-block')
        document.getElementById('gameArea').classList.add('d-none');
        //displays whatever block of code i want
        document.getElementById('youLost').classList.remove('d-none')
        document.getElementById('youLost').classList.add('d-block');

        document.getElementById('youWon').classList.remove('d-block')
        document.getElementById('youWon').classList.add('d-none');

        document.getElementById('btnRestart').classList.remove('d-none')
        document.getElementById('btnRestart').classList.add('d-block')
    }
}

function restartGame() {
    //clear everything
    selectedWord = '';
    displayWord = [];
    wrongGuesses = 0;
    guessedLetters = [];
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses: ' //empties wrong letters
    document.getElementById('shamrock').src = `imgs/shamrock${6}.jpg`; //reset img

    //does it job to show what was hidden and hide what was shown
    document.getElementById('mainHeading').classList.remove('d-none')
    document.getElementById('mainHeading').classList.add('d-block')

    document.getElementById('gameArea').classList.remove('d-block')
    document.getElementById('gameArea').classList.add('d-none')

    document.getElementById('difficultyBox').classList.remove('d-block');
    document.getElementById('difficultyBox').classList.add('d-none');

    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('difficultySelection').classList.add('d-block');


    document.getElementById('btnRestart').classList.remove('d-block')
    document.getElementById('btnRestart').classList.add('d-none')

    document.getElementById('youWon').classList.remove('d-block')
    document.getElementById('youWon').classList.add('d-none')
    document.getElementById('youLost').classList.remove('d-block')
    document.getElementById('youLost').classList.add('d-none')
}
