import { getEateries, useEateries } from "./EateryProvider.js"
import { Eatery } from './Eatery.js'


const eventHub = document.querySelector('.mainContainer')
const contentTarget = document.querySelector('.eateryPreview')

// export const EateryPreview = () => {
//     getEateries()
//       .then(() => {
//         const eatery = useEateries()
//         renderPreview(eatery)
        
//       })
// }
       
const renderPreview = eateryObj => {
  let eateryHTML = ""
  // for (const eateryName of eateryObj.businessName) {
  //         eateryHTML += `${eateryObj.businessName}`
          
  //       }
        contentTarget.innerHTML = `
          <h3>Eatery</h3>
          <p>${eateryObj.businessName}</p>`
          
}
  

eventHub.addEventListener("eateryChosen", event => {
    // const contentTarget = document.querySelector('.eateryPreview')
    if (event.detail.eateryThatWasChosen !== "0") {
        const eateries = useEateries()
        const eateryId = event.detail.eateryThatWasChosen
        const selectedEatery = eateries.find((eateryObj) => eateryObj.id === eateryId)

       renderPreview(selectedEatery)
    }
})