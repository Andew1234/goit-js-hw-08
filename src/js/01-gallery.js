import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

galleryList.addEventListener('click', onGalleryListClick);

function createGalleryMarkup(pictures) {
  return pictures
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}

function onGalleryListClick(evt) {
  evt.preventDefault();

  const galleryItem = evt.target.closest('.gallery__item');
  if (!galleryItem) {
    return;
  }

  const image = galleryItem.querySelector('.gallery__image');
  const largeImageUrl = image.dataset.source;

  const pressEsc = event => {
    if (event.code === 'Escape') {
      instance.close();
    }
  };

  const instance = basicLightbox.create(`<img src="${largeImageUrl}">`, {
    onShow: instance => {
      document.addEventListener('keydown', pressEsc);
    },
    onClose: instance => {
      document.removeEventListener('keydown', pressEsc);
    },
  });

  instance.show();
}
