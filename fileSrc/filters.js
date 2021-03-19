export const filterInputName = document.querySelector('#filter-name');
export const filterByMonthSelect = document.querySelector('#filter-month');


export const filterByName = (myPeople) => {
    if (filterInputName.value !== "") {
        myPeople = myPeople.filter(person => {
            const fullNameLowercase =
                person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
            return fullNameLowercase.includes(filterInputName.value.toLowerCase());
        });
    }
    return myPeople;
}

export const filterByMonth = (myPeople) => {
    if (filterByMonthSelect.value !== "empty") {
        myPeople = myPeople.filter(person => {
            let birthday = new Date(person.birthday);
            return birthday.getMonth() === Number(filterByMonthSelect.value);
        });
    }
    return myPeople;
}