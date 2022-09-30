import React, { useState } from "react";

import Game from "./Game/Game";
import Modal from "./Modal/Modal";

import GameContext from "../context/gameContext";

const App = () => {
	const initialBoard = Array(8)
		.fill()
		.map(() => Array(8).fill("path"));

	const [selectedPiece, setSelectedPiece] = useState("path");
	const [board, setBoard] = useState(initialBoard);

	const gameContextValue = {
		initialBoard,

		selectedPiece,
		setSelectedPiece,

		board,
		setBoard,
	};

	const [isShow, setIsShow] = useState(true);

	return (
		<>
			{isShow && <Modal isShow={isShow} setIsShow={setIsShow} />}
			<GameContext.Provider value={gameContextValue}>
				<Game setIsShowModal={setIsShow} />
			</GameContext.Provider>
		</>
	);
};

export default App;
