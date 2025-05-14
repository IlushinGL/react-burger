import { useEffect, useCallback } from 'react';

export function useEscapeAndClick(onClose: () => void) {
	const handleEscKey = useCallback(
		(evt: any) => {
			if (evt.key === 'Escape' || evt.target.classList.contains('overlay')) {
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
