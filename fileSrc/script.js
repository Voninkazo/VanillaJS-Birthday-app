import { init } from './localStorage';

import { deletePerson } from './delete';
import { editPeople } from './edit';
import { addingPeople } from './add';
import { displayPeople } from './displayList';

import { filterInputName, filterByMonthSelect } from './variables';

let myPeople = init();

const body = document.body;

export function closeScroll() {
    body.style.overflow = "hidden";
}

export function showScroll() {
    body.style.overflow = "visible";
    console.log("Show");
}

export const handleClick = e => {
    const deleteButton = e.target.closest('button.delete');
    if (deleteButton) {
        const idToDelete = deleteButton.dataset.id;
        deletePerson(idToDelete, myPeople);
        closeScroll()
    }

    const editButton = e.target.closest('button.edit');
    if (editButton) {
        const idToEdit = editButton.dataset.id;
        editPeople(idToEdit, myPeople);
        closeScroll()
    }

    const addButton = e.target.closest('button.add');
    if (addButton) {
        addingPeople(myPeople);
        closeScroll()
    }
}

document.body.addEventListener('click', handleClick);
filterInputName.addEventListener('input', () => displayPeople(myPeople));
filterByMonthSelect.addEventListener('change', () => displayPeople(myPeople));