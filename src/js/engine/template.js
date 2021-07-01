function container() {
  const newContainer = document.createElement('div');
  newContainer.classList.add('wrapper');
  newContainer.innerHTML = `
  <div class="unit-container">
    <div class="container__header">
      <h2 class="widget-header">Новости мира кино</h2>
      <span class="link">Обновить</span>
    </div>
    <ul class="unit-list">
    </ul>
    <div class="container__footer">
    </div>
  </div>
    `;
  return newContainer;
}

function unit(data) {
  const { id = 'clear', header = '&nbsp;', logo = '' } = data;
  let { description = '' } = data;
  let img = '';
  let descrMarkup = `
  <span class="unit__descr-text">&nbsp;</span>
  <br>
  <span>&nbsp;</span>
  <br>
  <span class="unit__descr-text">&nbsp;</span>
  `;
  if (logo) {
    img = `<img src="${logo}" width="100%" height="100%"></img>`;
  }
  if (description) {
    if (description.length > 150) {
      description = description.substring(0, 150);
      description += '...';
    }
    descrMarkup = `
    <span class="unit__descr-text">${description}</span>
    `;
  }
  const newUnit = document.createElement('li');
  newUnit.classList.add('unit');
  newUnit.dataset.unitId = id;
  newUnit.innerHTML = `
      <div class="unit__header-block">
        <span class="unit__header-text">${header}</span>
      </div>
      <div class="unit__body">
        <div class="unit__img-block">${img}</div>
        <div class="unit__descr-block">
          ${descrMarkup}
        </div>
      </div>
  `;
  return newUnit;
}

function placeholder() {
  const placeHolder = document.createElement('div');
  const markup = `
  <li class="placeholder-unit">
    <div class="placeholder-unit__header-block">
      <span class="placeholder-unit__header-text placeholder-item">&nbsp</span>
    </div>
    <div class="placeholder-unit__body">
      <div class="placeholder-unit__img-block placeholder-item"></div>
      <div class="placeholder-unit__descr-block">
        <span class="placeholder-unit__descr-text placeholder-item">&nbsp;</span>
        <br>
        <span>&nbsp;</span>
        <br>
        <span class="placeholder-unit__descr-text placeholder-item">&nbsp;</span>
      </div>
    </div>
  </li>
  `;
  for (let i = 0; i < 3; i += 1) {
    placeHolder.innerHTML += markup;
  }
  return placeHolder;
}

export { container, unit, placeholder };
