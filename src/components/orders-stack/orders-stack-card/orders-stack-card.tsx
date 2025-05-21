import { TOrderCard } from '@utils/types';

interface IOrderCardProps {
	item: TOrderCard;
}

export function OrderCard({ item }: IOrderCardProps) {
	console.log(item);
}

export function OrderItem({ item }: IOrderCardProps) {
	console.log(item);
}
