const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const brushwidth = document.querySelector('#brush-width')
const brushcolor = document.querySelector('#color-picker')
const brush = document.querySelector('.brush')
const eraser = document.querySelector('.eraser')
const clearbtn = document.querySelector('#clear')
const savebtn = document.querySelector('#save')

let isdrawing = false
let currenwidth = 5
let currencolor = brushcolor.value

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
})

function startdraw() {
    isdrawing = true
    ctx.beginPath()
    ctx.lineWidth = currenwidth
}

function drawing(e) {
    if (!isdrawing) return
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.strokeStyle = currencolor
    ctx.stroke()
}

function enddraw() {
    isdrawing = false
}

canvas.addEventListener('mousedown', startdraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', enddraw)

brushwidth.addEventListener('change', () => {
    currenwidth = brushwidth.value
})

brushcolor.addEventListener('change', () => {
    currencolor = brushcolor.value
})

eraser.addEventListener('click', () => {
    eraser.classList.add('active')
    brush.classList.remove('active')
    currencolor = 'white'
})

brush.addEventListener('click', () => {
    brush.classList.add('active')
    eraser.classList.remove('active')
    currencolor = brushcolor.value
})

clearbtn.addEventListener('click', () => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
})

savebtn.addEventListener('click', () => {
    let link = document.createElement('a')
    link.download = `${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()
})
