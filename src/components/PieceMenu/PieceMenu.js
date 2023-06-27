import React, { useRef } from "react";

import usePieceMenu from "../../hooks/usePieceMenu";
import usePlacePiece from "../../hooks/usePlacePiece";

import KingImage from "./../../assets/king.png";
import QueenImage from "./../../assets/queen.png";

const PieceMenu = () => {
	const pieceMenuRef = useRef(null);

	const { isShowPieceMenu } = usePieceMenu({
		refElement: pieceMenuRef,
	});

	const { handlePlacePiece, handleClearSquare } = usePlacePiece();

	return (
		<>
			<div
				ref={pieceMenuRef}
				className={`absolute p-3 rounded-lg bg-gray-900 w-[300px] text-gray-400 ${
					isShowPieceMenu ? "block z-10" : "hidden -z-10"
				}`}>
				<div className='text-gray-200 text-lg font-medium'>Action menu</div>
				<div className='text-sm'>Select the action you want to perform</div>

				<div className='mt-3 flex flex-col space-y-3'>
					<button
						className='bg-slate-700 cursor-pointer flex items-center justify-center rounded-md p-2 text-sm font-medium duration-200 hover:bg-black-checker hover:text-white'
						onClick={() => handlePlacePiece("king")}>
						<div>Place the King</div>
						<img src={KingImage} alt='king' className='h-5 ml-2' />
					</button>

					<button
						className='bg-slate-700 cursor-pointer flex items-center justify-center rounded-md p-2 text-sm font-medium duration-200 hover:bg-black-checker hover:text-white'
						onClick={() => handlePlacePiece("queen")}>
						<div>Place the Queen</div>
						<img src={QueenImage} alt='queen' className='h-5 ml-2' />
					</button>

					<button
						className='bg-slate-700 cursor-pointer flex items-center justify-center rounded-md p-2 text-sm font-medium duration-200 hover:bg-black-checker hover:text-white'
						onClick={handleClearSquare}>
						Clear Piece
					</button>
				</div>
			</div>
		</>
	);
};

export default PieceMenu;
