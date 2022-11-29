import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const allCongressMembers = [...senators, ...representatives] // modern way to combine arrays

const membersDiv = document.querySelector('.membersDiv')

const houseButton = document.querySelector('#house')
const senateButton = document.querySelector('#senate')

const seniorMemberSpan = document.querySelector('#seniorMember')
const vacationerSpan = document.querySelector('#vacationer')
const loyalMemberList = document.querySelector('#loyalMembers')

const mostSeniorMember = simplifiedMembers(allCongressMembers).reduce((acc, member) => {
    return acc.seniority > member.seniority ? acc : member
})

const biggestVacationer = simplifiedMembers(allCongressMembers).reduce((acc, member) => {
    return acc.missedVotesPct > member.missedVotesPct ? acc : member
})

const mostLoyalMembers = simplifiedMembers(allCongressMembers).filter(member => {
    return member.loyaltyPct === 100
})

mostLoyalMembers.forEach(member => {
    let listItem = document.createElement('li')
    listItem.textContent = member.name
    loyalMemberList.appendChild(listItem)
})

seniorMemberSpan.textContent = mostSeniorMember.name
vacationerSpan.textContent = `${biggestVacationer.name} ${biggestVacationer.missedVotesPct}`

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
            seniority: +member.seniority,
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