const habitsContainer = document.querySelector(".habits-container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")
const paginationContainer = document.querySelector(".pagination")

let groupedHabits
let groupedHabitsByPage

async function loadHabits() {
	getStreaksData()
		.then((data) => {
			//reduce data to pages of 7
			groupedHabitsByPage = organiseStreaksByPage(data)
			console.log(groupedHabitsByPage)
			//find out which page user is on
			const path = window.location.href
			let pageNum = path.split("page=")[1] ?? "1"
			pageNum = pageNum.substring(0, 1)

			//use length of groupedHabitsByPage to display pagination
			if (Object.values(groupedHabitsByPage).length > 1) {
				displayPagination(Object.values(groupedHabitsByPage).length, pageNum)
			}

			Object.values(groupedHabitsByPage)[pageNum - 1].forEach((habit) => {
				const el = createHabitElement(habit)
				habitsContainer.appendChild(el)
			})
		})
		.catch((err) => {
			if (err.status === 401) {
				window.location.assign("login.html")
			}
			console.error(err)
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
	const habit = document.createElement("div")
	habit.className = "habit-container"

	const header = document.createElement("h2")
	header.className = "habit-name"
	header.textContent = data.habitName
	habit.appendChild(header)

	const streak = document.createElement("h3")
	streak.className = "habit-name"
	streak.textContent = `${data.streakCount} streak`

	habit.appendChild(streak)

	habit.style.borderBottomColor = "#8758ff"

	return habit
}

window.addEventListener("hashchange", updateContent)

function updateContent(e) {
	let hash = window.location.hash.substring(1)
	//check if string contains 'habit'
	//else change page by number selected
	if (hash.includes("habit")) {
		let habitNum = hash.substring(5)
		let habit = groupedHabits[habitNum]
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
