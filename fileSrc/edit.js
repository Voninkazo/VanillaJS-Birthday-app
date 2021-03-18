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
                const popup = document.createElement('div');
                popup.classList.add('popup');

                // popup edit= form
                const html = `
                <div class="content">
                <form>
                    <h3 class="reminder-par">${person.birthday ? `Edit ${person.firstName + ' ' + person.lastName}` : 'Add somebody new 🤗'}</h3>
                    <fieldset>
                        <label for="lastName">Last Name:</label>
                        <input type="text" name="lastName" id="lastname" value="${person.lastName ? `${person.lastName}` : ''}" required>
                        <label for="firstName">First Name:</label>
                        <input type="text" name="firstName" id="firstname" value="${
                                person.firstName ? person.firstName : ''
                        }" required>
                        <label for="birthday">Birthday:</label>
                        <input type="date" name="birthday" id="birthday" value="${
                                person.birthday ? new Date(person.birthday).toISOString().substring(0, 10) : ''
                        }" max=${new Date().toISOString().substring(0, 10)} required>
                        
                        <label for="image">Image:</label>
                        <input type="url" name="image" id="img" value="${person.picture ? `${person.picture}` : ''}" alt="photo" required>
                        <div class="btn_container">
                            <button type="submit" class="submit">Submit</button>
                        </div>
                    </fieldset> 
                </form>
                </div>
        `;

        popup.insertAdjacentHTML('afterbegin', html);

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button'; // so it doesn't submit
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel');
        const content = popup.querySelector('.btn_container');
        console.log(content)
        content.insertAdjacentElement('beforeend',cancelButton);
        cancelButton.addEventListener('click', () => {
            resolve(null);
            destroyPopup(popup);
        }, { once: true })
        const form = popup.querySelector('form')
        form.addEventListener('submit', (e) => {
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