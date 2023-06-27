import React, { useContext } from "react";

import KingImage from "./../../assets/king.png";
import QueenImage from "./../../assets/queen.png";
import GameContext from "../../context/GameContext";

const Cell = ({ rowIndex, colIndex, piece }) => {
	const { multipleSelectedCell, setMultipleSelectedCell } =
		useContext(GameContext);

	const isEven = (rowIndex + colIndex) % 2 === 0;
	const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

	const displayPiece = () => {
		if (piece === "queen" || piece === "attack") {
			return (
				<img
					src={QueenImage}
					alt='queen'
					className='h-9 place-piece pointer-events-none'
				/>
			);
		}

		if (piece === "king") {
			return (
				<img
					src={KingImage}
					alt='king'
					className='h-9 place-piece pointer-events-none'
				/>
			);
		}
	};

	const getCellColor = () => {
		if (piece === "attack") {
			return "bg-red-600 text-white";
		}

		const color = isEven
			? "bg-white-checker text-gray-700 hover:bg-opacity-70"
			: "bg-black-checker text-gray-700 hover:bg-opacity-70";

		return color;
	};

	const stylingSelectedCell = (select, element) => {
		const removeAllBackgroundColor = () => {
			element.classList.remove("bg-white-checker");
			element.classList.remove("bg-black-checker");
			element.classList.remove("bg-red-600");
			element.classList.remove("bg-lime-500");
		};

		if (select) {
			removeAllBackgroundColor();
			element.classList.add("bg-lime-500");

			return;
		}

		// styling the cell to unselected style
		if (!select) {
			removeAllBackgroundColor();

			if (piece === "attack") {
				element.classList.add("bg-red-600");
				return;
			}

			isEven
				? element.classList.add("bg-white-checker")
				: element.classList.add("bg-black-checker");
		}
	};

	const checkIsDuplicate = coordinate => {
		return multipleSelectedCell.some(selected => {
			return selected.row === coordinate.row && selected.col === coordinate.col;
		});
	};

	const cellClickHandler = e => {
		const coordinate = {
			row: rowIndex,
			col: colIndex,
			isEven,
			element: e.target,
		};

		const isDuplicate = checkIsDuplicate(coordinate);

		if (!isDuplicate) {
			setMultipleSelectedCell(prev => [...prev, coordinate]);
			stylingSelectedCell(true, coordinate.element);
		} else {
			const index = multipleSelectedCell.findIndex(
				cell => cell.row === rowIndex && cell.col === colIndex
			);

			const duplicateMultipleSelectedCell = [...multipleSelectedCell];

			duplicateMultipleSelectedCell.splice(index, 1);

			setMultipleSelectedCell(duplicateMultipleSelectedCell);

			stylingSelectedCell(false, coordinate.element);
		}
	};

	return (
		<>
			<button
				className={`flex items-center justify-center duration-200 cursor-pointer shrink-0 md:max-h-[62.5px] md:min-h-[62.5px] min-h-[20px] h-[45.75px] relative text-[10px] outline outline-gray-500  ${getCellColor()}`}
				onClick={e => cellClickHandler(e)}>
				{displayPiece()}

				<div className='white absolute bottom-1 left-1 select-none pointer-events-none'>
					{alphabet[colIndex].toUpperCase()}
					{rowIndex + 1}
				</div>
			</button>
		</>
	);
};

export default Cell;
