/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import { unit, container, placeholder } from './template';

export default class Widget {
  constructor() {
    this.idSet = new Set();
    this.error = null;
  }

  init() {
    this.renderContainer();
    this.bindToDOM();
    this.defaultScreen();
    this.addListeners();
    this.getData();
    this.registerWorker();
  }

  registerWorker() {
    if (navigator.serviceWorker) {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register('./service.worker.js', { scope: './' });
          console.log('service worker registered');
        } catch (err) {
          console.log('service worker register error: ', err);
        }
      });
    }
  }

  renderContainer() {
    document.body.append(container());
  }

  bindToDOM() {
    this.wrapper = document.querySelector('div.wrapper');
    this.refresh = document.querySelector('span.link');
    this.unitList = document.querySelector('ul.unit-list');
    this.unitContainer = document.querySelector('.unit-container');
  }

  defaultScreen() {
    this.clearList();
    this.unitList.prepend(placeholder());
  }

  addUnit(element) {
    const newUnit = unit(element);
    this.unitList.prepend(newUnit);
  }

  addListeners() {
    this.refresh.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.defaultScreen();
        this.getData();
      },
      false
    );
  }

  clearList() {
    this.unitList.innerHTML = '';
  }

  async getData() {
    const baseURL = 'https://vapanov-sw.herokuapp.com/news';
    // const baseURL = 'http://localhost:3000/news';

    try {
      const request = await fetch(baseURL);
      const response = await request.json();
      if (response.status === 'ok') {
        this.unitContainer.classList.remove('unit-container-offline');
        this.clearList();
        response.news.forEach((element) => {
          this.addUnit(element);
        });
      }
      return true;
    } catch (err) {
      console.error(err);
    }

    this.widgetOffline();
    return false;
  }

  widgetOffline() {
    [...this.unitList.querySelectorAll('.placeholder-item')].forEach((element) =>
      element.classList.remove('placeholder-item')
    );
    this.unitContainer.classList.add('unit-container-offline');
  }
}
