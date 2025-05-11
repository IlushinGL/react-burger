import view from './preloader.module.scss';

interface IPreloader {
	box: number;
	visible: boolean;
}

function Preloader({ box, visible }: IPreloader) {
	const cssPreloader = {
		transform: `scale(${box / 80})`,
	};

	return (
		<div
			className={
				view.conteiner +
				' ' +
				(visible ? view.conteiner_visible : view.conteiner_hidden)
			}>
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
