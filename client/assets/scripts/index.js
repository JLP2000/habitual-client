const overdue = document.getElementById("overdue-list")
const today = document.getElementById("today-list")
const upcoming = document.getElementById("upcoming-list")

window.addEventListener("load", loadDate)
window.addEventListener("load", renderUsername)
window.addEventListener("load", renderOverdue)
window.addEventListener("load", renderToday)
window.addEventListener("load", renderUpcoming)

async function loadDate() {
	let today_date = new Date().toString()
	let date = today_date.split(" ")
	console.log(date)
	const dateInfo = document.querySelector("#dateInfo")
	dateInfo.textContent = `${date[0]} ${date[2]} ${date[1]} ${date[3]}`
}

async function renderUsername() {
	const info = document.querySelector("#loginInfo")
	info.textContent = ""
	let username = await GetUsername()
	info.textContent = `Logged in as: ${username}`
}

async function renderOverdue() {
	let incomplete = await getOverdue()
	incomplete.forEach((habitdate) => loadList(overdue, habitdate, true))
}

async function renderToday() {
	let incomplete = await getToday()
	if (incomplete.length > 0) {
		document.getElementById("noHabits").style.display = "none"
		document.getElementById("bird").style.display = "none"

		incomplete.forEach((habitdate) => loadList(today, habitdate))
	} else {
		document.getElementById("noHabits").style.display = "inline-block"
		document.getElementById("bird").style.display = "inline-block"
	}
}

async function renderUpcoming() {
	let incomplete = await getUpcoming()
	incomplete.forEach((habitdate) => loadList(upcoming, habitdate, true))
}

function loadList(list, data, showDate) {
	const form = document.createElement("form")
	form.setAttribute("class", "habitdate")
	form.setAttribute("id", `form_${data.habitdate_id}`)
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.setAttribute("id", data.habitdate_id)
	checkbox.setAttribute("class", "input-checkbox")
	checkbox.setAttribute("name", "completed")
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