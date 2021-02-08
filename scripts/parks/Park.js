export const parkHTML = (park, targetHTML) => {
    
    // iterate of array of park topics and generate html to append to dom
    let parkTopicsHTMLString = ''
    if (park.topics.length === 0) {
        parkTopicsHTMLString = "No Topics Listed"
    } else {
        for (const topic of park.topics) {
            parkTopicsHTMLString += `
            <li class="park__topic">${topic.name}</li>`
        }
    }
    
    // check for park fee and generate HTML if there is a cost
    let parkEntranceFeeHTMLString = ''
    if (park.entranceFees.length === 0) {
        parkEntranceFeeHTMLString = "0.00"
    } else {
        parkEntranceFeeHTMLString = `${park.entranceFees[0].cost}`
    }

    // add html to dom for the preview card
    targetHTML.innerHTML = `
    <h3>Park Selected:</h3>
    <div class="parkPreview__name">${park.fullName}</div>
    <div class="parkWeather"></div>
    
    <div id="parkDetail" class="hidden">
        <div class="park__info">
            <div class="park__description"><b>About: </b>${park.description}</div>
            <div class="park__state"><b>State: </b>${park.states}</div>
            <div class="park__fee"><b>Entrance Fee: </b>$${parkEntranceFeeHTMLString}</div>
            <div class="topicsTitle"><b>Park Topics: </b></div>
            <div class="park__topicsContainer">
                <ul class="park__topicsList">${parkTopicsHTMLString}</ul>
            </div>
        </div>
        <div class="park__imageContainer">
            <img src="${park.images[0].url}" alt="${park.images[0].altText}" class="park__image">
            <div class="park__imageDescription"><b>Photo description: </b>${park.images[0].caption}</div>
        </div>

        
    </div>
    <button id="parkDetail__Button">Park Details</button>
    `
}