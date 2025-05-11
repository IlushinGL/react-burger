import { func, object } from 'prop-types';
import conteiner from './modal-overlay.module.scss';
import { useEscapeAndClick } from '@utils/hooks/useEscapeAndClick';

interface IModalOverlayProps {
	onClose: () => void;
	children: any;
}

export function ModalOverlay({ onClose, children }: IModalOverlayProps) {
	useEscapeAndClick(onClose);
	return <div className={conteiner.overlay + ' overlay '}>{children}</div>;
}

ModalOverlay.propTypes = {
	onClose: func,
	children: object,
};
