import { displayPeople } from './displayList'
import { updateLocalStorage } from './localStorage'
import { destroyPopup } from './utils'
import { showScroll } from './utils'
import { iconClose } from './svgs'

import wait from 'waait'

// FUNCTION DELETE PERSON
export const deletePerson = async (id, myPeople) => {
  const person = myPeople.find((person) => person.id === id)
  const result = await deletePersonPopup(person)

  if (result) {
    myPeople = myPeople.filter((person) => person.id !== result.id)
    displayPeople(myPeople)
    updateLocalStorage(myPeople)
  }
}

// POPUP DELETE PERSON AN EDIT PERSON

export const deletePersonPopup = (person) => {
  return new Promise(async (resolve) => {
    const popup = document.createElement('form')
    popup.classList.add('popup')
    const html = `
            <fieldset class="fieldset_delete">
                <div class="close_icon__container">
                    <button type="button" class="cancel close"> 
                        ${iconClose}
                    </button>
                </div>    
                <h5>
                    Delete <b>${person && person.firstName} ${
      person && person.lastName
    }</b> 🙈    </h5>
                    <p>Are you sure you want to delete this person from the list?</p>
                    <div class="button_container">
                        <button type="submit" class="remove" data-id=${
                          person.id
                        }>Delete</button>
                        <button type="button" class="cancel">Cancel</button> 
                    </div>
             </fieldset>
            `
    popup.insertAdjacentHTML('afterbegin', html)
    const cancelButton = popup.querySelectorAll('.cancel')
    cancelButton.forEach((button) =>
      button.addEventListener(
        'click',
        () => {
          resolve(null)
          destroyPopup(popup)
          showScroll()
        },
        { once: true }
      )
    )

    popup.addEventListener(
      'submit',
      (e) => {
        e.preventDefault()
        resolve(person)
        destroyPopup(popup)
        showScroll()
      },
      { once: true }
    )

    document.body.appendChild(popup)
    await wait(10)
    popup.classList.add('open')
  })
}
