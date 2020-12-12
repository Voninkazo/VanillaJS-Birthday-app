import { myPeople } from '../script.js';
import { displayPeople } from './displayList.js';
import { destroyPopup } from './utils.js';
import { parent, container } from './variables.js';


///////////////////////// ADD A NEW PERSON /////////////////////////

export function addingPeople() {
    return new Promise(async function(resolve) {
        const popup = document.createElement("div")
        const html = `
                <form class="form">
                    <ul>
                        <li>
                            <label>Last name</label>
                            <input type="text" name="lastName" required>
                        </li>
                        <li>
                            <label>First name</label>
                            <input type="text" name="firstname" required>
                        </li>
                        <li>
                            <label>Birthday</label>
                            <input type="date" name="birthday" required>
                        </li>
                        <li>
                            <label>Picture</label>
                            <input type="url" name="image" required>
                        </li>
                    </ul>
                    <div class="popup-btn-container">
                        <button type="submit" class="submit">Save</button>
                        <button type="button" name="cancel" class="cancel">Cancel</button>
                    </div>
                </form>
        `;
        popup.innerHTML = html;
        popup.classList.add('popup');
        parent.appendChild(popup);
        // grab inputs when submit
        const myForm = popup.querySelector('form');
        popup.appendChild(myForm)
        myForm.addEventListener('submit', e => {
            e.preventDefault();
            let el = e.currentTarget.closest('.form');
            const newPerson = {
                id: Date.now(),
                lastName: el.lastName.value,
                firstName: el.firstname.value,
                birthday: el.birthday.value,
                picture: el.image.value,
            }
            resolve();
            myPeople.push(newPerson);
            displayPeople(myPeople);
            destroyPopup(popup);
            container.dispatchEvent(new CustomEvent('itemsUpdated'));
        });
        // cancel
        if (myForm.cancel) {
            myForm.cancel.addEventListener('click', function() {
                destroyPopup(popup);
            }, { once: true });
        }

        resolve();
    });
};