document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const statusMessage = document.getElementById("status-message");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i * 3] === currentPlayer &&
                gameBoard[i * 3 + 1] === currentPlayer &&
                gameBoard[i * 3 + 2] === currentPlayer
            ) {
                return true;
 
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i] === currentPlayer &&
                gameBoard[i + 3] === currentPlayer &&
                gameBoard[i + 6] === currentPlayer
            ) {
                return true;
            }
        }

        // Check diagonals
        if (
            (gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer) ||
            (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer)
        ) {
            return true;
        }

        return false;
    }

    function checkDraw() {
        return !gameBoard.includes("") && !checkWinner();
    }

    function handleClick(index) {
        if (gameBoard[index] === "" && !checkWinner() && !checkDraw()) {
            gameBoard[index] = currentPlayer;
            render();
            if (checkWinner()) {
                statusMessage.textContent = `Le joueur ${currentPlayer} à gagner`;
            } else if (checkDraw()) {
                statusMessage.textContent = "déjà dessiner";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusMessage.textContent = `Tour du joueur ${currentPlayer}`;
            }
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        statusMessage.textContent = `Tour du joueur ${currentPlayer}`;
        render();
    }

    function render() {
        board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");

        // Ajouter la classe appropriée pour X ou O
        cellElement.classList.add(cell === "X" ? "playerX" : "playerO");

        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleClick(index));
        board.appendChild(cellElement);
    });
    }

    render();

    resetButton.addEventListener("click", resetGame);
});
