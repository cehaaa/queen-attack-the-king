import { useEffect, useState } from "react";

const usePieceMenu = ({ refElement }) => {
	const [isShowPieceMenu, setIsShowPieceMenu] = useState(false);

	function closePieceMenu() {
		setIsShowPieceMenu(false);
	}

	useEffect(() => {
		const element = refElement.current;

		function clickHandler(e) {
			e.stopPropagation();

			element.classList.add("despawn");

			setTimeout(() => {
				setIsShowPieceMenu(false);
				element.classList.remove("despawn");
			}, 200);
		}

		function contextMenuHandler(e) {
			e.preventDefault();

			setIsShowPieceMenu(true);

			if (isShowPieceMenu) return;

			const { clientX, clientY } = e;

			element.classList.add("spawn");

			element.style.left = `${clientX}px`;
			element.style.top = `${clientY}px`;

			element.addEventListener("animationend", () => {
				element.classList.remove("spawn");
			});
		}

		window.addEventListener("click", clickHandler);
		window.addEventListener("contextmenu", contextMenuHandler);

		return () => {
			window.removeEventListener("click", clickHandler);
			window.removeEventListener("contextmenu", contextMenuHandler);
		};
	}, []);

	return {
		isShowPieceMenu,
		closePieceMenu,
	};
};

export default usePieceMenu;
