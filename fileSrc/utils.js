import { isPast, addYears, setYear, isToday } from 'date-fns';
import wait from 'waait';


export function getNextBirthday(birthday) {
    const birthdayDate = new Date(birthday);
    const today = new Date();

    // we check when is their next birthday. we check the date with the same month and day as their birthday, and add this year.
    let nextBirthDay = setYear(birthdayDate, today.getFullYear());

    // if it's today, we return the value
    if (isToday(nextBirthDay)) {
        return nextBirthDay;
    }
    // if the date is already behind us, we add + 1 to the year
    if (isPast(nextBirthDay)) {
        nextBirthDay = addYears(nextBirthDay, 1);
    }
    return nextBirthDay;
}

// destroy popup
export async function destroyPopup(popup) {
    popup.classList.remove('open');
    // wait for 1 second, to let the animation do its work
    await wait(10);
    popup.remove();
    popup = null;
}