import conteiner from './err-details.module.scss';

export function ErrDetailes({ item }: { item: string }) {
	return <div className={conteiner.info}>{item}</div>;
}
