export function isAreasDifferent(arrA, arrB) {
	if (arrA === arrB) {
		return false;
	}
	const dif = arrB.filter((item, i) => item !== arrA[i]);
	return dif.length > 0;
}
