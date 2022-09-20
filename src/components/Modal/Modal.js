import React from "react";

const Modal = () => {
	return (
		<>
			<div className='h-screen w-screen bg-slate-700 bg-opacity-20 flex items-center justify-center'>
				<div className='bg-slate-800 rounded-lg font-mono p-5 w-6/12 text-white'>
					<div className='flex justify-between'>
						<div>Queens That Can Attack The King Rules</div>
						<div className='cursor-pointer'>close</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
