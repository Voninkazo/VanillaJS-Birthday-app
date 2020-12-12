import { myPeople } from '../script.js';
import { container } from './variables.js';



/////////////////////// DISPLAY PEOPLE LIST//////////////////////////////////
// display people list
export async function displayPeople(e, filterByName) {
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
    // container.dispatchEvent(new CustomEvent('itemsUpdated'));
}