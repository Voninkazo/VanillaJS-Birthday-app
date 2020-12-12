// destroy popup
export async function destroyPopup(popup) {
    popup.classList.remove('open');
    popup.remove();
    popup = null;
}