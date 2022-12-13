const warning = document.getElementById("error-warning")

document.getElementById("login-form").addEventListener("submit", async (e) => {
	e.preventDefault()

	const form = new FormData(e.target)

	const options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: form.get("username"),
			password: form.get("password"),
		}),
	}
	const response = await fetch("http://localhost:3000/users/login", options)

	if (response.status == 200) {
		// Read the data from the response
		const data = await response.json()
		console.log(data)

		// Stash the token
		localStorage.setItem("session", data.session)

		// Send the user to index.html
		window.location.assign("index.html")
	} else {
		warning.style.display = "block"
	}
	console.log(options)
})
