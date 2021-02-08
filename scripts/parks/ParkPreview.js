import { useParks } from './ParkProvider.js'
import { WeatherList } from '../weather/WeatherList.js'

const eventHub = document.querySelector('.mainContainer')

//listens for a park selection, then finds the correct park 
// and runs additional functions to render park info in preview section
eventHub.addEventListener("parkSelected", parkPreviewEvent => {
    const previewTarget = document.querySelector('.parkPreview')
    if (parkPreviewEvent.detail.chosenPark !== "0") {
        const parksArray = useParks()
        const parkID = parkPreviewEvent.detail.chosenParkId
        const selectedPark = parksArray.find(parkObject => {
            return parkObject.id === parkID
        })
        previewPark(selectedPark, previewTarget)
    }
})

// previewPark generates html for the preview card
const previewPark = (park, targetHTML) => {
    let parkActivitiesHTMLString = ''

    // iterate of array of park activities and generate html to append to dom
    if (park.activities.length === 0) {
        parkActivitiesHTMLString = "No Activites Available"
    } else {
        for (const activity of park.activities) {
            parkActivitiesHTMLString += `
            <li class="park__activity">${activity.name}</li>`
        }
    }

    // add html to dom for the preview card
    targetHTML.innerHTML = `
    <h3>Park Selected:</h3>
    <div class="parkPreview__name">${park.fullName}</div>
    <div class="parkWeather"></div>
    
    <div id="parkDetail" class="hidden">
        <div class="park__info">
            <div class="park__state"><b>State: </b>${park.states}</div>
            <div class="park__fee"><b>Entrance Fee: </b>$${park.entranceFees[0].cost}</div>
            <div class="activityTitle"><b>Activities: </b></div>
            <div class="park__activitiesContainer">
                <ul class="park_activitiesList">${parkActivitiesHTMLString}</ul>
            </div>
        </div>
        <div class="park__imageContainer">
            <img src="${park.images[0].url}" alt="${park.images[0].altText}" class="park__image">
            <div class="park__imageDescription"><b>Photo description: </b>${park.images[0].caption}</div>
        </div>

        
    </div>
    <button id="parkDetail__Button">Park Details</button>
    `

    WeatherList(park)
}

// event listner for displaying park details
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "parkDetail__Button") {
        const buttonText = clickEvent.target
        const parkDetailSection = document.querySelector("#parkDetail")
        parkDetailSection.classList.toggle("parkDetail")

        if (buttonText.innerHTML === "Park Details") {
            buttonText.innerHTML = "Hide Details"
        } else {
            buttonText.innerHTML = "Park Details"
        }
    }
})