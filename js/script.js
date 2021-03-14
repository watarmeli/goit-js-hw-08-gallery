import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image')
const closeBtnEl = document.querySelector('button[data-action="close-lightbox"]');

const galleryItemsMarkup = createGalleryItem(galleryItems);

gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup)
gallery.addEventListener('click', openModalClick);
closeBtnEl.addEventListener('click', closeModalClick)

function createGalleryItem(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
    `}).join('');
};

function openModalClick(evt) {
    evt.preventDefault()
    lightboxEl.classList.add('is-open');
    lightboxImgEl.setAttribute('src', evt.target.getAttribute('data-source'));
};

function closeModalClick(evt) {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.removeAttribute('src');
};


