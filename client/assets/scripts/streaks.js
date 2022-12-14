const streakElement = document.querySelector("#streakNum")

let ongoingHabits = []

getAllHabits().then((data) => {
	//filter habits that are ongoing
	let groupedHabitsById = groupHabitsById(data)
	Object.entries(groupedHabitsById).forEach((habit) => {
		let habitDates = habit[1]

		let length = habitDates.length
		for (let i = length - 1; i > 0; i--) {
			if (
				dayjs(habitDates[i].date).isAfter(dayjs()) ||
				dayjs(habitDates[i].date).isSame(dayjs(), "day")
			) {
				ongoingHabits.push({ [habit[0]]: habit[1] })
				break
			}
		}
	})

	let maxStreak = 0

	ongoingHabits.forEach((habit) => {
		let habitDatesBefore = Object.values(habit)[0].filter((habitdate) => {
			return dayjs(habitdate.date).isBefore(dayjs())
		})

		habitDatesBefore.sort((a, b) => {
			return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
		})

		let count = 0
		let length = habitDatesBefore.length
		for (let i = length - 1; i > 0; i--) {
			//ignore habitdate if today
			if (dayjs(habitDatesBefore[i].date).isSame(dayjs(), "day")) continue

			if (habitDatesBefore[i].on_time) count++
			else break
		}
		if (count > maxStreak) maxStreak = count
	})

	streakElement.textContent = maxStreak
})
