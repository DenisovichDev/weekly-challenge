document.addEventListener("contextmenu", (event) => event.preventDefault())

const icons = document.querySelectorAll(".icon")

icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        window.open("https://editor.p5js.org/Shynif/full/F_tJRg7NH")
    })
})
