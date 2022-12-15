const habitsContainer = document.querySelector(".habits-container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")
const paginationContainer = document.querySelector(".pagination")

let groupedHabits
let groupedHabitsByPage

async function loadHabits() {
	getAllHabits()
		.then((data) => {
			groupedHabits = {}
			groupedHabitsByPage = {}

			//group habitdates by habit id
			groupedHabits = groupHabitsById(data)

			//reduce groupedhabits to pages of 7
			groupedHabitsByPage = organiseHabitsByPage(groupedHabits)

			//find out which page user is on
			const path = window.location.href
			let pageNum = path.split("page=")[1] ?? "1"
			pageNum = pageNum.substring(0, 1)

			//use length of groupedHabitsByPage to display pagination
			if (Object.values(groupedHabitsByPage).length > 1) {
				displayPagination(Object.values(groupedHabitsByPage).length, pageNum)
			}

			Object.entries(groupedHabitsByPage)[pageNum - 1][1].forEach((habit) => {
				const el = createHabitElement(Object.values(habit)[0][0])
				habitsContainer.appendChild(el)
			})
		})
		.catch((err) => {
			if (err.status === 401) {
				window.location.assign("login.html")
			}
		})
}

function displayPagination(pagesAmount, pageNum) {
	for (let i = 0; i < pagesAmount; i++) {
		const el = document.createElement("a")
		el.setAttribute("href", `?page=${i + 1}`)
		el.textContent = i + 1
		if (i == pageNum - 1) el.classList.add("active")
		paginationContainer.appendChild(el)
	}
	paginationContainer.style.visibility = "visible"
}

async function loadHabitById(id) {
	getHabitById(id)
		.then((data) => console.log(data))
		.catch((err) => {
			console.warn(JSON.stringify(err))
		})
}

function createHabitElement(data) {
	const habitLink = document.createElement("a")
	habitLink.href = `#habit${data.habit_id}`

	const habit = document.createElement("div")
	habit.className = "habit-container"

	const header = document.createElement("h2")
	header.className = "habit-name"
	header.textContent = data.name
	habit.appendChild(header)

	const streakData = getStreaksData()
	const streak = document.createElement("h3")
	streak.className = "habit-name"
	streak.textContent = `${streakData} streak`
	habit.appendChild(streak)

	// const note = document.createElement("p")
	// note.className = "habit-note"
	// note.textContent = formatNote(data.note)
	// habit.appendChild(note)

	habit.style.borderBottomColor = data.colour ?? "slategrey"

	habitLink.appendChild(habit)
	return habitLink
}

window.addEventListener("hashchange", updateContent)

function updateContent(e) {
	let hash = window.location.hash.substring(1)
	//check if string contains 'habit'
	//else change page by number selected
	if (hash.includes("habit")) {
		let habitNum = hash.substring(5)
		let habit = groupedHabits[habitNum]
		// renderMenuContent(habit[0])
	}
}

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

function formatNote(note) {
	const thisNote = note ?? ""
	if (thisNote.length > 50) return `${thisNote.substring(0, 50)}...`
	else return thisNote
}

loadHabits()
