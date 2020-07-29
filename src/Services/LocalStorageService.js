export const loadLocalstorage = (key) => {
	try {
		const serializedState = localStorage.getItem(key);
		if (!serializedState) {
			return undefined;
		}
		else {
			return JSON.parse(serializedState)
		}
	}
	catch (e) {
		console.error("Can't get localStorage", e)
		return undefined;
	}
}

export const saveLocalstorage = (key, value) => {
	try {
		const serializedState = JSON.stringify(value)
		localStorage.setItem(key, serializedState)
	}
	catch (e) {
		console.error("Can't set localStorage", e)
	}
}

export const deleteLocalstorage = (key) => {
	try {
		localStorage.removeItem(key)
	}
	catch (e) {
		console.error("Can't delete localStorage", e)
	}
}