import React from "react";

const Modal = ({ isShow, setIsShow }) => {
	const closeModal = () => {
		document.getElementById("modal").classList.add("modal-shrink");
		setTimeout(() => {
			setIsShow(false);
		}, 200);
	};

	return (
		<div className='fixed bg-slate-700 bg-opacity-50 text-white h-screen w-screen flex items-center justify-center'>
			<div
				className='bg-slate-700 rounded-lg w-6/12 p-5 border font-mono  modal-animate'
				id='modal'>
				<div className='flex justify-between items-center'>
					<div className='text-2xl font-semibold'>Introduction ✨</div>
					<div
						className='cursor-pointer hover:underline underline-offset-8 duration-200 '
						onClick={closeModal}>
						close
					</div>
				</div>

				<div className='mt-5 leading-loose'>
					<p>
						This is the visualization of Leetcode algorithm task. My initial
						inspiration for this{" "}
						<span className='before:block before:absolute before:bg-green-500 before:-inset-1 inline relative hover:before:-skew-y-2 hover:before:bg-green-600 before:duration-200'>
							<span className='relative'>Queen That can Attack The King</span>
						</span>{" "}
						project came from this 👉{" "}
						<span className='before:block before:absolute before:bg-green-500 before:-inset-1 inline relative hover:before:-skew-y-2 cursor-pointer before:duration-200'>
							<a
								target='_blank'
								href='https://leetcode.com/problems/queens-that-can-attack-the-king/'
								className='relative'
								rel='noreferrer'>
								Leetcode task.
							</a>
						</span>{" "}
						This was an exciting project to work on. I have had many aha moments
						while building this.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Modal;
