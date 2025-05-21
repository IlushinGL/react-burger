import styles from './order-stack-imgs.module.scss';
import tstimg from '../../../utils/blank_user.jpg';

interface IOrderIngredientImgProps {
	len: number;
	column: number;
}

export function OrderIngredientImg({ len, column }: IOrderIngredientImgProps) {
	if (column > 5) {
		return null;
	} else if (column === 5 && len > column + 1) {
		const extra_len = len - 6;
		return (
			<div>
				<img
					className={styles.img + ' ' + styles.img_6}
					src={tstimg}
					alt={'img' + column}
				/>
				<div className={styles.more}>{'+' + extra_len}</div>
			</div>
		);
	}
	return (
		<img
			className={styles.img + ' ' + styles['img_' + column]}
			src={tstimg}
			alt={'img' + column}
		/>
	);
}
