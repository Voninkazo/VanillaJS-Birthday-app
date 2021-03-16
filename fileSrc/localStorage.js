import people from '../people.json';
import { displayPeople } from './displayList';


//////////////////////  LOCAL STORAGE FUNCTIONS /////////////////////////////

// mirror from LS

export const init = () => {
    let myPeople = [];
    const stringFromLS = localStorage.getItem('myPeople');
    const lsItems = JSON.parse(stringFromLS);
    if (lsItems) {
        myPeople = lsItems;
    } else {
        myPeople = people;
    }

    displayPeople(myPeople);
    updateLocalStorage(myPeople);
    return myPeople;
}

export const updateLocalStorage = myPeople => {
    localStorage.setItem('myPeople', JSON.stringify(myPeople));
}