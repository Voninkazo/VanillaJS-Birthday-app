import { myPeople } from '../script.js';
import { displayPeople } from './displayList.js';
import { filterByMonthSelect, filterInputName } from './variables.js';

export const filterPeople = (e) => {
    displayPeople(e, filterInputName.value);
}
export const resetFilter = e => {
    displayPeople();
    filterInputName.reset();
}

// ****** FILER BY MONTH **********

export const filterByMonth = () => {
    let selectedValue = filterByMonthSelect.value;
    console.log(selectedValue)
    const filteredByMonth = myPeople.filter(person => {
        let birthday = new Date(person.birthday);
        return birthday.getMonth() === Number(selectedValue);
    });
    console.log(filteredByMonth)
    myPeople = filteredByMonth
    return displayPeople(myPeople)
}