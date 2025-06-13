import view from './preloader.module.scss';

interface IPreloader {
	box: number;
	visible: boolean;
}

function Preloader({ box, visible }: IPreloader) {
	const cssPreloader = {
		transform: `scale(${box / 80})`,
	};

	if (!visible) {
		return null;
	}

	return (
		<div className={view.conteiner}>
			<div className={view.preloader} style={cssPreloader}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Preloader;
