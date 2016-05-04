window.onload = function() {
    /* Variables */
    var answer = "";                                            // correct answer
    var guess = "";                                             // current letter guessed
    var guessesLeft = 10;                                       // number of guesses left
    var lettersToGuess = 0;                                     // number of letters left to guess
    var duplicate = false;                                      // if guess has already been guessed                                  
    var player1 = document.getElementById('player1');           // instructions and input for Player 1
    var player2 = document.getElementById('player2');           // instructions and input for Player 2
    var answerInput = document.getElementById('answerInput');   // input for Player 1 to enter a word
    var guessInput = document.getElementById('guessInput');     // input for Player 2 to enter a letter
    var guessDisplay = document.getElementById('guessDisplay'); // display for number of guesses left
    var wordToGuess = document.getElementById('wordToGuess');   // display for blank spaces and correctly guessed letters
    var wrongGuesses = document.getElementById('wrongGuesses'); // display for wrong guesses
    
    
    /* When Player 1 submits a word, check that the word is valid (only contains letters), and if so, set the number of letters left to guess to the length of the word and call startPlayer2 to continue the game. */
    document.getElementById('answerSubmit').onclick = function(){        
        if(/^[a-zA-Z]+$/.test(answerInput.value)){
            answer = answerInput.value.toUpperCase();
            lettersToGuess = answer.length;
            startPlayer2();
        } else {
            alert("Please enter a valid word.");
        }  
        
        return false;
    }
    
    /* Hide Player 1's instructions and word submission. Show Player 2's instructions and the correct number of blank spaces. */
    function startPlayer2(){
        player1.style.display = 'none'; 
        player2.style.display = 'block';
        
        for(var i = 0; i < answer.length; i++) {
            var blank = document.createElement('li');
            blank.innerHTML = "_";
            wordToGuess.appendChild(blank);
        } 
    }
    
    /* When Player 2 guesses a letter, check that the letter is valid (is a letter), and if so, check to see if it has already been guessed. If not, check to see if it is in the word. If it is, call correctGuess, and if not, call wrongGuess. */
    document.getElementById('guessSubmit').onclick = function(){
        if(/^[a-zA-Z]+$/.test(guessInput.value)){
            guess = guessInput.value.toUpperCase();
            
            if(wrongGuesses.children.length > 0){
                for(var i = 0; i < wrongGuesses.children.length; i++){
                    var wrongLetters = wrongGuesses.getElementsByTagName('li')[i].innerHTML;
                    if(wrongLetters.indexOf(guess) != -1){
                        alert("You already guessed "+guess);
                        return false;
                    }
                }   
            }
            if(lettersToGuess < answer.length){
                for(var j = 0; j < wordToGuess.children.length; j++){
                    var rightLetters = wordToGuess.getElementsByTagName('li')[j].innerHTML;
                    if(rightLetters.indexOf(guess) != -1) {
                        alert("You already guessed "+guess);
                        return false;
                    }
                } 
            }

            if(answer.indexOf(guess) !== -1){  
                correctGuess();
            } else {
                wrongGuess();
            }
                
        } else {
            alert("Please enter a valid letter.");
        }
        
        return false;
    }
    
    /* When a correct letter is guessed, fill in the corresponding blank(s) with the correct letter, decrement the number of letters left to guess, and reset the guess input. Check to see if there are anymore letters left to guess, and if not, alert win then call reset. */
    function correctGuess(){
        for (var i = 0; i < answer.length; i++){
            if(guess == answer[i]){
                wordToGuess.children[i].innerHTML = guess;
                lettersToGuess --;
            }
        }
        guessInput.value = "";
        if(lettersToGuess < 1){
            alert("You win! The correct word was: "+answer);
            reset();
        }
    }
    
    /* When an incorrect letter is guessed, add the wrong letter to the "incorrect guesses" list and decrement number of guesses remaining. Check to see if there are anymore guesses remaining, and if not, alert loss then call reset. */
    function wrongGuess(){
        var wrong = document.createElement('li');
        wrong.innerHTML = guess+",";
        wrongGuesses.appendChild(wrong);
        guessInput.value = "";
        
        guessesLeft --;
        guessDisplay.innerHTML = guessesLeft;
        if(guessesLeft < 2) {
            guessDisplay.className = "red";
        }
        if(guessesLeft < 1){
            alert("You lose! The correct word was: "+answer);
            reset();
        }
    }
    
    /* Reset the game. */
    function reset(){
        answer = "";
        guess = "";
        guessesLeft = 10;
        lettersToGuess = 0;
        answerInput.value = "";
        guessDisplay.innerHTML = guessesLeft;
        wordToGuess.innerHTML = "";
        wrongGuesses.innerHTML = "";
        player1.style.display = 'block'; 
        player2.style.display = 'none';
    }
}