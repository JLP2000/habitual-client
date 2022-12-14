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
	//check if string contains 'habit'
	//else change page by number selected
	if (hash.includes("habit")) {
		let habitNum = hash.substring(5)
		let habit = groupedHabits[habitNum]
		renderMenuContent(habit[0])
	}
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
	start.textContent = dayjs(habit.start_date).format("DD/MM/YYYY")

	const end = document.querySelector(".menu-end")
	end.className = "menu-end"
	end.textContent = dayjs(habit.end_date).format("DD/MM/YYYY")

	const interval = document.querySelector(".menu-interval")
	interval.className = "menu-interval"
	interval.textContent = formatInterval(
		habit.interval_in_days,
		habit.interval_in_months
	)

	const note = document.querySelector(".menu-note")
	note.className = "menu-note"
	note.textContent = habit.note

	const colour = document.querySelector(".colour-value")
	colour.textContent = habit.colour
}

function renderEditForm() {
	const name = document.querySelector(".menu-name")
	const note = document.querySelector(".menu-note")
	const colour = document.querySelector(".menu-colour")
	const colourValue = document.querySelector(".colour-value")
	const nameForm = document.querySelector(".edit-name")
	const noteForm = document.querySelector(".edit-note")
	const colourForm = document.querySelector(".edit-colour")
	const updateButton = document.getElementById("updateButton")

	name.style.display = "none"
	note.style.display = "none"
	colour.style.display = "none"
	nameForm.value = name.textContent
	nameForm.style.display = "block"

	noteForm.value = note.textContent
	noteForm.style.display = "block"

	colour.style.display = "block"
	colourForm.value = colourValue.textContent
	colourForm.style.display = "block"

	updateButton.style.display = "block"

	nameForm.focus()
}

function closeEditForm() {
	const name = document.querySelector(".menu-name")
	const note = document.querySelector(".menu-note")
	const colour = document.querySelector(".menu-colour")
	const nameForm = document.querySelector(".edit-name")
	const noteForm = document.querySelector(".edit-note")
	const colourForm = document.querySelector(".edit-colour")
	const updateButton = document.getElementById("updateButton")

	nameForm.style.display = "none"
	noteForm.style.display = "none"
	// name.textContent = nameForm.value
	name.style.display = "block"

	// note.textContent = noteForm.value
	note.style.display = "block"
	colourForm.style.display = "none"
	updateButton.style.display = "none"
	colour.style.display = "none"
}

function onEditHabit(e) {
	renderEditForm()
	const menu = document.querySelector(".menu")
	document.addEventListener("click", (e) => {
		if (!menu.contains(e.target)) {
			closeEditForm()
		}
	})
	document.getElementById("updateButton").addEventListener("click", (e) => {
		const newName = document.querySelector(".edit-name").value
		const newNote = document.querySelector(".edit-note").value
		const newColour = document.querySelector(".edit-colour").value

		const updateData = {
			id: window.location.hash.substring(6),
			name: newName,
			note: newNote,
			colour: newColour,
		}
		updateHabit(updateData)
		closeEditForm()
		window.location.assign("habits.html")
	})
	console.log("edit")
}

function onDeleteHabit(e) {
	const deleteWarning = document.querySelector("#deleteWarning")
	deleteWarning.style.display = "block"
	let id = window.location.hash.substring(6)
	console.log(id)
	document.querySelector("#confirmDelete").addEventListener("click", (e) => {
		deleteHabit(id)
		deleteWarning.style.display = "none"
		window.location.assign("habits.html")
	})
	document.querySelector("#cancelDelete").addEventListener("click", (e) => {
		deleteWarning.style.display = "none"
	})
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

function formatNote(note) {
	const thisNote = note ?? ""
	if (thisNote.length > 50) return `${thisNote.substring(0, 50)}...`
	else return thisNote
}

loadHabits()
