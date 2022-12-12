let sideBar = document.querySelector(".side-bar")
let main = document.querySelector(".main")
sideBar.onclick = () => {
	sideBar.classList.toggle("collapse")
	main.classList.toggle("collapse")
}
