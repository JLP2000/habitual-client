const container = document.querySelector(".container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")

window.addEventListener("hashchange", updateList)

function updateList() {
	updateOverdue()
	updateToday()
	updateUpcomming()
}

function updateOverdue(habit) {
	const overdueList = document.getElementsByClassName("overdue-list")
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.setAttribute("id", habit_id)
	checkbox.setAttribute("class", "input-checkbox")
	const label = document.createElement("label")
	label.setAttribute("class", "checkbox")
	label.setAttribute("for", habit_id)
	const span1 = dpocument.createElement("span")
	const svg = document.createElement("svg")
	svg.setAttribute("viewport", "0 0 12 9")
	const polyline = createElement("polyline")
	polyline.setAttribute("points", "1 5 4 8 11 1")
	const span2 = dpocument.createElement("span")
	span2.textContent = habit

	overdueList.appendChild(checkbox)
	overdueList.appendChild(label)
	label.appendChild(span1)
	span1.appendChild(svg)
	svg.appendChild(polyline)
	label.appendChild(span2)
}
