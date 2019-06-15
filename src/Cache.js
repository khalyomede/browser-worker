class Cache {
	/**
	 *
	 * @param {Any} name
	 * @return {Boolean}
	 */
	static nameIsValid(name) {
		return typeof name === "string";
	}

	/**
	 *
	 * @param {String} name
	 * @return {Boolean}
	 */
	static nameIsFilled(name) {
		return name.trim().length > 0;
	}
}

export default Cache;
