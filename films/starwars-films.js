import { films } from '../data/films.js'

console.log('This is my first JavaScript console message!')

let filmOne = films[0]

let filmList = document.querySelector('#filmList') // a reference to our main element

for (let i = 0; i < films.length; i++) {
    let newParagraph = document.createElement('p')
    newParagraph.textContent = films[i].title
    filmList.appendChild(newParagraph)
  }