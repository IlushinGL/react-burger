import conteiner from './modal-overlay.module.scss';
import { useEscapeAndClick } from '@utils/hooks/useEscapeAndClick';
import { ReactElement } from 'react';

interface IModalOverlayProps {
	onClose: () => void;
	children: ReactElement;
}

export function ModalOverlay({ onClose, children }: IModalOverlayProps) {
	useEscapeAndClick(onClose);
	return <div className={conteiner.overlay + ' overlay '}>{children}</div>;
}
