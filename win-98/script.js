document.addEventListener("contextmenu", (event) => event.preventDefault())

const icons = document.querySelectorAll(".raphroll")
const recycleBin = document.querySelector("#rb")
const help = document.querySelector(".help")
const helpPage = document.querySelector(".help-page")
const start = document.querySelector(".start")
const popup = document.querySelector(".popup")

icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        window.open("https://editor.p5js.org/Shynif/full/F_tJRg7NH")
    })
})

recycleBin.addEventListener("click", (e) => {
    recycleBin.src = "assets/rbf.png"
})

help.addEventListener("click", (e) => {
    helpPage.classList.toggle("active")
})

start.addEventListener("click", (e) => {
    popup.classList.toggle("active")
})
