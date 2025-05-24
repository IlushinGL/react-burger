import styles from './order-stack-imgs.module.scss';

interface IOrderIngredientImgProps {
	len: number;
	column: number;
	img: string;
}

export function OrderIngredientImg({
	len,
	column,
	img,
}: IOrderIngredientImgProps) {
	if (column > 5) {
		return null;
	} else if (column === 5 && len > column + 1) {
		const extra_len = len - 6;
		return (
			<div>
				<img
					className={styles.img + ' ' + styles.img_6}
					src={img}
					alt={'img' + column}
				/>
				<div className={styles.more}>{'+' + extra_len}</div>
			</div>
		);
	}
	return (
		<img
			className={styles.img + ' ' + styles['img_' + column]}
			src={img}
			alt={'img' + column}
		/>
	);
}
