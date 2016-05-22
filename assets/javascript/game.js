var words = ['Titanic', 'Inception', 'Twilight', 'Armageddon', 'Transformers', 'Gladiator', 'Avatar', 'Jumanji'];

var currentWordIdx = 0;

var maxGuesses = 10;

var incorrectLettersGuessed = [];
var totalIncorrectGuesses = 0;

var correctLettersEntered = [];

var wins = 0;

var getWordDisplay = function(){
	var currentWord = words[currentWordIdx].toUpperCase();
	var length = currentWord.length;
	var wordDisp = '';
	for(idx =0;idx<length;idx++) {
		var letter = currentWord.charAt(idx);
		if(correctLettersEntered.indexOf(letter) >= 0) {
			wordDisp = wordDisp + letter;
		} else {
			wordDisp = wordDisp + '_';
		}
	}

	return wordDisp;
};

var updateGame = function(){
	var currentWordEle = document.getElementById("current-word");
	var wordDisp = getWordDisplay();
	currentWordEle.textContent = wordDisp;

	var alreadyGuessedEle = document.getElementById("already-guessed");
	alreadyGuessedEle.textContent = incorrectLettersGuessed.join(',');

	var guessRemainingEle = document.getElementById("guess-rem-count");
	var guessesRemaining = maxGuesses - totalIncorrectGuesses;
	guessRemainingEle.textContent = guessesRemaining;
	if(guessesRemaining === 0) {
		alert("You've no guesses left. The game will reset now. ");
		window.location.reload();
	}
	var currentWord = words[currentWordIdx].toUpperCase();
	if(wordDisp === currentWord) {
		document.getElementById("movie-poster").src = "assets/images/" + wordDisp + ".png";
		document.getElementById("instructions").textContent = "Good Job! Continue guessing the next movie.";
		wins++;
		if(wins === words.length) {
			alert("Congratulations!!! You've guessed all the movies correctly!");
			window.location.reload();
		}
		document.getElementById("win-count").textContent = wins;
		incorrectLettersGuessed = [];
		correctLettersEntered = [];
		currentWordIdx++;
	}
};

var handleInput = function(event){
	var enteredChar = String.fromCharCode(event.keyCode).toUpperCase();
	var currentWord = words[currentWordIdx].toUpperCase();
	
	if(currentWord.indexOf(enteredChar) < 0){
		if(incorrectLettersGuessed.indexOf(enteredChar) < 0){
			incorrectLettersGuessed.push(enteredChar);
			totalIncorrectGuesses++;
		}
	} else {
		correctLettersEntered.push(enteredChar);
	}
	updateGame();
};

updateGame();
window.onkeydown = handleInput;
