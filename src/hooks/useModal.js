import { useState } from "react";

const useModal = () => {
	const [isShowModal, setIsShowModal] = useState(true);

	function toggleModal() {
		setIsShowModal(prev => !prev);
	}

	return {
		isShowModal,

		toggleModal,
	};
};

export default useModal;
