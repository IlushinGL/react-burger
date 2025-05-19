import { useEffect, useCallback } from 'react';

export function useEscapeKey(onClose: () => void) {
	const handleEscKey = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('keyup', handleEscKey);
		return () => {
			document.removeEventListener('keyup', handleEscKey);
		};
	});
}

export function useOutsideClick(onClose: () => void) {
	const handleClick = useCallback(
		(event: MouseEvent) => {
			if ((event.target as HTMLElement).classList.contains('overlay')) {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('mouseup', handleClick);
		return () => {
			document.removeEventListener('mouseup', handleClick);
		};
	});
}
