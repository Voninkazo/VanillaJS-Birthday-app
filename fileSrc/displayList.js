import {
    differenceInCalendarYears,
    differenceInCalendarDays,
    compareAsc,
} from 'date-fns';
import { getNextBirthday } from './utils';
import { deleteIcon, editIcon } from './svgs';

import { filterByName, filterByMonth } from './filters';
import { container } from './variables';

// DISPLAY PEOPLE FUNCTION

export function displayPeople(myPeople) {

    let sortedPeople = myPeople;
    sortedPeople = filterByName(sortedPeople);
    sortedPeople = filterByMonth(sortedPeople);

    // sort from soon birthday 
    sortedPeople.sort((a, b) => {
        let dayToBirthdayA = differenceInCalendarDays(getNextBirthday(a.birthday), new Date());
        let dayToBirthdayB = differenceInCalendarDays(getNextBirthday(b.birthday), new Date());
        return compareAsc(dayToBirthdayA, dayToBirthdayB);
    })

    let html = sortedPeople
        .map(person => {
                const birthdayDate = new Date(person.birthday);
                const today = new Date();
                const nextBirthday = getNextBirthday(birthdayDate);
                let daysToBirthday = differenceInCalendarDays(nextBirthday, today);

                let age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
                // dayOfbirth
                let dateOfBirth = new Date(person.birthday).getDate();
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
                const monthOfBirth = new Date(person.birthday).getMonth();
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

                return `
                        <tr data-id="${person.id}">
                            <td class="image">
                                <img src="${person.picture}" alt="photo">
                            </td>
                            <td class="name">
                                ${person.lastName} ${person.firstName}<br>
                            </td>
                            <td class="days-left">
                            ${daysToBirthday == 0
                            ? `She/He is ${differenceInCalendarYears(new Date(), birthdayDate) + 1}
                            </b> today`
                            :
                            `<span>Turn ${age + 1}  on the ${date} of ${month} </span>`
                        } </td>
                            <td>
                            ${daysToBirthday === 0 ? `🎂🎂🎂` : `🎂 in ${daysToBirthday} days`}
                            </td>
                            <td>
                                <button class="edit" data-id="${person.id}">
                                    ${editIcon}                    
                                </button>
                                <button class="delete" data-id="${person.id}">
                                    ${deleteIcon}                    
                                </button>
                            </td>
                        </tr>
                    `;
                }).join(' ');
                container.innerHTML = html;
}