import { number, bool } from 'prop-types';
import view from './preloader.module.scss';

function Preloader({ box, visible }) {
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

Preloader.propTypes = {
	box: number,
	visible: bool,
};

export default Preloader;
