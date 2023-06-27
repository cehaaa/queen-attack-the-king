import React, { useEffect, useRef } from "react";

const Modal = ({ toggleModal }) => {
	const modalRef = useRef();

	const closeModal = () => {
		const modalElement = modalRef.current;

		modalElement.classList.add("despawn");

		modalElement.addEventListener("animationend", () => {
			modalElement.classList.remove("despawn");

			toggleModal();
		});
	};

	useEffect(() => {
		const modalElement = modalRef.current;

		modalElement.addEventListener("animationend", () => {
			modalElement.classList.remove("spawn");
		});
	}, []);

	return (
		<div className='fixed top-0 left-0 w-full min-h-screen bg-gray-900 flex items-center justify-center bg-opacity-50'>
			<div
				ref={modalRef}
				className='w-full md:w-[500px] text-white bg-gray-700 rounded-md p-5 spawn'>
				<div className='flex justify-between items-center'>
					<div className='text-2xl'>About this project</div>

					<button onClick={closeModal}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				<div className='text-gray-400 mt-4'>
					This is the visualization of Leetcode algorithm task. My initial
					inspiration for this{" "}
					<span className='text-gray-200'>Queen That can Attack The King</span>{" "}
					project is came from{" "}
					<a
						className='text-gray-200 underline'
						rel='noreferrer'
						target='_blank'
						href='https://leetcode.com/problems/queens-that-can-attack-the-king/'>
						Leetcode task.
					</a>{" "}
					This was an exciting project to work on. I have had many aha moments
					while building this.
				</div>

				<div className='mt-4'>
					<button
						className='rounded-md px-4 py-2 bg-black-checker font-medium hover:bg-opacity-80 text-white duration-200 ml-auto'
						onClick={closeModal}>
						Start Exploring
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
