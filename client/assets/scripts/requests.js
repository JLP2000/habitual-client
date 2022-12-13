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
async function fillterIncomplete() {
	getAllHabits()
		.then((data) => {
			data.filter((habit) => !habit.complete)
			return incomplete
		})
		.catch((err) => {
			if (err.status === 401) {
				window.location.assign("login.html")
			}
		})
}

async function getOverdue() {
	const data = await fillterIncomplete()
	console.log(data)
	try {
		const filteredByOverdue = data.filter((habit) => !habit.on_time)
		return filteredByOverdue
	} catch (err) {
		console.warn(err)
	}
}

async function getToday() {
	const data = await fillterIncomplete()
	try {
		const filteredByToday = data.filter(
			(habitDate) => dayjs(habitDate.date) == dayjs()
		)
		console.log("filteredByToday: ", filteredByToday)
		return filteredByToday
	} catch (err) {
		console.warn(err)
	}
}

//data = []
//filter -> habitdate.date > today
//data.slice(indexfound)

async function getUpcoming() {
	const data = await fillterIncomplete()
	try {
		const filteredByUpcoming = data.filter((habitDate) =>
			dayjs(habitDate.date).isAfter(dayjs())
		)
		console.log("filteredByUpcoming: ", filteredByUpcoming)
		return filteredByUpcoming
	} catch (err) {
		console.warn(err)
	}
}

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
