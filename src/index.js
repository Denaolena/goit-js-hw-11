import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPictures from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

let page = 1;
let per_page = 40;

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-form_input');
const galleryEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
let query = null;

function renderGallery(images) {
  const galleryList = images
    .map(images => {
      return `<div class="photo-card">
  <a class="photo-card__link" href="${images.largeImageURL}" rel="noopener noreferrer">
  <img class="photo-card__img" src="${images.webformatURL}" alt="${images.tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${images.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${images.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${images.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${images.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', galleryList);
  simpleLightbox.refresh();
}

const simpleLightbox = new SimpleLightbox('.gallery a ', {
  captionsData: 'alt',
  captionDelay: 250,
});
const handleSubmit = async e => {
  e.preventDefault();
  page = 1;
  button.style.display = 'none';
  galleryEl.innerHTML = '';
  const elements = form.elements;
  query = elements.searchQuery.value;
  const images = await fetchPictures(query, page, per_page);

  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    // return false;
  }

  renderGallery(images.hits);
  button.style.display = 'block';
  page = page + 1;
};
form.addEventListener('submit', e => handleSubmit(e));

const handleClick = async e => {
  button.style.display = 'none';
  const images = await fetchPictures(query, page, per_page);
  renderImages(images.hits);
  button.style.display = 'block';

  page = page + 1;

  if ((page - 1) * per_page >= images.totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    button.style.display = 'none';
  }
};

button.addEventListener('click', handleClick);

// function smoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
