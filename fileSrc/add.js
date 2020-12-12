import { myPeople } from '../script.js';
import { displayPeople } from './displayList.js';
import { destroyPopup } from './utils.js';
import { parent, container } from './variables.js';


///////////////////////// ADD A NEW PERSON /////////////////////////

export function addingPeople() {
    return new Promise(async function(resolve) {
        const myForm = document.createElement('form');
        myForm.classList.add('adding');
        const html = `
                <div>
                    <ul class="form">
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
                    <button type="submit">Save</button>
                    <button type="button" name="cancel" class="cancel">Cancel</button>
                </div>
        `;
        myForm.innerHTML = html;
        myForm.classList.add('popup');
        // grab inputs when submit
        myForm.addEventListener('submit', e => {
            e.preventDefault();
            let el = e.currentTarget.closest('form.adding');
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
            destroyPopup(myForm);
            container.dispatchEvent(new CustomEvent('itemsUpdated'));
        });
        // cancel
        if (myForm.cancel) {
            myForm.cancel.addEventListener('click', function() {
                destroyPopup(myForm);
            }, { once: true });
        }

        resolve();
        parent.appendChild(myForm);
        myForm.classList.add('open');
    });
};