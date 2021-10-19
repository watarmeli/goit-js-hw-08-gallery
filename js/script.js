import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');

const galleryItemsMarkup = createGalleryItem(galleryItems);
gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

gallery.addEventListener('click', openModalClick);
lightboxEl.addEventListener('click', closeModal);

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
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
    `;
    })
    .join('');
}

let currentIndex = 0;
const srcArray = galleryItems.map(src => src.original);

function addKeydownListener(evt) {
  closeModal(evt);
  imgSlide(evt);
}

function openModalClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();
  lightboxEl.classList.add('is-open');
  lightboxImgEl.setAttribute('src', evt.target.getAttribute('data-source'));
  currentIndex = srcArray.indexOf(lightboxImgEl.getAttribute('src'));
  window.addEventListener('keydown', addKeydownListener);
}

function closeModalClick() {
  lightboxEl.classList.remove('is-open');
  lightboxImgEl.removeAttribute('src');
  window.removeEventListener('keydown', addKeydownListener);
}

function closeModal(evt) {
  if (evt.target.classList.contains('lightbox__overlay')) {
    closeModalClick();
  }
  if (evt.target.classList.contains('lightbox__button')) {
    closeModalClick();
  }
  if (evt.code === 'Escape') {
    closeModalClick();
  }
}

function imgSlide(evt) {
  if (
    !lightboxEl.classList.contains('is-open') ||
    (evt.code !== 'ArrowLeft' && evt.code !== 'ArrowRight')
  ) {
    return;
  }
  if (evt.code === 'ArrowLeft') {
    if (currentIndex === 0) {
      return;
    }
    currentIndex -= 1;
    lightboxImgEl.setAttribute('src', srcArray[currentIndex]);
  }
  if (evt.code === 'ArrowRight') {
    if (currentIndex === srcArray.length - 1) {
      return;
    }
    currentIndex += 1;
    lightboxImgEl.setAttribute('src', srcArray[currentIndex]);
  }
}
