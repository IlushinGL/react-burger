import { ReactElement } from 'react';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import conteiner from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
	text: string;
	style?: string;
	onClose: () => void;
	children: ReactElement;
}

export function Modal({
	text,
	style = 'text',
	onClose,
	children,
}: IModalProps) {
	return (
		<ModalOverlay onClose={onClose}>
			<div className={conteiner.box} data-testid='ingredient-detailes'>
				<div className={conteiner.header}>
					<div className={conteiner[style]}>{text}</div>
					<button
						className={conteiner.close}
						onClick={onClose}
						data-testid='ingredient-detailes-x'>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div className={conteiner.content}>{children}</div>
			</div>
		</ModalOverlay>
	);
}
