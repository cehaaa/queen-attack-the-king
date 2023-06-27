const useBoardLogic = ({
	initialBoard,

	board,
	setBoard,

	setKingCoordinate,
	setMultipleSelectedCell,
}) => {
	function handleResetBoard() {
		setKingCoordinate(null);
		setMultipleSelectedCell([]);
		setBoard(initialBoard);
	}

	function transformAttackToQueen() {
		const newBoard = [...board];

		for (let i = 0; i < newBoard.length; i++) {
			for (let j = 0; j < newBoard[i].length; j++) {
				if (newBoard[i][j] === "attack") {
					newBoard[i][j] = "queen";
				}
			}
		}
	}

	function handleSolveBoard(board, king) {
		const res = [];

		let [r, c] = king;
		// check left
		for (let i = king[1]; i >= 0; i--) {
			if (board[king[0]][i] === "queen" || board[king[0]][i] === "attack") {
				res.push([king[0], i]);
				break;
			}
		}

		// check right
		for (let i = king[1]; i < 8; i++) {
			if (board[king[0]][i] === "queen" || board[king[0]][i] === "attack") {
				res.push([king[0], i]);
				break;
			}
		}

		// check top
		for (let i = king[0]; i >= 0; i--) {
			if (board[i][king[1]] === "queen" || board[i][king[1]] === "attack") {
				res.push([i, king[1]]);
				break;
			}
		}

		// check bottom
		for (let i = king[0]; i < 8; i++) {
			if (board[i][king[1]] === "queen" || board[i][king[1]] === "attack") {
				res.push([i, king[1]]);
				break;
			}
		}

		// check diagonal top left
		while (r >= 0 && c >= 0) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r -= 1;
			c -= 1;
		}
		[r, c] = king;

		// check diagonal bottom right
		while (r < 8 && c < 8) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r += 1;
			c += 1;
		}
		[r, c] = king;

		// check diagonal top right
		while (r >= 0 && c < 8) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r -= 1;
			c += 1;
		}
		[r, c] = king;

		// check diagonal bottom left
		while (r < 8 && c >= 0) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r += 1;
			c -= 1;
		}
		[r, c] = king;

		// modified board to show queen can attack
		const newBoard = board.map((row, i) =>
			row.map((col, j) => {
				if (res.some(([r, c]) => r === i && c === j)) {
					return "attack";
				}
				return col;
			})
		);

		return newBoard;
	}

	return { handleResetBoard, handleSolveBoard, transformAttackToQueen };
};

export default useBoardLogic;
