import { displayPeople } from './displayList';
import { updateLocalStorage } from './localStorage';
import { destroyPopup } from './utils';

import wait from 'waait';

// FUNCTION DELETE PERSON 
export const deletePerson = async(id, myPeople) => {
    const person = myPeople.find(person => person.id === id);
    const result = await deletePersonPopup(person);
    console.log(result, id)
    if (result) {
        myPeople = myPeople.filter(person => person.id !== result.id);
        displayPeople(myPeople);
        updateLocalStorage(myPeople);
    }
}

// POPUP DELETE PERSON AN EDIT PERSON

export const deletePersonPopup = person => {
    return new Promise(async resolve => {
        const popup = document.createElement('form');
        popup.classList.add('popup');
        const html =
            `    <fieldset class="fieldset_delete">
                    <h5>Delete <b>${person.firstName} ${person.lastName}</b> 🙈</h5>
                    <p>Are you sure you want to delete this person from the list?</p>
                    <button type="submit" class="delete">Bye 👋 🗑</button>
                </fieldset>
            `;
        popup.insertAdjacentHTML('afterbegin', html);
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button'; // so it doesn't submit
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel');
        popup.lastElementChild.appendChild(cancelButton);
        cancelButton.addEventListener('click', () => {
            resolve(null);
            destroyPopup(popup);
        }, { once: true });

        popup.addEventListener('submit', (e) => {
            e.preventDefault();
            resolve(person);
            destroyPopup(popup);
        }, { once: true })

        document.body.appendChild(popup);
        await wait(10);
        popup.classList.add('open');
    })
}