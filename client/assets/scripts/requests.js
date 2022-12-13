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
	} catch (err) {
		console.warn(err)
	}
}

const newForm = document.querySelector("form")
newForm.addEventListener("submit", postNewHabit)

// habitdate functions
let todayDate = dayjs().format('DD/MM/YYYY')
async function filterIncomplete() {
	const allhabits = await getAllHabits()
	let incomplete = allhabits.filter((habit) => habit.complete == false)
	return incomplete
}

async function getOverdue() {
	const incomplete = await filterIncomplete()
	const filteredByOverdue = incomplete.filter((habit) => habit.on_time == false)
	return filteredByOverdue
}

async function getToday() {
	const incomplete = await filterIncomplete()
	const  filteredByToday = incomplete.filter((habitDate) => habitDate.date == today)
	return filteredByToday
}

async function getUpcoming() {
	const incomplete = await filterIncomplete()
	const filteredByUpcoming = incomplete.filter((habitDate) =>
		dayjs(habitDate.date).isAfter(dayjs().format('DD/MM/YYYY'))
	)
	return filteredByUpcoming
=======
// habitdate functions



async function updateCompleted(checkbox) {
	let id = checkbox.id
	try {
		const options = {
			method: "GET",
		}
		await fetch(`http://localhost:3000/habitdates/${id}`)
	} catch (err) {
		console.warn(err)
	}
}

const newForm = document.querySelector("form")
newForm.addEventListener("submit", postNewHabit)
