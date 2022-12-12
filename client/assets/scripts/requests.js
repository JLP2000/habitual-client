async function getAllHabits() {
	return new Promise(async (res, rej) => {
		const response = await fetch("http://localhost:3000/habits", {
			// headers: {
			//     Authorization: localStorage.getItem("session"),
			// },
		})

		const habits = await response.json()

		if (response.status !== 200) {
			rej(response)
		} else {
			res(habits)
		}
	})
}

async function getHabitById(id) {}

async function postNewHabit(e) {
	e.preventDefault()
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
		}
		const response = await fetch(`http://localhost:3000/habits`, options)
		const { id, err } = await response.json()
	} catch (err) {
		console.warn(err)
	}
}
