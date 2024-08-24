import CatList from './cat-api.js';
import { Notify } from 'notiflix';

const selector = new CatList({
  selector: '.breed-select',
});
const display = new CatList({
  selector: '.cat-info',
});
const loader = new CatList({
  selector: '.cat-info__loader',
});

const catBox = new CatList({
  selectorL: '#box',
})

const fetchBreeds = () => {
  // Getting the cat list
  selector
    .getCats()
    .then(data => {
      if (data) {
        // Checking for data and handiling loader
        loader.hide();
      }
      const placeHolder =
        '<option value="" selected class="placeholder">Please select a cat</option>';
      selector.element.insertAdjacentHTML('afterbegin', placeHolder);
      data.forEach(cat => {
        // Adding data from axios to selector
        const { name, id } = cat;
        const breed = `<option class="option" value="${id}">${name}</option>`;
        selector.element.insertAdjacentHTML('beforeend', breed);
      });
    })
    .catch(() => Notify.failure('No cats here please reload the page'));
};

const removeCat = ()=> {
 console.log(display.element.innerHTML= ''); 
}

const fetchCatByBreed = id => {
  selector
    .getCatInfo(id)
    .then(data => {
      if(data){
        loader.hide();
      }
      const [
        {
          url,
          breeds: [{ name, description, temperament }],
        },
      ] = data; // Destructuring data recived from axios
      const displayedCat = `<img src="${url}" alt="${name}" height="auto" width="500px"><div class="text-box">
        <h1 class="text"> ${name}</h1>
        <h2 class="text"> ${temperament}</h2>
        <p class="text"> ${description}</p></div>`;
      display.element.insertAdjacentHTML('afterbegin', displayedCat);
    })
    .catch(() => Notify.failure('No cats here please reload the page'));
};


selector.element.addEventListener('change', e => {
  removeCat();
  loader.show();
  const selectedCat = e.currentTarget.value;
  if (document.querySelector('.placeholder')) {
    document.querySelector('.placeholder').remove();
  }
  fetchCatByBreed(selectedCat);
});
fetchBreeds();

