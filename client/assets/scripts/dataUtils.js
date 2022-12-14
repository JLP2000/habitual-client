const groupHabitsById = (data) => {
	const groupedData = [...data].reduce((acc, curr) => {
		const key = curr["habit_id"]
		const curGroup = acc[key] ?? []

		return { ...acc, [key]: [...curGroup, curr] }
	}, {})
	return groupedData
}

const organiseHabitsByPage = (groupedHabits) => {
	let pageCount = 0

	const pageEntries = Object.entries(groupedHabits).reduce(
		(acc, curr, index) => {
			if (index > 0 && index % 7 === 0) {
				//create new page to push groups into
				pageCount++
			}
			const curPage = acc[pageCount] ?? []
			return {
				...acc,
				[pageCount]: [...curPage, { [curr[0]]: [...curr[1]] }],
			}
		},
		{}
	)

	return pageEntries
}
