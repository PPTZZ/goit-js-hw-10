import 'dotenv/config';
import axios from 'axios';

const API_KEY = 'live_wNJpweNeziX3slnvZae47Wje0uZ6pLfqHHL3cRFFZICVCl0aShYNsGStRonHoK8R';
export const MY_URL = 'https://api.thecatapi.com/v1/breeds';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const breedSelector = document.querySelector('.breed-select');

export const fetchBreeds = (url) => {
  axios
    .get(url)
    .then(res => {
      const { data } = res;
      if (data) {
        document.querySelector('.loader').innerText =
          'Please use the drop-down to select a cat';
        document.querySelector('.error').style.display = 'none';
      }
      data.forEach(cat => {
        const { name, id } = cat;
        const breed = `<option value=${id}>${name}</option>`;
        breedSelector.insertAdjacentHTML('beforeend', breed);
      });
    })
    .catch(err => err.log);
};
//   breedSelector.addEventListener('change', e => {
//     const selectedId = e.currentTarget.value;
//     const {image, name, temperament, description} = data.find(cat=>cat.id = selectedId);
//     console.log(name, image, temperament, description);
//    });