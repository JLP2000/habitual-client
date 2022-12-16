const overdue = document.getElementById("overdue-list")
const today = document.getElementById("today-list")
const upcoming = document.getElementById("upcoming-list")
const streakElement = document.querySelector("#streakNum")
window.addEventListener("load", loadDate)
window.addEventListener("load", renderUsername)
window.addEventListener("load", renderOverdue)
window.addEventListener("load", renderToday)
window.addEventListener("load", renderUpcoming)

// * data stored here

let allHabitsData

// * on page load

getAllHabits()
	.then((data) => {
		allHabitsData = data

		//render elements
		renderOverdue()
		renderToday()
		renderUpcoming()
	})
	.catch((err) => {
		console.error(err)
		if (err.status == 401) {
			window.location.assign("login.html")
		}
	})

getStreaksData()
	.then((data) => {
		streakElement.textContent = `${data[0].habitName} (${data[0].streakCount})`
	})
	.catch((err) => console.warn(err))

// * utilities

function filterIncomplete(data) {
	let incomplete = data.filter((habit) => habit.complete == false)
	return incomplete
}

function getOverdue(data) {
	const incomplete = filterIncomplete(data)
	const filteredByOverdue = incomplete.filter(
		(habit) => new Date(habit.date) < yesterday
	)
	// console.log(filteredByOverdue)
	return filteredByOverdue
}

function getToday(data) {
	const filteredByToday = data.filter((habit) => {
		return new Date(habit.date).toJSON().slice(0, 10) == today_date
	})
	return filteredByToday
}

function getUpcoming(data) {
	const incomplete = filterIncomplete(data)
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

// * render

async function loadDate() {
	let today_date = new Date().toString()
	let date = today_date.split(" ")
	const dateInfo = document.querySelector("#dateInfo")
	dateInfo.textContent = `${date[0]} ${date[2]} ${date[1]} ${date[3]}`
}

async function renderUsername() {
	const info = document.querySelector("#loginInfo")
	info.textContent = ""
	let username = await GetUsername()
	info.textContent = `Logged in as: ${username}`
}

function renderOverdue() {
	if (!allHabitsData) return
	let incomplete = getOverdue(allHabitsData)

	incomplete.forEach((habitdate) => loadList(overdue, habitdate, true))
}

function renderToday() {
	if (!allHabitsData) return
	let incomplete = getToday(allHabitsData)
	if (incomplete.length > 0) {
		document.getElementById("noHabits").style.display = "none"
		document.getElementById("bird").style.display = "none"

		incomplete.forEach((habitdate) => loadList(today, habitdate))
	} else {
		document.getElementById("noHabits").style.display = "block"
		document.getElementById("bird").style.display = "block"
	}
}

function renderUpcoming() {
	if (!allHabitsData) return
	let incomplete = getUpcoming(allHabitsData)
	incomplete.forEach((habitdate) => loadList(upcoming, habitdate, true, true))
}

function loadList(list, data, showDate, disableCheckbox) {
	const form = document.createElement("form")
	form.setAttribute("class", "habitdate")
	form.setAttribute("id", `form_${data.habitdate_id}`)
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.setAttribute("id", data.habitdate_id)
	checkbox.setAttribute("class", "input-checkbox")
	checkbox.setAttribute("name", "completed")

	// Users cannot complete upcoming habits
	if (disableCheckbox) {
		checkbox.disabled = true
	}

	checkbox.setAttribute("autocomplete", "off")
	//check data and set if complete
	if (data.complete) {
		checkbox.setAttribute("checked", "checked")
		checkbox.classList.add("ticked")
	}

	checkbox.onclick = (ev) => updateHabitdate(ev)
	const label = document.createElement("label")
	label.setAttribute("class", "checkbox")
	label.setAttribute("for", data.habitdate_id)
	const span1 = document.createElement("span")
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("viewport", "0 0 12 9")
	const polyline = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"polyline"
	)
	polyline.setAttribute("points", "1 5 4 8 11 1")
	const span2 = document.createElement("span")

	// text content format: Habit Name (DD-MM-YYYY)
	if (showDate) {
		span2.textContent = `${data.name} (${
			data.date.slice(0, 10).split("-")[2]
		}-${data.date.slice(0, 10).split("-")[1]}-${
			data.date.slice(0, 10).split("-")[0]
		})`
	} else {
		span2.textContent = `${data.name}`
	}

	list.appendChild(form)
	form.appendChild(checkbox)
	form.appendChild(label)
	label.appendChild(span1)
	span1.appendChild(svg)
	svg.appendChild(polyline)
	label.appendChild(span2)
}

function hideOverdue() {
	const form = document.getElementById(`form_${id}`)
	form.style.display = "none"
}
