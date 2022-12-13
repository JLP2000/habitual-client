const habitsContainer = document.querySelector(".habits-container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")

async function loadHabits() {
	getAllHabits()
		.then((data) => {
			console.log([...data])
			const uniqueHabits = [...data].reduce((acc, curr) => {
				const key = curr["habit_id"]
				const curGroup = acc[key] ?? []

				return { ...acc, [key]: [...curGroup, curr] }
			}, {})

			for (const [key, value] of Object.entries(uniqueHabits)) {
				const el = createHabitElement(value[0])
				habitsContainer.appendChild(el)
			}
		})
		.catch((err) => {
			if (err.status === 401) {
				window.location.assign("login.html")
			}
		})
}

async function loadHabitById(id) {
	getHabitById(id)
		.then((data) => console.log(data))
		.catch((err) => {
			console.warn(JSON.stringify(err))
		})
}

function createHabitElement(data) {
	console.log(data)
	const habitLink = document.createElement("a")
	habitLink.href = `#${data.habit_id}`

	const habit = document.createElement("div")
	habit.className = "habit-container"

	const header = document.createElement("h2")
	header.className = "habit-name"
	header.textContent = data.name
	habit.appendChild(header)

	const note = document.createElement("p")
	note.className = "habit-note"
	note.textContent = formatNote(data.note)
	habit.appendChild(note)

	habit.style.backgroundColor = data.colour ?? "slategrey"

	habitLink.appendChild(habit)
	return habitLink
}

window.addEventListener("hashchange", updateContent)

function updateContent(e) {
	let hash = window.location.hash.substring(1)
	// to be used when connected to server
	// loadHabitById(hash)
	let habitIndex = data.findIndex((habit) => habit.id == hash)
	renderMenuContent(data[habitIndex])
}

function renderMenuContent(habit) {
	document.querySelector(".menu-placeholder").style.display = "none"
	editButton.style.display = "inline-block"
	deleteButton.style.display = "inline-block"
	document.querySelector(".menu-content").style.display = "flex"

	const infoEls = document.querySelectorAll(".menu-info")
	infoEls.forEach((el) => el.classList.add("menu-info-show"))

	const header = document.querySelector(".menu-name")
	header.className = "menu-name"
	header.textContent = habit.name

	const start = document.querySelector(".menu-start")
	start.className = "menu-start"
	start.textContent = habit.start_date

	const end = document.querySelector(".menu-end")
	end.className = "menu-end"
	end.textContent = habit.end_date

	const interval = document.querySelector(".menu-interval")
	interval.className = "menu-interval"
	interval.textContent = formatInterval(
		habit.interval_in_days,
		habit.interval_in_months
	)

	const note = document.querySelector(".menu-note")
	note.className = "menu-note"
	note.textContent = habit.note

	const colour = document.querySelector(".menu-colour")
	colour.className = "menu-colour"
	colour.textContent = habit.colour
}

function onEditHabit(e) {
	console.log("edit")
}

function onDeleteHabit(e) {
	console.log("delete")
}

editButton.addEventListener("click", onEditHabit)
deleteButton.addEventListener("click", onDeleteHabit)

function formatInterval(days, months) {
	if (days) {
		if (days == 1) return "Daily"
		if (days % 7 === 0) return "Weekly"
		return `Every ${days} days`
	}
	if (months) {
		if (months == 1) return "Monthly"
		return `Every ${months} months`
	}
}

function formatNote(note = "") {
	if (note.length > 50) return `${note.substring(0, 50)}...`
	else return note
}

loadHabits()
