import useSquare from './stores/squares';

function Board() {
  const { squares, setSquares, isFilled } = useSquare((state) => state);

  function selectSquare(square) {
    const nextValue = calculateNextValue(squares);

    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function renderSquare(i) {
    const disbaledButtonClass = isFilled(i) ? 'cursor-default' : 'cursor-pointer';

    return (
      <button
        type="button"
        className={`w-16 h-16 border border-black ${disbaledButtonClass}`}
        onClick={() => selectSquare(i)}
        title="Click to select this square"
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <p className="text-center text-xl mb-4">
        {calculateStatus(calculateWinner(squares), squares, calculateNextValue(squares))}
      </p>

      <div className="flex flex-col">
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function Game() {
  const { restart } = useSquare((state) => state);

  return (
    <div >
      <div className="grid place-content-center h-screen">
        <Board />
        <button
          type="button"
          onClick={restart}
          className="mt-4 px-4 py-2 border-red-400 border-2 rounded-md text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300 ease-in-out"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
