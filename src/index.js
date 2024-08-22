import CatList from './cat-api.js';

const selector = new CatList('.breed-select');
const display = new CatList('.cat-info');


const addCSS = css =>
  (document.head.appendChild(document.createElement('style')).innerHTML = css);

const fetchBreeds = () => {
  // Getting the cat list
  selector
    .getCats()
    .then(data => {
      if (data) {
        // Checking to see if there is any data
        document.querySelector('.loader').style.display='none'
        document.querySelector('.error').style.display = 'none';
      }
      const placeHolder = '<option value="" selected>Please select a cat</option>';
      selector.element.insertAdjacentHTML('afterbegin', placeHolder);
      data.forEach(cat => {
        // Adding data from axios to selector
        const { name, id } = cat;
        const breed = `<option class="option" value="${id}">${name}</option>`;
        selector.element.insertAdjacentHTML('beforeend', breed);
      });
    })
    .catch(err => console.error(err));
};

const fetchCatByBreed = id => {
  selector
    .getCatInfo(id)
    .then(data => {
      const [
        {
          url,
          breeds: [{ name, description, temperament }]
        }
      ] = data; // Destructuring data recived from axios
      const displayedCat = `<img src="${url}" alt="${name}" height="auto" width="500px"><div class="text-box">
        <h1 class="text"> ${name}</h1>
        <h2 class="text"> ${temperament}</h2>
        <p class="text"> ${description}</p></div>`;
      display.element.insertAdjacentHTML('afterbegin', displayedCat);
    })
    .catch(err => console.log(err));
};

const resetDisplay = () => (display.element.innerHTML = '');

fetchBreeds();
selector.element.addEventListener('change', e => {
  const selectedCat = e.currentTarget.value;
  resetDisplay();
  fetchCatByBreed(selectedCat);
});

addCSS('.breed-select{font-size:40px; font-family:Arial; text-align:center; color:charcoal; border-radius:5px}');
addCSS('.text{font-family:Arial; max-width:500px}');
addCSS('.cat-info {display:flex; justify-content:center; align-items:flex-end; gap:50px; margin-top:30px}');
addCSS('.text-box{display:flex; flex-flow:column; justify-content:flex-end;}')