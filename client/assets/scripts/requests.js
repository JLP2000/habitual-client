const link = "https://habitual-server.onrender.com"

async function getAllHabits() {
	return new Promise(async (res, rej) => {
		const options = {
			headers: {
				Authorization: localStorage.getItem("session"),
			},
		}
		const response = await fetch(`${link}/habits`, options)

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
		const response = await fetch(`${link}/habits`, options)
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
		const response = await fetch(`${link}/habits/${id}`, options)
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
		const response = await fetch(`${link}/habits/${updateData.id}`, options)
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

async function getDatebyID(id) {
	return new Promise(async (res, rej) => {
		const options = {
			method: "GET",
		}
		const response = await fetch(`${link}/habitdates/${id}`, options)
		let habitdate = await response.json()
		let date = habitdate.date
		res(date)
	})
}

async function getOntime(id) {
	let now = dayjs()
	const habitDate = await getDatebyID(id)
	if (now.isSame(dayjs(habitDate), "day")) {
		let on_time = true
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
		const response = await fetch(`${link}/habitdates/${id}`, options)
		return response
	} catch (err) {
		console.warn(err)
	} finally {
		getStreaksData()
			.then((data) => {
				document.querySelector("#streakNum").textContent = data[0].streakCount
			})
			.catch((err) => console.warn(err))
	}
}

async function GetUsername() {
	try {
		const options = {
			headers: { Authorization: localStorage.getItem("session") },
		}
		let token = localStorage.getItem("session")
		const response = await fetch(`${link}/users/${token}`)
		const data = await response.json()

		return data.title
	} catch (err) {
		console.warn(err)
	}
}

async function getStreaksData() {
	return new Promise(async (res, rej) => {
		let ongoingHabits = []

		getAllHabits()
			.then((data) => {
				//filter habits that are ongoing
				let groupedHabitsById = groupHabitsById(data)
				Object.entries(groupedHabitsById).forEach((habit) => {
					let habitDates = habit[1]

					let length = habitDates.length
					for (let i = length - 1; i >= 0; i--) {
						if (
							dayjs(habitDates[i].date).isAfter(dayjs()) ||
							dayjs(habitDates[i].date).isSame(dayjs(), "day")
						) {
							ongoingHabits.push({ [habit[0]]: habit[1] })
							break
						}
					}
				})

				let streaksArr = []

				ongoingHabits.forEach((habit) => {
					let habitDatesBefore = Object.values(habit)[0].filter((habitdate) => {
						return (
							dayjs(habitdate.date).isBefore(dayjs()) ||
							dayjs(habitdate.date).isSame(dayjs(), "day")
						)
					})

					habitDatesBefore.sort((a, b) => {
						return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
					})
					console.log(habitDatesBefore)

					let count = 0
					let length = habitDatesBefore.length
					for (let i = length - 1; i >= 0; i--) {
						console.log(habitDatesBefore[i])
						if (habitDatesBefore[i]["on_time"]) {
							count++
						} else {
							if (dayjs(habitDatesBefore[i].date).isSame(dayjs(), "day")) {
								//check yesterday for ongoing streak,
								if (i === 0) break
								if (habitDatesBefore[i - 1]["on_time"]) continue
							} else break
						}
					}

					streaksArr.push({
						habit_id: Object.keys(habit)[0],
						habitName: Object.values(habit)[0][0].name,
						streakCount: count,
					})
				})

				//sort descending
				streaksArr.sort((a, b) => b.streakCount - a.streakCount)
				res(streaksArr)
			})
			.catch((err) => rej(err))
	})
}
