import { useContext } from "react";

import GameContext from "../context/GameContext";

const usePlacePiece = () => {
	const {
		board,
		setBoard,

		multipleSelectedCell,
		setMultipleSelectedCell,

		kingCoordinate,
		setKingCoordinate,
	} = useContext(GameContext);

	const updateBoardAndElement = ({ row, col, isEven, element }, piece) => {
		const newBoard = [...board];
		newBoard[row][col] = piece;
		setBoard(newBoard);

		element.classList.remove("bg-lime-500");

		element.classList.add(isEven ? "bg-white-checker" : "bg-black-checker");
	};

	const handlePlaceQueen = piece => {
		for (const selectedCell of multipleSelectedCell) {
			updateBoardAndElement(selectedCell, piece);
		}

		setMultipleSelectedCell([]);
	};

	const handlePlaceKing = piece => {
		if (multipleSelectedCell.length > 1 || kingCoordinate !== null) {
			alert("You can place only one king");
			return;
		}

		updateBoardAndElement(multipleSelectedCell[0], piece);

		const { row, col } = multipleSelectedCell[0];

		setKingCoordinate({
			row,
			col,
		});

		setMultipleSelectedCell([]);
	};

	function handleClearSquare() {
		const newBoard = [...board];

		for (const selectedCell of multipleSelectedCell) {
			const { row, col } = selectedCell;

			const isKing = newBoard[row][col] === "king";

			if (isKing) {
				setKingCoordinate(null);
			}

			updateBoardAndElement(selectedCell, "path");
		}

		setMultipleSelectedCell([]);
	}

	function handlePlacePiece(piece) {
		piece === "queen" && handlePlaceQueen("queen");
		piece === "king" && handlePlaceKing("king");
	}

	return {
		handlePlacePiece,
		handleClearSquare,
	};
};

export default usePlacePiece;
