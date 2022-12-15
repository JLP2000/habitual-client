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

/**
 * @param {Array<{
 * 	habitName: string,
 * 	habit_id: string
 * 	streakCount: number
 * }>} streaksArr
 */
const organiseStreaksByPage = (streaksArr) => {
	console.log("streaksArr: ", streaksArr)
	let pageCount = 0
	const pageEntries = Array.from(streaksArr).reduce((acc, curr, index) => {
		if (index > 0 && index % 7 === 0) {
			//create new page to push streaks into
			pageCount++
		}
		const curPage = acc[pageCount] ?? []
		return { ...acc, [pageCount]: [...curPage, curr] }
	}, {})

	return pageEntries
}
