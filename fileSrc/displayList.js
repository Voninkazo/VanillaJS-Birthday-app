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
                            <ul class="list_container">
                                <li class="list_item">
                                    <img src="${person.picture}" alt="photo">
                                </li>
                                <li class="list_item">
                                    <span class="name">${person.lastName} ${person.firstName}</span>
                                    ${daysToBirthday == 0
                                        ? 
                                   `<span class="birthday">
                                        She/He is <b>${differenceInCalendarYears(new Date(), birthdayDate) + 1}
                                        </b> today
                                        
                                    </span>`
                                    :
                                    `<span class="birthday">Turns <b>${age + 1}</b>  on the ${date} of ${month} </span>`
                               } 
                               </li>
                                <li class="list_item">
                                    <span class="future_birthday">${daysToBirthday === 0 ? `🎂🎂🎂` : `<b>in ${daysToBirthday} days</b>`}</span>
                                    <ul class="button_container">
                                        <li>
                                            <button class="edit" data-id="${person.id}">
                                                ${editIcon}                    
                                            </button>
                                        </li>
                                        <li>
                                            <button class="delete" data-id="${person.id}">
                                                ${deleteIcon}                    
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                    `;
                }).join(' ');
                container.innerHTML = html;
}