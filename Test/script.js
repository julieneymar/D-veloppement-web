let p = document.querySelector(".para")
window.setInterval(function(){
    p.classList.toggle('blu')
},1000)


let ki = document.createElement('div')
ki.className = 'classe'
ki.textContent = 'salut les terrient '
document.querySelector('body').append(ki)
ki.style.fontSize  = "75px" 
ki.style.backgroundColor = "red"
ki.style.color = "blue"
ki.style.animation = cli
console.log(ki)