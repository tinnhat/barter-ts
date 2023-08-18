export const sortByAlphabetical = (data: any, key: string) => {
	const newDataSort = [...data]
	newDataSort.sort(function (a: any, b: any) {
		if (a[key] < b[key]) {
			return -1
		}
		if (a[key] > b[key]) {
			return 1
		}
		return 0
	})
	return newDataSort
}
