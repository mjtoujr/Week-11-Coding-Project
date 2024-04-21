$(document).ready(function () {
    let currentTurn = 'X'; //Establishes turns, starting with X
    let gameEnd = false; //Creates endgame state, which defaults to off

    //Creating the function of taking a turn by clicking on a cell
    $('.board').on('click', '.cell', function () {
        if (!gameEnd && $(this).text() === '') { //make sure game is ongoing and cell is available
            $(this).text(currentTurn); //fill the cell
            whoWon(); //see if game is over
            endTurn(); //switch to next player
        }
    });
    //Creating functionality for clicking on Game Restart
    $('#restartNow').click(function () {
        resetGame(); //Invokes restart when button is clicked
    });
    //Creating function for switching the turn
    function endTurn() {
        if (currentTurn === 'X') {
            currentTurn = 'O';
        } else {
            currentTurn = 'X';
        }
        $('#currentTurnText').text(`${currentTurn} Controls the Game`); //Flip turn, and change the display
    }

    //Checking for end game conditions
    function whoWon() {
        let cells= $('.cell'); //reference all nine cells
        let combinations = [
            //list all horizontal, vertical, or diagonal lines
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        //check all winning possibilities
        for (let i = 0; i < combinations.length; i++) {
            let [a, b, c] = combinations[i];
            if ( //See if any winning combination is filled on the board
                cells.eq(a).text() &&
                cells.eq(a).text() === cells.eq(b).text() &&
                cells.eq(a).text() === cells.eq(c).text()
            ) {
                gameEnd = true; //switch to endgame state
                $('#gameResultText').text(currentTurn + ' is the victor!');
                $('#gameResult')
                    .removeClass('alert-warning')
                    .addClass('alert-success')
                    .removeClass('d-none') //Result message is now displayed, referencing the winner
                return;
            }
        }

        //If all cells are filled, but no winner was found, end game as Cat/Draw
        if ($('.cell:empty').length === 0) {
            gameEnd = true; //switch to endgame state
            $('#gameResultText').text(`It's a Draw; only the Cat has won!`);
            $('#gameResult')
                .removeClass('alert-warning')
                .addClass('alert-success')
                .removeClass('d-none') //Result message is now displayed, referencing no winner
            return;
        }
    }
    //Creating actual reset function
    function resetGame() {
        $('.cell').text(''); //clear all the cells
        gameEnd = false; //reset endgame, if prior game ended
        $('#gameResult').addClass('d-none'); //Hide results
        currentTurn = 'X'; //Reset to X as player
        $('#currentTurnText').text("X Controls the Game") //Update turn display
    }
});