import { func, object } from 'prop-types';
import conteiner from './modal-overlay.module.scss';
import { useEscapeAndClick } from '../../../hooks/useEscapeAndClick';

export function ModalOverlay({ onClose, children }) {
	useEscapeAndClick(onClose);
	return <div className={conteiner.overlay + ' overlay '}>{children}</div>;
}

ModalOverlay.propTypes = {
	onClose: func,
	children: object,
};
