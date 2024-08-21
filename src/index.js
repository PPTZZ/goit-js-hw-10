import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const MY_URL = process.env.MY_URL;

axios.defaults.headers.common['x-api-key'] = API_KEY;

const breedSelector = document.querySelector('.breed-select');

axios
  .get(MY_URL)
  .then(res => {
      const { data } = res;
    if(data){
        document.querySelector('.loader').innerText = 'Please use the drop-down to select a cat';
        document.querySelector('.error').style.display = 'none'
    }
    data.forEach(cat => {
      const { name, id } = cat;
      const breed = `<option value=${id}>${name}</option>`;
      breedSelector.insertAdjacentHTML('beforeend', breed);
    });
  })
  .catch(err => err.log);



//   breedSelector.addEventListener('change', e => {
//     const selectedId = e.currentTarget.value;
//     const {image, name, temperament, description} = data.find(cat=>cat.id = selectedId);
//     console.log(name, image, temperament, description);
//    });