import { useEffect, useCallback } from 'react';

export function useEscapeAndClick(onClose) {
	const handleEscKey = useCallback(
		(event) => {
			if (
				event.key === 'Escape' ||
				event.target.classList.contains('overlay')
			) {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('keyup', handleEscKey);
		document.addEventListener('mouseup', handleEscKey);
		return () => {
			document.removeEventListener('keyup', handleEscKey);
			document.removeEventListener('mouseup', handleEscKey);
		};
	}, [handleEscKey]);
}
