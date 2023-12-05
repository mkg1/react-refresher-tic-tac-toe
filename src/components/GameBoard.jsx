export default function GameBoard({onSelectSquare, board}) {
 
    // const [gameBoard, setGameBoard] = useState(initialBoard);

    // function handleSelectSquare(rowIndex, symbolIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const newBoard = [...prevGameBoard.map((innerArray) => [...innerArray])]; //brand new copy of array with brand new copies of nested arrays
    //         newBoard[rowIndex][symbolIndex] = activePlayerSymbol;
    //         return newBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, symbolIndex) => (
                            <li key={symbolIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, symbolIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>))}
                    </ol>
                </li>))}
        </ol>
    );
}