import conteiner from './modal-overlay.module.scss';
import { useEscapeKey, useOutsideClick } from '@utils/hooks/useEscapeAndClick';
import { ReactElement } from 'react';

interface IModalOverlayProps {
	onClose: () => void;
	children: ReactElement;
}

export function ModalOverlay({ onClose, children }: IModalOverlayProps) {
	useEscapeKey(onClose);
	useOutsideClick(onClose);
	return <div className={conteiner.overlay + ' overlay '}>{children}</div>;
}
