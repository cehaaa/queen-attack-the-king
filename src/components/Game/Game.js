import React, { useContext } from "react";

import Modal from "../Modal/Modal";
import Board from "../Board/Board";
import PieceMenu from "../PieceMenu/PieceMenu";

import GameContext from "../../context/GameContext";

import useModal from "../../hooks/useModal";
import useBoardLogic from "../../hooks/useBoardLogic";

const Game = () => {
	const {
		initialBoard,

		board,
		setBoard,

		kingCoordinate,
		setKingCoordinate,

		setMultipleSelectedCell,
	} = useContext(GameContext);

	const { transformAttackToQueen, handleSolveBoard, handleResetBoard } =
		useBoardLogic({
			initialBoard,

			board,
			setBoard,

			setKingCoordinate,

			setMultipleSelectedCell,
		});

	const { isShowModal: isShowAboutModal, toggleModal: toggleAboutModal } =
		useModal();

	const solveBoard = () => {
		if (kingCoordinate === null) {
			alert("No king placed");
			return;
		}

		transformAttackToQueen(board);

		const result = handleSolveBoard(board, [
			kingCoordinate.row,
			kingCoordinate.col,
		]);

		setBoard(result);
	};

	if (isShowAboutModal) return <Modal toggleModal={toggleAboutModal} />;

	return (
		<>
			<PieceMenu />

			<section className='md:w-[500px] min-h-screen mx-auto h-full w-full text-gray-400 p-3 md:p-0 flex flex-col'>
				<header className='mt-5 text-xl'>
					<div className='text-white font-medium'>
						Queen That Can Attack The King
					</div>
				</header>

				<section className='mt-5'>
					<Board />
				</section>

				<section className='mt-5'>
					<div>
						You can choose multiple positions by clicking on the board, and then
						choose the piece you want to place by{" "}
						<span className='bg-gray-700 text-xs rounded py-[3px] px-[5px] text-white'>
							Right click
						</span>{" "}
						or{" "}
						<span className='bg-gray-700 text-xs rounded py-[3px] px-[5px] text-white'>
							Ctrl + Click
						</span>{" "}
						Have fun customizing your chessboard!
					</div>

					<div className='flex mt-5 gap-x-3'>
						<button
							className='rounded-md px-4 py-2 bg-slate-600 font-medium hover:bg-opacity-80 duration-200'
							onClick={solveBoard}
						>
							Solve Board
						</button>

						<button
							className='rounded-md px-4 py-2 bg-slate-600 font-medium hover:bg-opacity-80 duration-200'
							onClick={handleResetBoard}
						>
							Reset Board
						</button>

						<button
							className='rounded-md px-4 py-2 bg-black-checker font-medium hover:bg-opacity-80 text-white duration-200 ml-auto'
							onClick={toggleAboutModal}
						>
							About project
						</button>
					</div>
				</section>

				<footer className='mt-5 border-t border-gray-600 text-center text-sm py-4'>
					Crafted with passion by{" "}
					<a
						className='text-gray-200 underline'
						rel='noreferrer'
						target='_blank'
						href='https://github.com/cehaaa'
					>
						Christian
					</a>{" "}
					Check the GitHub{" "}
					<a
						className='text-gray-200 underline'
						rel='noreferrer'
						target='_blank'
						href='https://github.com/cehaaa/queen-attack-the-king'
					>
						here.
					</a>
				</footer>
			</section>
		</>
	);
};

export default Game;
