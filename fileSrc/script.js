import { init } from './localStorage'

import { deletePerson } from './delete'
import { editPeople } from './edit'
import { addingPeople } from './add'
import { displayPeople } from './displayList'
import { filterInputName, filterByMonthSelect } from './variables'
import { hideScroll } from './utils'

let myPeople = init()

export const handleClick = (e) => {
  const deleteButton = e.target.closest('button.delete')
  if (deleteButton) {
    const idToDelete = deleteButton.dataset.id
    deletePerson(idToDelete, myPeople)
    hideScroll()
  }

  const editButton = e.target.closest('button.edit')
  if (editButton) {
    const idToEdit = editButton.dataset.id
    editPeople(idToEdit, myPeople)
    hideScroll()
  }

  const addButton = e.target.closest('button.add')
  if (addButton) {
    addingPeople(myPeople)
    hideScroll()
  }
}

document.body.addEventListener('click', handleClick)
filterInputName.addEventListener('input', () => displayPeople(myPeople))
filterByMonthSelect.addEventListener('change', () => displayPeople(myPeople))
