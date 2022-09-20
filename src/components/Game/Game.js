import React, { useContext, useState } from "react";

import Board from "../Board/Board";

import QueenImage from "./../../assets/queen.png";
import KingImage from "./../../assets/king.png";

import GameContext from "../../context/gameContext";

import Modal from "../Modal/Modal";

const Game = () => {
	const { initialBoard, board, setBoard, selectedPiece, setSelectedPiece } =
		useContext(GameContext);

	const [king, setKing] = useState([0, 0]);

	const selectHandle = piece => {
		setSelectedPiece(piece);
	};

	const solve = () => {
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

		setBoard(newBoard);

		console.log(board);
	};

	const reset = () => {
		setSelectedPiece("path");
		setKing([0, 0]);

		setBoard(initialBoard);
	};

	return (
		<>
			{/* <Modal /> */}

			<div className='h-screen mx-auto flex items-center w-6/12 justify-center text-white'>
				<div>
					<div className='flex flex-col items-center'>
						<div className='text-3xl mb-10 font-mono'>
							Queens That Can Attack the King
						</div>
						<div className='flex'>
							<Board selectedPiece={selectedPiece} setKing={setKing} />

							<div className='ml-10'>
								<div className='flex space-x-5'>
									<button
										className='bg-slate-700 focus:bg-slate-900 duration-200 p-3 cursor-pointer h-16 w-16 flex items-center justify-center rounded-md'
										onClick={() => selectHandle("queen")}>
										<img src={QueenImage} alt='queen' className='h-10' />
									</button>

									<button
										className='bg-slate-700 focus:bg-slate-900 duration-200 p-3 cursor-pointer h-16 w-16 flex items-center justify-center rounded-md'
										onClick={() => selectHandle("king")}>
										<img src={KingImage} alt='queen' className='h-10' />
									</button>
								</div>
								<div className='mt-5 space-y-5 '>
									<button
										className='rounded px-4 py-3 bg-slate-700 font-semibold hover:bg-slate-900 duration-200'
										onClick={solve}>
										Solve Board
									</button>

									<button
										className='rounded px-4 py-3 bg-slate-700 font-semibold hover:bg-slate-900 duration-200'
										onClick={reset}>
										Reset Board
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;
