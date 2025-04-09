export function keyGenerator(strArea) {
	// принимает массив строк вида ['room', '-1', '2a', '3']
	// возвращает строку вида 'room|-1|2a|3'
	return strArea.join('|');
}

export function keyParser(strKey) {
	// принимает строку вида 'room|-1|2a|3'
	// возврашает массив строк вида ['room', '-1', '2a', '3']
	return strKey.split('|');
}
