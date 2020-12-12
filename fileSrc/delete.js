import { myPeople } from '../script.js';
import { parent, container } from './variables.js';
import { displayPeople } from './displayList.js';
import { destroyPopup } from './utils.js';


// delete a person
export const deletePerson = e => {
    const iconDelete = e.target.closest('button.delete');
    if (iconDelete) {
        const tableRow = e.target.closest('tr');
        const idToDelete = tableRow.dataset.id;
        deletePersonPopup(idToDelete);
    }
    parent.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// show delete popup and delete a specific person
const deletePersonPopup = idToDelete => {
    return new Promise(async function(resolve) {
        const popup = document.createElement('div');
        let personToDelete = myPeople.find(person => person.id == idToDelete);
        popup.classList.add('popup');
        // popup delete
        const html = `
                    <div class="delete-popup-content">
                        <p class="reminder-par">Do you really want to delete ${personToDelete.lastName} ${personToDelete.firstName}?</p>
                        <ul>
                            <li>
                                <button class="yes">Yes</button>
                            </li>
                            <li>
                                <button class="cancel">Cancel</button>
                            </li>
                        </ul>
                    </div>
        `;
        popup.insertAdjacentHTML('afterbegin', html);
        popup.addEventListener('click', e => {
            if (e.target.matches('.yes')) {
                const people = myPeople.filter(person => person.id != idToDelete);
                myPeople = people
                displayPeople(myPeople);
                destroyPopup(popup);
            }
            if (e.target.matches('.cancel')) {
                destroyPopup(popup);
            }
            container.dispatchEvent(new CustomEvent('itemsUpdated'));
        });
        // resolve promise
        resolve();
        parent.appendChild(popup);
        container.dispatchEvent(new CustomEvent('itemsUpdated'));
    });
}