import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const membersDiv = document.querySelector('.membersDiv')

const repsButton = document.querySelector('#repsButton')
const senatorsButton = document.querySelector('#senatorsButton')

repsButton.addEventListener('click', () => populateMembersDiv(representatives))
senatorsButton.addEventListener('click', () => populateMembersDiv(senators))

function populateMembersDiv(memberArray) {
    removeChildren(membersDiv)
    memberArray.forEach(member => {
        const figure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`
        figCaption.textContent = member.first_name + member.middle_name + member.last_name

        figure.appendChild(figImg)
        figure.appendChild(figCaption)
        membersDiv.appendChild(figure)
    })
}