const overdue = document.getElementById("overdue-list")
const today = document.getElementById("today-list")
const upcoming = document.getElementById("upcoming-list")

window.addEventListener("load", renderOverdue)
window.addEventListener("load", renderToday)
window.addEventListener("load", renderUpcoming)

async function renderOverdue() {
	let incomplete = await getOverdue()
	incomplete.forEach((habitdate) => loadList(overdue, habitdate))
}

async function renderToday() {
	let incomplete = await getToday()
	if (incomplete.length > 0) {
		document.getElementById("noHabits").style.display = "none"
		document.getElementById("bird").style.display = "none"
	
		const today = document.getElementsByClassName("today-list")
		incomplete.forEach((habitdate) => loadList(today, habitdate))
	} else {
		document.getElementById("noHabits").style.display = "inline-block"
		document.getElementById("bird").style.display = "inline-block"
	}}

async function renderUpcoming() {
	let incomplete = await getUpcoming()
	incomplete.forEach((habitdate) => loadList(upcoming, habitdate))
}

function loadList(list, data) {
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.setAttribute("id", data.habitdate_id)
	checkbox.setAttribute("class", "input-checkbox")
	const label = document.createElement("label")
	label.setAttribute("class", "checkbox")
	label.setAttribute("for", data.habitdate_id)
	const span1 = document.createElement("span")
	const svg = document.createElement("svg")
	svg.setAttribute("viewport", "0 0 12 9")
	const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	polyline.setAttribute("points", "1 5 4 8 11 1")
	const span2 = document.createElement("span")
	span2.textContent = data.name

	list.appendChild(checkbox)
	list.appendChild(label)
	label.appendChild(span1)
	span1.appendChild(svg)
	svg.appendChild(polyline)
	label.appendChild(span2)
}

const checkboxes = document.querySelectorAll("input[type=checkbox]")
checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", updateCompleted)
})
