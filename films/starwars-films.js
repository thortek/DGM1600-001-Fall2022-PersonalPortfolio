import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList') // a reference to our main element

for (let i = 0; i < films.length; i++) {
  // First, create a <figure> element with it's 2 children
  let figure = document.createElement('figure')
  let figImage = document.createElement('img')
  let figCaption = document.createElement('figcaption')

  let filmNum = getLastNumber(films[i].url)

  figImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`
  // Set the text of the figcaption to the movie's title
  figCaption.textContent = films[i].title
  // Append the img and figcaption children to their parent before making the <figure> element appear in the DOM
  figure.appendChild(figImage)
  figure.appendChild(figCaption)
  filmList.appendChild(figure)
}

// I've defined this function that takes one parameter
function getLastNumber(url) {
  return url.slice(url.length - 2, url.length - 1)
}
