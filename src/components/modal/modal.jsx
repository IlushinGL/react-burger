import { string, func, object } from 'prop-types';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import conteiner from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function Modal({ text, onClose, children }) {
	return (
		<ModalOverlay onClose={onClose}>
			<div className={conteiner.box}>
				<div className={conteiner.header}>
					<div className={conteiner.text}>{text}</div>
					<button className={conteiner.close} onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div className={conteiner.content}>{children}</div>
			</div>
		</ModalOverlay>
	);
}

Modal.propTypes = {
	text: string,
	onClose: func,
	children: object,
};
