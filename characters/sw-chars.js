import { people } from '../data/people.js'

const main = document.querySelector('main')

people.forEach(person => {
    let figure = document.createElement('figure')
    let figImage = document.createElement('img')
    let figCaption = document.createElement('figcaption')

    let charNum = getLastNumber(person.url)

    figImage.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    figCaption.textContent = person.name

    figure.appendChild(figImage)
    figure.appendChild(figCaption)
    main.appendChild(figure)
})

// 'https://swapi.co/api/people/10/'

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
  }
