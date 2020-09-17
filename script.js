console.log('it works');

const people = './people.json';
const container = document.querySelector('tbody');
const parent = document.querySelector('body');
const form = document.querySelector('form');

// fetch data
async function fetchPeople() {
    const response = await fetch(`${people}`);
    const data = await response.json();
    // return data;
    let myPeople = [];
    myPeople.push(data)
    console.log(myPeople);

    function mirrorLocalStorage() {
        // const allPeople = await fetchPeople();
        console.info('Saving items to LS');
        localStorage.setItem('myPeople', JSON.stringify(myPeople));
    };

    function storeFromLocalStorage() {
        // const allPeople = await fetchPeople();
        const listItem = JSON.parse(localStorage.getItem('myPeople'));
        console.log(myPeople);
        // console.log(listItem);
        if (listItem) {
            console.log("mmmmm");
            myPeople = listItem;
            displayPeople(myPeople);
        }
        container.dispatchEvent(new CustomEvent('itemsUpdated'));

        // parent.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
    async function displayPeople() {
        // const allPeople = await fetchPeople();
        const sortedPeople = myPeople.sort((a, b) => a.birthday - b.birthday);
        // console.log(myPeople);
        const html = sortedPeople
            .map(people => {
                return `
        <tr data-id="${people.id}">
            <td class="image">
                <img src="${people.picture}" alt="photo">
            </td>
            <td class="name">
                ${people.lastName} ${people.firstName}<br>
                <span>Turn</span>
            </td>
            <td class="days-left">${people.birthday}</td>
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


    // destroy popup
    async function destroyPopup(popup) {
        popup.classList.remove('open');
        popup.remove();
        popup = null;
    }

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
            // const allPeople = await fetchPeople();
            const popup = document.createElement('form');
            let personToEdit = myPeople.find(peop => peop.id === idToEdit);
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
                <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}">
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
                // container.dispatchEvent(new CustomEvent('itemsUpdated'));

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

    // delete a person
    const deletePerson = e => {
        const iconDelete = e.target.closest('button.delete');
        if (iconDelete) {
            const tableRow = e.target.closest('tr');
            const idToDelete = tableRow.dataset.id;
            deletePersonPopup(idToDelete);
            console.log(idToDelete);
        }
        parent.dispatchEvent(new CustomEvent('itemsUpdated'));
    }

    // show delete popup and delete a specific person
    const deletePersonPopup = idToDelete => {
        return new Promise(async function(resolve) {
            // const allPeople = await fetchPeople();
            const popup = document.createElement('div');
            let personToDelte = myPeople.find(person => person.id === idToDelete);
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
                    myPeople = myPeople.filter(person => person.id !== idToDelete);
                    container.dispatchEvent(new CustomEvent('itemsUpdated'));
                    displayPeople();
                    destroyPopup(popup);
                }
                if (e.target.matches('.cancel')) {
                    destroyPopup(popup);
                }
            });
            // resolve promise
            resolve();
            parent.appendChild(popup);
            popup.classList.add('open');
        });
    }

    // for for a click on the icon delete
    window.addEventListener('click', deletePerson);
    displayPeople(myPeople);
    container.addEventListener('itemsUpdated', mirrorLocalStorage);
    storeFromLocalStorage();
}
fetchPeople();