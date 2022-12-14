const allHabits = getAllHabits()

async function getAllHabits() {
	return new Promise(async (res, rej) => {
		const options = {
			headers: {
				Authorization: localStorage.getItem("session"),
			},
		}
		const response = await fetch("http://localhost:3000/habits", options)

		const habits = await response.json()

		if (response.status !== 200) {
			console.log(response)
			rej(response)
		} else {
			res(habits)
		}
	})
}

async function getHabitById(id) {}

async function postNewHabit(e) {
	e.preventDefault()

	const habitObj = Object.fromEntries(new FormData(e.target))
	if (habitObj.timeframe === "days") {
		habitObj.interval_in_days = habitObj.intervalNum
	} else habitObj.interval_in_months = habitObj.intervalNum

	delete habitObj.intervalNum
	delete habitObj.timeframe

	console.log(habitObj)

	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("session"),
			},
			body: JSON.stringify(habitObj),
		}
		const response = await fetch(`http://localhost:3000/habits`, options)
		const { id, err } = await response.json()
		window.location.reload()
	} catch (err) {
		alert("Failed to create new Habit")
		console.warn(err)
	}
}

async function deleteHabit(id) {
	try {
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("session"),
			},
		}
		const response = await fetch(`http://localhost:3000/habits/${id}`, options)
	} catch (err) {
		console.warn(err)
	}
}

async function updateHabit(updateData) {
	try {
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("session"),
			},
			body: JSON.stringify(updateData),
		}
		const response = await fetch(
			`http://localhost:3000/habits/${updateData.id}`,
			options
		)
	} catch (err) {
		console.warn(err)
	}
}

const newForm = document.querySelector("form")
newForm.addEventListener("submit", postNewHabit)

// habitdate functions
let todayDate = new Date()
let today_date = new Date().toJSON().slice(0, 10)

const yesterday = new Date(todayDate)
yesterday.setDate(yesterday.getDate() - 1)
todayDate.toDateString()
yesterday.toDateString()

async function filterIncomplete() {
	const allhabits = await getAllHabits()
	let incomplete = allhabits.filter((habit) => habit.complete == false)
	return incomplete
}

//TODO refactor to use stored data from filterIncomplete
async function getOverdue() {
	const incomplete = await filterIncomplete()
	const filteredByOverdue = incomplete.filter(
		(habit) => new Date(habit.date) < yesterday
	)
	return filteredByOverdue
}

//TODO refactor to use stored data from filterIncomplete
async function getToday() {
	const incomplete = await filterIncomplete()
	const filteredByToday = incomplete.filter((habit) => {
		return new Date(habit.date).toJSON().slice(0, 10) == today_date
	})
	return filteredByToday
}

//TODO refactor to use stored data from filterIncomplete
async function getUpcoming() {
	const incomplete = await filterIncomplete()
	const filteredByUpcoming = incomplete.filter(
		(habit) => new Date(habit.date) > todayDate
	)
	const uniqueHabitID = [
		...new Set(filteredByUpcoming.map((habit) => habit["habit_id"])),
	]
	const uniqueDates = uniqueHabitID.map((id) =>
		filteredByUpcoming.find((habit) => habit.habit_id == id)
	)
	return uniqueDates
}

async function updateCompleted(checkbox) {
	let habitdate_id = checkbox.id
	try {
		const options = {
			method: "GET",
		}
		await fetch(`http://localhost:3000/habitdates/${id}`)
	} catch (err) {
		console.warn(err)
	}
}
