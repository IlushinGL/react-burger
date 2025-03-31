import conteiner from './err-details.module.scss';

export function ErrDetailes({ text }) {
	return <div className={conteiner.info}>{text}</div>;
}
