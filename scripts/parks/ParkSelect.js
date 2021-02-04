import { getParks, useParks } from './ParkProvider.js'

const eventHub = document.querySelector('.mainContainer')
const contentTarget = document.querySelector('.mainContainer')

export const parkSelect = () => {
    getParks()
    .then(() => {
        const parks = useParks()
        render(parks)
    })
}

const render = (parksArray) => {
    contentTarget.innerHTML = `
    <label for="parkSelect">National Parks</label>
    <select name="parkSelect" class="dropDown" id="parkSelect">
    <option value="0">Select a Park...</option>
    ${parksArray.map(parkObject => `<option value="${parkObject.id}">${parkObject.fullName}</option>`)} 
    </select>
    <div class="parkPreview"></div>`
}

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "parkSelect") {
        const parkSelected = new CustomEvent("parkSelected", {
            detail: { 
                chosenPark: changeEvent.target.value
            }
        })   
        eventHub.dispatchEvent(parkSelected)
    }
})

eventHub.addEventListener("parkSelected", parkPreviewEvent => {
    const previewTarget = document.querySelector('.parkPreview')
    if (parkPreviewEvent.detail !== "0") {
        previewTarget.innerHTML = `${parkPreviewEvent.detail.chosenPark}`
    }
})
