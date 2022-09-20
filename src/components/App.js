import React, { useState } from "react";

import Game from "./Game/Game";

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

	return (
		<GameContext.Provider value={gameContextValue}>
			<Game />
		</GameContext.Provider>
	);
};

export default App;
