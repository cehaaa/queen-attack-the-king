import React, { useState } from "react";

import Game from "./Game/Game";

import GameContext from "../context/GameContext";

const App = () => {
	const initialBoard = Array(8)
		.fill()
		.map(() => Array(8).fill("path"));

	const [board, setBoard] = useState(initialBoard);
	const [multipleSelectedCell, setMultipleSelectedCell] = useState([]);

	const [kingCoordinate, setKingCoordinate] = useState(null);

	const gameContextValue = {
		initialBoard,

		board,
		setBoard,

		kingCoordinate,
		setKingCoordinate,

		multipleSelectedCell,
		setMultipleSelectedCell,
	};

	return (
		<>
			<GameContext.Provider value={gameContextValue}>
				<Game />
			</GameContext.Provider>
		</>
	);
};

export default App;
