let sideBar = document.querySelector(".side-bar")
let content = document.querySelector(".content")
// sideBar.onclick = () => {
// 	sideBar.classList.toggle("collapse")
// 	content.classList.toggle("collapse")
// }

const logoutBtn = document.getElementsByClassName("account-item")[0]

logoutBtn.addEventListener("click", async (e) => {
	e.preventDefault()
	const options = {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			sessionToken: localStorage.getItem("session"),
		}),
	}
	const response = await fetch("http://localhost:3000/users/logout", options)

	localStorage.removeItem("session")
	window.location.assign("login.html")
})
