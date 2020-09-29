console.log('it works');
// main elements
const people = './people.json';
const container = document.querySelector('tbody');
const parent = document.querySelector('body');
const form = document.querySelector('form');
const addBtn = document.querySelector('.add');
const filterInputName = document.querySelector('#filter-name');
const buttonFilter = document.querySelector('#reset'); // btn reset
const filterForm = document.querySelector('.filter-form');
let myPeople = []; // mama array

const filterPeople = (e) => {
    displayPeople(e, filterInputName.value);
}
const resetFilter = e => {
    displayPeople();
    filterInputName.reset();
}

///////////////////// FETCHING FUNCTION ///////////////////////////
// fetch data
async function fetchPeople() {
    const response = await fetch(`${people}`);
    const data = await response.json();
    myPeople = [...data];
    storeFromLocalStorage(myPeople);
    displayPeople(myPeople);
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
    return data;
}

//////////////////////  LOCAL STORGE FUNCTIONS /////////////////////////////

// mirror from LS
function mirrorLocalStorage() {
    console.info('Saving items to LS');
    localStorage.setItem('myPeople', JSON.stringify(myPeople));
};

// store from LS
async function storeFromLocalStorage() {
    // if there is data in the LS
    const listItem = JSON.parse(localStorage.getItem('myPeople'));
    if (listItem) {
        myPeople = listItem;
    }

    // if there is no data in the local, then fetch again
    if (!listItem) {
        const response = await fetch(`${people}`);
        const data = await response.json();
        myPeople = [...data];
        displayPeople(myPeople);
    }
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
}

/////////////////////// DISPLAY PEOPLE LIST//////////////////////////////////
// display people list
async function displayPeople(e, filterByName) {
    // sort by birthday
    let sortedPeople = myPeople.sort((a, b) => a.birthday - b.birthday);
    if (filterByName) {
        sortedPeople = sortedPeople.filter(person => {
            let lowerCaseTitle = person.lastName.toLowerCase();
            // jerusalem
            let lowerCaseFilter = filterByName.toLowerCase();
            // jeru
            if (lowerCaseTitle.includes(lowerCaseFilter)) {
                return true;
            } else {
                return false;
            }
        });
    }
    const html = sortedPeople
        .map(people => {
            ///////////////DATE FUNCTION/////////////////////
            let age = new Date().getFullYear() - new Date(people.birthday).getFullYear();
            // dayOfbirth
            let dateOfBirth = new Date(people.birthday).getDate();
            let date;
            let month;
            // set the condition to set the right date symbols
            if (dateOfBirth > 3) {
                date = `${dateOfBirth}th`;
            }
            switch (dateOfBirth % 10) {
                case 1:
                    date = `${dateOfBirth}st`;
                    break;
                case 2:
                    date = `${dateOfBirth}nd`;
                    break;
                case 3:
                    date = `${dateOfBirth}rd`;
            };
            // find the current month of birth
            const monthOfBirth = new Date(people.birthday).getMonth();
            switch (monthOfBirth) {
                case 0:
                    month = "January";
                    break;
                case 1:
                    month = "February";
                    break;
                case 2:
                    month = "March";
                    break;
                case 3:
                    month = "April";
                    break;
                case 4:
                    month = "May";
                    break;
                case 5:
                    month = "June";
                    break;
                case 6:
                    month = "July";
                case 7:
                    month = "August";
                    break;
                case 8:
                    month = "September";
                    break;
                case 9:
                    month = "October";
                    break;
                case 10:
                    month = "November";
                    break;
                case 11:
                    month = "December";
            };
            // calculate one day
            const oneDay = 24 * 60 * 60 * 1000;
            // today = date now
            let today = new Date();
            let year;
            // if the current month is bigger than the month of birth, then add one more month
            if (today.getMonth() > monthOfBirth) {
                year = today.getFullYear() + 1;
                // if it's the same, then stay the same
            } else if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
                year = today.getFullYear();
            } else {
                // the same as the before
                year = today.getFullYear();
            }

            // calculate the day of birth
            let dayOfBirth = new Date(year, monthOfBirth, dateOfBirth);
            if (today.getMonth() === monthOfBirth && today.getDate() > dateOfBirth) {
                dayOfBirth.setFullYear(dayOfBirth.getFullYear() + 1);
                age = (new Date().getFullYear() + 1) - new Date(people.birthday).getFullYear();
            };

            // claulcation of the day difference from now(today)
            let dayDiffer = Math.round(Math.abs((new Date(dayOfBirth) - new Date(today)) / oneDay));
            return `
                <tr data-id="${people.id}">
                    <td class="image">
                        <img src="${people.picture}" alt="photo">
                    </td>
                    <td class="name">
                        ${people.lastName} ${people.firstName}<br>
                        <span>Turn ${age} on the ${date} of ${month} </span>
                    </td>
                    <td class="days-left">${dayDiffer} days</td>
                    <td>
                        <button class="edit" value="${people.id}">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                        </button>
                        <button class="delete" value="${people.id}">
                            <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </td>
                </tr>
            `
        }).join(' ');
    container.innerHTML = html;
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
}
displayPeople()
    // destroy popup
async function destroyPopup(popup) {
    popup.classList.remove('open');
    popup.remove();
    popup = null;
}

///////////////////// EDIT PERSON DATA /////////////////////////////

// edit person data
async function editPeople(e) {
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
        const popup = document.createElement('form');
        let personToEdit = myPeople.find(peop => peop.id == idToEdit);
        // popup edit= form
        const html = `
        <ul class="form">
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
                <input type="date" name="birthday" id="birthday" value="${personToEdit.birthday}">
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
        `;
        popup.innerHTML = html;
        parent.appendChild(popup);
        popup.classList.add('popup');
        popup.classList.add('open');
        popup.addEventListener('submit', e => {
            resolve();
            e.preventDefault();
            personToEdit.lastName = popup.lastName.value;
            personToEdit.firstName = popup.firstName.value;
            personToEdit.picture = popup.image.value;
            personToEdit.birthday = popup.birthday.value,
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
// listen for a click on the edit button
window.addEventListener('click', editPeople);

//////////////////// DELETE PERSONS ////////////////////////

// delete a person
const deletePerson = e => {
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
        let personToDelte = myPeople.find(person => person.id == idToDelete);
        popup.classList.add('popup');
        // popup delete
        const html = `
                    <div>
                        <p>Do you really want to delete ${personToDelte.lastName} ${personToDelte.firstName}?</p>
                        <ul class="buttonDelt">
                            <li>
                                <button class="yes">Yes</button>
                            </li>
                            <li>
                                <button class="cancel">Cancel</button>
                            </li>
                    </div>
        `;
        popup.insertAdjacentHTML('afterbegin', html);
        popup.addEventListener('click', e => {
            if (e.target.matches('.yes')) {
                const people = myPeople.filter(person => person.id != idToDelete);
                myPeople = people;
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
        popup.classList.add('open');
        container.dispatchEvent(new CustomEvent('itemsUpdated'));
    });
}

///////////////////////// ADD A NEW PERSON /////////////////////////

function addingPeople() {
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


buttonFilter.addEventListener('click', resetFilter);
filterInputName.addEventListener('keyup', filterPeople);
addBtn.addEventListener('click', addingPeople);
window.addEventListener('click', deletePerson);
displayPeople(myPeople);
container.addEventListener('itemsUpdated', mirrorLocalStorage);
storeFromLocalStorage();

fetchPeople();