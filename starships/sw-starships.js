import { starships } from '../data/starships.js'

const nav = document.querySelector('nav')
const navList = document.querySelector('.navList')
const shipViewer = document.querySelector('.shipViewer')

function populateNav() {
    starships.forEach((starship) => {
        let anchor = document.createElement('a')
        anchor.textContent = starship.name
        anchor.href = '#'

        let listItem = document.createElement('li')
        listItem.appendChild(anchor)
        navList.appendChild(listItem)
    })
}

populateNav()