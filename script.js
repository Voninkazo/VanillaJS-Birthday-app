import { addingPeople } from './fileSrc/add.js';
import { editPeople } from './fileSrc/edit.js';
import { deletePerson } from './fileSrc/delete.js';
import { displayPeople } from './fileSrc/displayList.js';
import { filterByMonth, filterPeople, resetFilter } from './fileSrc/filters.js';
// import { storeFromLocalStorage, mirrorLocalStorage } from './fileSrc/localStorage.js';

import { container, filterInputName, filterByMonthSelect, addBtn, buttonFilter } from './fileSrc/variables.js';


let myPeople = []; // mama array
export { myPeople }
///////////////////// FETCHING FUNCTION ///////////////////////////
// fetch data
const url = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json"
async function fetchPeople() {
    const response = await fetch(url);
    const data = await response.json();
    myPeople = [...data];
    console.log(myPeople)
    storeFromLocalStorage(myPeople);
    displayPeople(myPeople);
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
    return data;
}

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
        const response = await fetch(url);
        const data = await response.json();
        myPeople = [...data];
        displayPeople(myPeople);
    }
    container.dispatchEvent(new CustomEvent('itemsUpdated'));
}

buttonFilter.addEventListener('click', resetFilter);
window.addEventListener('click', editPeople);
filterByMonthSelect.addEventListener("input", filterByMonth)
filterInputName.addEventListener('keyup', filterPeople);
addBtn.addEventListener('click', addingPeople);
window.addEventListener('click', deletePerson);
displayPeople(myPeople);
container.addEventListener('itemsUpdated', mirrorLocalStorage);
storeFromLocalStorage();
fetchPeople();