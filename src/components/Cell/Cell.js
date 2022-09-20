import React from "react";

import QueenImage from "./../../assets/queen.png";
import KingImage from "./../../assets/king.png";

const Cell = ({ board, color, children, piece, ...rest }) => {
	const displayPiece = () => {
		if (piece === "queen" || piece === "attack") {
			return <img src={QueenImage} alt='queen' className='h-10' />;
		} else if (piece === "king") {
			return <img src={KingImage} alt='king' className='h-10' />;
		} else return "";
	};

	return (
		<div
			className={`h-14 w-14 border flex items-center justify-center ${color} cursor-pointer `}
			{...rest}>
			{displayPiece()}
		</div>
	);
};

export default Cell;
