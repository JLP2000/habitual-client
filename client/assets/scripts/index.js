const container = document.querySelector(".container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")

window.addEventListener("hashchange", updateLists)

function updateLists() {
	const overdue = document.getElementsByClassName("overdue-list")
	loadList(overdue, overdueData)
	const upcoming = document.getElementsByClassName("upcoming-list")
	loadList(upcoming, upcomingData)
	if (todayData.length==0){
		document.getElementsByClassName("bird").style.display = "none"
		const today = document.getElementsByClassName("today-list")
		loadList(today, todayData)
	}
}


function loadList(list,data) {
	const checkbox = document.createElement("input")
	checkbox.setAttribute("type", "checkbox")
	checkbox.setAttribute("id", data.habit_id)
	checkbox.setAttribute("class", "input-checkbox")
	const label = document.createElement("label")
	label.setAttribute("class", "checkbox")
	label.setAttribute("for", data.habit_id)
	const span1 = document.createElement("span")
	const svg = document.createElement("svg")
	svg.setAttribute("viewport", "0 0 12 9")
	const polyline = createElement("polyline")
	polyline.setAttribute("points", "1 5 4 8 11 1")
	const span2 = document.createElement("span")
	span2.textContent = data.habit

	list.appendChild(checkbox)
	list.appendChild(label)
	label.appendChild(span1)
	span1.appendChild(svg)
	svg.appendChild(polyline)
	label.appendChild(span2)
}