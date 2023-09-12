import SimpleLightbox from 'simplelightbox'; // Opisany w dokumentacji
import 'simplelightbox/dist/simple-lightbox.min.css'; // Dodatkowy import stylów

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

const galleryItemsHTML = galleryItems
  .map(
    item =>
      `<a class="gallery__item" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
</a>`
  )
  .join('');

galleryContainer.insertAdjacentHTML('beforeend', galleryItemsHTML);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // get the caption from given attribute
  captionPosition: 'bottom', // the position of the caption. Options are top, bottom or outside
  captionDelay: 250, // adds a delay before the caption shows (in ms)
});
