import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const allCongressMembers = [...senators, ...representatives] // modern way to combine arrays

const membersDiv = document.querySelector('.membersDiv')

const seniorMemberSpan = document.querySelector('#seniorMember')
const vacationerSpan = document.querySelector('#vacationer')
const loyalMemberList = document.querySelector('#loyalMembers')

const partyReset = document.querySelector('#partyReset')
partyReset.addEventListener('click', () => {
  const partyButtons = document.querySelectorAll('input[name="party"]')
  partyButtons.forEach((button) => (button.checked = false))
  configurator()
})
const genderReset = document.querySelector('#genderReset')
genderReset.addEventListener('click', () => {
  const genderButtons = document.querySelectorAll('input[name="gender"]')
  genderButtons.forEach((button) => (button.checked = false))
  configurator()
})

const mostSeniorMember = simplifiedMembers(allCongressMembers).reduce(
  (acc, member) => {
    return acc.seniority > member.seniority ? acc : member
  },
)

const biggestVacationer = simplifiedMembers(allCongressMembers).reduce(
  (acc, member) => {
    return acc.missedVotesPct > member.missedVotesPct ? acc : member
  },
)

const mostLoyalMembers = simplifiedMembers(allCongressMembers).filter(
  (member) => {
    return member.loyaltyPct === 100
  },
)

mostLoyalMembers.forEach((member) => {
  let listItem = document.createElement('li')
  listItem.textContent = member.name
  loyalMemberList.appendChild(listItem)
})

seniorMemberSpan.textContent = mostSeniorMember.name
const seniorMemberImg = document.querySelector('#seniorMemberImg')
seniorMemberImg.src = mostSeniorMember.imgURL

vacationerSpan.textContent = `${biggestVacationer.name} ${biggestVacationer.missedVotesPct}`
const vacationerImg = document.querySelector('#vacationerImg')
vacationerImg.src = biggestVacationer.imgURL

/* Section for configuring sorting and filters */
const allInputs = document.querySelectorAll('input')
allInputs.forEach((input) =>
  input.addEventListener('change', () => configurator()),
)

function configurator() {
  let configuredArray = []
  const checkedInputs = document.querySelectorAll('input:checked')
  const checkedIds = []
  checkedInputs.forEach((item) => checkedIds.push(item.id))
  //console.log(checkedIds)

  if (checkedIds.includes('senate'))
    configuredArray = [...configuredArray, ...simplifiedMembers(senators)]
  if (checkedIds.includes('house'))
    configuredArray = [
      ...configuredArray,
      ...simplifiedMembers(representatives),
    ]

  if (checkedIds.includes('women'))
    configuredArray = [
      ...configuredArray.filter((member) => member.gender === 'F'),
    ]
  if (checkedIds.includes('men'))
    configuredArray = [
      ...configuredArray.filter((member) => member.gender === 'M'),
    ]

  if (checkedIds.includes('dems'))
    configuredArray = [
      ...configuredArray.filter((member) => member.party === 'D'),
    ]
  if (checkedIds.includes('repubs'))
    configuredArray = [
      ...configuredArray.filter((member) => member.party === 'R'),
    ]

  //console.log(configuredArray)
  populateMembersDiv(configuredArray)
}

/* End configuration section */

function simplifiedMembers(memberArray) {
  return memberArray.map((member) => {
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
      loyaltyPct: member.votes_with_party_pct,
      state: member.state,
      rank: member.state_rank,
    }
  })
}

const simplifiedSenators = simplifiedMembers(senators)
const simplifiedReps = simplifiedMembers(representatives)

function populateMembersDiv(memberArray) {
  removeChildren(membersDiv)
  memberArray.forEach((member) => {
    const scene = document.createElement('div')
    scene.className = 'scene'
    const card = document.createElement('div')
    card.className = 'card'
    // if (member.party === 'R') card.className = 'card republican'
    // if (member.party === 'D') card.className = 'card democrat'
    card.addEventListener('click', () => {
      console.log('You clicked?')
      card.classList.toggle('is-flipped')
    })

    const cardFront = document.createElement('div')
    cardFront.className = 'card__face card__face--front'

    const figure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')
    if (member.party === 'R') figCaption.className = 'republican'
    if (member.party === 'D') figCaption.className = 'democrat'

    figImg.src = member.imgURL
    figImg.addEventListener(
      'error',
      () => (figImg.src = '../images/emperor-palpatine.jpeg'),
    )

    figCaption.textContent = member.name

    figure.appendChild(figImg)
    figure.appendChild(figCaption)
    cardFront.appendChild(figure)
    card.appendChild(cardFront)
    card.appendChild(populateCardBack(member))
    scene.appendChild(card)
    membersDiv.appendChild(scene)
  })
}

function populateCardBack(member) {
  const cardBack = document.createElement('div')
  cardBack.className = 'card__face card__face--back'
  const details = document.createElement('h4')
  details.className = 'details'
  details.textContent = `Date of Birth: ${member.dateOfBirth}`

  const membersState = document.createElement('h3')
  membersState.textContent = `State: ${member.state}`
  const stateIcon = document.createElement('img')
  stateIcon.src = `../images/SVG/${member.state}.svg`
  
  cardBack.appendChild(details)
  cardBack.appendChild(membersState)
  if (member.rank) {
    const memberRank = document.createElement('h3')
    memberRank.textContent = `Rank: ${member.rank[0].toUpperCase()}${member.rank.slice(1)}`
    cardBack.appendChild(memberRank)
  }
  cardBack.appendChild(stateIcon)
  return cardBack
}

populateMembersDiv(simplifiedMembers(allCongressMembers))
