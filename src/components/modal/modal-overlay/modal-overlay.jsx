import conteiner from './modal-overlay.module.scss';
import { useEscapeAndClick } from '../../../hooks/useEscapeAndClick';

export function ModalOverlay({ onClose, visible = false, children }) {
	useEscapeAndClick(onClose);
	return (
		<div
			className={
				conteiner.overlay +
				' overlay ' +
				(visible ? conteiner.overlay_visible : conteiner.overlay_hidden)
			}>
			{children}
		</div>
	);
}
