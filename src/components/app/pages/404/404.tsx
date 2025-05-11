import conteiner from './404.module.scss';
import { Link, useResolvedPath } from 'react-router-dom';
import { APP_PATH } from '@utils/customConfig';

export function NotFound() {
	const errPath = useResolvedPath('').pathname;
	return (
		<main className={conteiner.page}>
			<div className={conteiner.block}>
				<div className={conteiner.title}>Страница {errPath} не найдена</div>
				<Link to={APP_PATH.home} className={conteiner.link}>
					Перейти в конструктор
				</Link>
			</div>
		</main>
	);
}
