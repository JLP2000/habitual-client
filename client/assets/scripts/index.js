// window.addEventListener("onload", renderLists)
window.addEventListener("hashchange", renderLists)

async function renderLists() {
	console.log("hello everyone except sheena")
	const overdueData = await getOverdue()
	console.log(overdueData)
	// const todayData = await getToday()
	// const upcomingData = await upcomingData()

	// const overdue = document.getElementsByClassName("overdue-list")
	// overdueData.forEach((habitdate) => loadList(overdue, habitdate))

	// const upcoming = document.getElementsByClassName("upcoming-list")
	// upcomingData.forEach((habitdate) => loadList(upcoming, habitdate))

	// if (todayData.length == 0) {
	// 	document.getElementsByClassName("bird").style.display = "none"

	// 	const today = document.getElementsByClassName("today-list")
	// 	todayData.forEach((habitdate) => loadList(today, habitdate))
	// } else {
	// 	document.getElementsByClassName("bird").style.display = "inline-block"
	// }
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
	const polyline = createElement("polyline")
	polyline.setAttribute("points", "1 5 4 8 11 1")
	const span2 = document.createElement("span")
	span2.textContent = data.habitdate_id

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

function loadStreak() {}
