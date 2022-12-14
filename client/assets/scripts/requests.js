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

async function postNewHabit(e) {
	e.preventDefault()

	const habitObj = Object.fromEntries(new FormData(e.target))
	if (habitObj.timeframe === "days") {
		habitObj.interval_in_days = habitObj.intervalNum
	} else habitObj.interval_in_months = habitObj.intervalNum

	//delete unwanted body props
	delete habitObj.intervalNum
	delete habitObj.timeframe

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
	// console.log(filteredByOverdue)
	return filteredByOverdue
}

//TODO refactor to use stored data from filterIncomplete
async function getToday() {
	const allhabits = await getAllHabits()
	const filteredByToday = allhabits.filter((habit) => {
		return new Date(habit.date).toJSON().slice(0, 10) == today_date
	})
	return filteredByToday
}

//TODO refactor to use stored data from filterIncomplete
async function getUpcoming(id) {
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

async function getDatebyID(id){
	return new Promise(async (res, rej) => {
		const response = await fetch(`http://localhost:3000/habitdates/${id}`)
		return response.rows[0].date
	})
}

function getOntime(id) {
	let now = new Date().toJSON().slice(0, 10)
	if (now == getDatebyID(id)) {
		on_time = true
		return on_time
	} else {
		return false
	}
}

async function updateHabitdate(updateDataEvent) {
	let id = updateDataEvent.target.id
	const thisEl = document.getElementById(`${id}`)
	thisEl.setAttribute("checked", "checked")
	thisEl.classList.add("ticked")
	let on_time = await getOntime(id)
	const req = {
		complete: true,
		on_time: on_time,
	}
	try {
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req),
		}
		const response = await fetch(
			`http://localhost:3000/habitdates/${id}`,
			options
		)
		return response
	} catch (err) {
		console.warn(err)
	}
}

async function GetUsername() {
	try {
		const options = {
			headers: { Authorization: localStorage.getItem("session") },
		}
		let token = localStorage.getItem("session")
		const response = await fetch(`http://localhost:3000/users/${token}`)
		const data = await response.json()

		return data.title
	} catch (err) {
		console.warn(err)
	}
}
