import { string } from 'prop-types';
import conteiner from './err-details.module.scss';

export function ErrDetailes({ item }) {
	return <div className={conteiner.info}>{item}</div>;
}

ErrDetailes.propTypes = {
	item: string,
};
