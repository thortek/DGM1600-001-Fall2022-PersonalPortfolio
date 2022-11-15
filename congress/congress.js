import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const membersDiv = document.querySelector('.membersDiv')

const repsButton = document.querySelector('#repsButton')
const senatorsButton = document.querySelector('#senatorsButton')

repsButton.addEventListener('click', () => populateMembersDiv(simplifiedReps))
senatorsButton.addEventListener('click', () => populateMembersDiv(simplifiedSenators))

const senateRepubsButton = document.querySelector('#repubs')
senateRepubsButton.addEventListener('click', () => {
    const simplifiedRepublicanSenators = simplifiedSenators.filter(member => member.party === 'R')
    populateMembersDiv(simplifiedRepublicanSenators)
})

function simplifiedMembers(memberArray) {
    return memberArray.map(member => {
        const middleName = member.middle_name ? ` ${member.middle_name} ` : ` ` // ternary operator FTW!
        return {
            id: member.id,
            name: `${member.first_name}${middleName}${member.last_name}`,
            dateOfBirth: member.date_of_birth,
            gender: member.gender,
            party: member.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`,
            seniority: member.seniority,
            missedVotesPct: member.missed_votes_pct,
            loyaltyPct: member.votes_with_party_pct
        }
    })
}

const simplifiedSenators = simplifiedMembers(senators)
const simplifiedReps = simplifiedMembers(representatives)

function populateMembersDiv(memberArray) {
    removeChildren(membersDiv)
    memberArray.forEach(member => {
        const figure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = member.imgURL
        figImg.addEventListener('error', () => figImg.src = '../images/emperor-palpatine.jpeg')

        figCaption.textContent = member.name

        figure.appendChild(figImg)
        figure.appendChild(figCaption)
        membersDiv.appendChild(figure)
    })
}