const warning = document.getElementById("error-warning")
const link = "http://localhost:3000"

document
	.getElementById("register-form")
	.addEventListener("submit", async (e) => {
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

		const response = await fetch(`${link}/users/register`, options)
		if (response.status == 201) {
			// Send the user to login.html
			window.location.assign("login.html")
		} else {
			warning.style.display = "block"
			warning.style.color = "red"
		}
	})
