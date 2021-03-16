import { displayPeople } from './displayList';
import { destroyPopup } from './utils';
import { updateLocalStorage } from './localStorage';


import wait from 'waait';

// edit person data
export async function editPeople(id, myPeople) {
    const person = myPeople.find(person => person.id === id);
    const result = await editPeoplePopup(person);
    if (result) {
        displayPeople(myPeople);
        updateLocalStorage(myPeople);
    }
}


// show popup and edit data
export async function editPeoplePopup(person) {
    return new Promise(async resolve => {
                const popup = document.createElement('form');
                popup.classList.add('popup');

                // let personToEdit = myPeople.find(peop => peop.id == idToEdit);
                // popup edit= form
                const html = `
        <div class="popup2">
            <form class="form">
                <p class="reminder-par">${person.birthday ? `${person.firstName + ' ' + person.lastName}` : 'Add somebody new 🤗'}</p>
                <ul>
                    <li>
                        <label for="lastName">Last Name:</label>
                        <input type="text" name="lastName" id="lastname" value="${person.lastName ? `${person.lastName}` : ''}">
                    </li>
                    <li>
                        <label for="firstName">First Name:</label>
                        <input type="text" name="firstName" id="firstname" value="${
                            person.firstName ? person.firstName : ''
                        }">
                    </li>
                    <li>
                        <label for="birthday">Birthday:</label>
                        <input type="date" name="birthday" id="birthday" value="${
                            person.birthday ? new Date(person.birthday).toISOString().substring(0, 10) : ''
                    }">
                    </li>
                    <li>
                        <label for="image">Image:</label>
                        <input type="url" name="image" id="img" value="${person.picture ? `${person.picture}` : ''}" alt="photo">
                    </li>
                </ul>
                <div class="popup-btn-container">
                    <button type="submit" class="submit">Submit</button>
                </div>
            </form>
        </div>
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
        }, { once: true })

        popup.addEventListener('submit', (e) => {
            e.preventDefault();
            // popup.input.value;
            person.firstName = e.target.firstName.value;
            person.lastName = e.target.lastName.value;
            // use this date conversion to get a timestamp back (just like the birthday inside people.json)
            person.birthday = new Date(e.target.birthday.value).getTime();
            resolve(person);
            destroyPopup(popup);
        }, { once: true });
        document.body.appendChild(popup);
        await wait(10);
        popup.classList.add('open');

    })
}