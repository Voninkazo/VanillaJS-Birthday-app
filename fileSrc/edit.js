import { displayPeople } from './displayList.js';
import { myPeople } from '../script.js';
import { destroyPopup } from './utils.js';
import { parent, container } from './variables.js';

// edit person data
export async function editPeople(e) {
    const iconEdit = e.target.closest('button.edit');
    if (iconEdit) {
        const tableRow = e.target.closest('tr');
        const idToEdit = tableRow.dataset.id;
        editPeoplePopup(idToEdit);
    }
}



// show popup and edit data
async function editPeoplePopup(idToEdit) {
    return new Promise(async function(resolve) {
        const popup = document.createElement('div');
        let personToEdit = myPeople.find(peop => peop.id == idToEdit);
        // popup edit= form
        const html = `
        <div class="popup2">
            <form class="form">
                <p>Editing ${personToEdit.lastName} ${personToEdit.firstName}</p>
                <ul>
                    <li>
                        <label for="lastName">Last Name:</label>
                        <input type="text" name="lastName" id="lastname" value="${personToEdit.lastName}">
                    </li>
                    <li>
                        <label for="firstName">First Name:</label>
                        <input type="text" name="firstName" id="firstname" value="${personToEdit.firstName}">
                    </li>
                    <li>
                        <label for="birthday">Birthday:</label>
                        <input type="date" name="birthday" id="birthday" value="${personToEdit.birthday ? new Date(personToEdit.birthday).toISOString().substring(0, 10) : ''
                    }">
                    </li>
                    <li>
                        <label for="image">Image:</label>
                        <input type="url" name="image" id="img" value="${personToEdit.picture}" alt="photo">
                    </li>
                </ul>
                <div>
                    <button type="submit">Submit</button>
                    <button class="cancel">Cancel</button>
                </div>
            </form>
        </div>
        `;
        popup.innerHTML = html;
        parent.appendChild(popup);
        popup.classList.add('popup');
        popup.classList.add('open');
        const popupForm = popup.querySelector("form")
        popupForm.addEventListener('submit', e => {
            resolve();
            e.preventDefault();
            personToEdit.lastName = popupForm.lastName.value;
            personToEdit.firstName = popupForm.firstName.value;
            personToEdit.picture = popupForm.image.value;
            personToEdit.birthday = popupForm.birthday.value,
                displayPeople(myPeople);
            resolve(e.target.remove(myPeople));
            destroyPopup(popup);
            container.dispatchEvent(new CustomEvent('itemsUpdated'));

        }, { once: true });
        if (popup.cancel) {
            popup.cancel.addEventListener('click', function() {
                resolve(null);
                destroyPopup(popup);
            }, { once: true });
        }
    })
}