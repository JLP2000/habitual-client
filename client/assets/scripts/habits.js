const data = [
	{
		id: 1,
		user_id: 1,
		name: "hac",
		start_date: "2022-09-20 03:22:18",
		interval_in_days: 10,
		interval_in_months: 0,
		end_date: "2022-05-18 08:20:30",
		note: "justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien",
		colour: "#ecc1c3",
	},
	{
		id: 2,
		user_id: 2,
		name: "imperdiet sapien urna pretium",
		start_date: "2022-03-04 15:49:45",
		interval_in_days: 15,
		interval_in_months: 0,
		end_date: "2022-06-19 02:23:29",
		note: "venenatis tristique fusce congue diam id ornare imperdiet",
		colour: "#a60d5a",
	},
	{
		id: 3,
		user_id: 3,
		name: "aliquam",
		start_date: "2022-01-27 14:41:04",
		interval_in_days: 0,
		interval_in_months: 4,
		end_date: "2022-11-02 19:57:01",
		note: "augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac",
		colour: "#b017b5",
	},
	{
		id: 4,
		user_id: 4,
		name: "cursus",
		start_date: "2022-09-22 01:51:27",
		interval_in_days: 0,
		interval_in_months: 11,
		end_date: "2022-03-08 15:23:36",
		note: "rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet",
		colour: "#cbc109",
	},
	{
		id: 5,
		user_id: 5,
		name: "ligula vehicula consequat",
		start_date: "2022-03-17 06:47:26",
		interval_in_days: 1,
		interval_in_months: 0,
		end_date: "2022-08-13 17:01:11",
		note: "id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas",
		colour: "#4ed1e2",
	},
	{
		id: 6,
		user_id: 6,
		name: "lectus in est risus",
		start_date: "2022-02-17 07:30:25",
		interval_in_days: 0,
		interval_in_months: 3,
		end_date: "2022-07-17 08:46:17",
		note: "nulla integer pede justo lacinia eget tincidunt eget tempus vel",
		colour: "#c1af03",
	},
	{
		id: 7,
		user_id: 7,
		name: "vestibulum sit amet cursus",
		start_date: "2022-05-13 19:25:09",
		interval_in_days: 3,
		interval_in_months: 0,
		end_date: "2022-05-14 13:04:29",
		note: "molestie hendrerit at vulputate",
		colour: "#7ba9ef",
	},
	{
		id: 8,
		user_id: 8,
		name: "quis turpis eget",
		start_date: "2021-12-17 15:00:36",
		interval_in_days: 0,
		interval_in_months: 9,
		end_date: "2022-01-29 23:18:24",
		note: "id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi",
		colour: "#607825",
	},
	{
		id: 9,
		user_id: 9,
		name: "nunc rhoncus dui vel",
		start_date: "2022-01-13 09:39:18",
		interval_in_days: 0,
		interval_in_months: 11,
		end_date: "2022-06-29 14:35:13",
		note: "in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis",
		colour: "#75544a",
	},
	{
		id: 10,
		user_id: 10,
		name: "tortor id nulla",
		start_date: "2022-03-07 05:06:39",
		interval_in_days: 20,
		interval_in_months: 0,
		end_date: "2022-07-12 01:49:01",
		note: "eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus",
		colour: "#55aef3",
	},
]

const habitsContainer = document.querySelector(".habits-container")
const editButton = document.querySelector("#editHabit")
const deleteButton = document.querySelector("#deleteHabit")

async function loadHabits() {
	getAllHabits()
		.then((data) => console.log(data))
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
	const habitLink = document.createElement("a")
	habitLink.href = `#${data.id}`

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

	habit.style.backgroundColor = data.colour

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

function loadMockData() {
	data.slice(0, 6).forEach((habit) => {
		const habitEl = createHabitElement(habit)
		habitsContainer.appendChild(habitEl)
	})
}

loadMockData()
loadHabits()
