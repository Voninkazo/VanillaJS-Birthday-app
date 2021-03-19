import { editPeoplePopup } from './edit';
import { displayPeople } from './displayList';
import { updateLocalStorage } from './localStorage';


///////////////////////// ADD A NEW PERSON /////////////////////////

export const addingPeople = async myPeople => {
    const newPerson = {};
    const result = await editPeoplePopup(newPerson);

    if (result) {
        result.id = Date.now().toString();
        result.picture = 'https://www.fillmurray.com/100/100';
        myPeople.push(result);
        displayPeople(myPeople);
        updateLocalStorage(myPeople);
    }
};