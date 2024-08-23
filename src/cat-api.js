import axios from 'axios';

const API_KEY = 'live_wNJpweNeziX3slnvZae47Wje0uZ6pLfqHHL3cRFFZICVCl0aShYNsGStRonHoK8R';
const ENDPOINT = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export default class CatList {
  constructor({ selector  }) {
    this.element = this.select(selector);
  }
  select(selector) {
    return document.querySelector(selector);
  }
  hide(){
    this.element.classList.add('hidden')
  }
  show(){
    this.element.classList.remove('hidden')
  }
  async getCats() {
    try {
      const { data } = await axios.get(`${ENDPOINT}/breeds`);
      return data;
    } catch (err) {
      return console.error(err);
    }
  }
  async getCatInfo(breedId) {
    try {
      const { data } = await axios.get(
        `${ENDPOINT}/images/search?breed_ids=${breedId}`
      );
      return data;
    } catch (err) {
      return console.error(err);
    }
  }
}
