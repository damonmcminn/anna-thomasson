const Tabletop = require('tabletop');
const SHEET_KEY = '1-aWs4bIKWIq2CeBKxIdjxCw4C6U-Tp6tA9YRuLliJPg';

function pastEvent(div) {
  const del = document.createElement('del');
  del.appendChild(div);
  return del;
}

function createEvent({ name, date, link, finished }) {
  const div = document.createElement('div');
  const text = `${date}, ${name}`;
  const classes = link ? ['row'] : ['row', 'text'];
  div.classList.add(...classes);

  if (link) {
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.innerHTML = text;
    div.appendChild(a);
  } else {
    div.innerHTML = text;
  }

  return finished ? pastEvent(div) : div;
}


function renderEvents(events, parent) {
  events.forEach(e => {
    parent.appendChild(createEvent(e));
  });
}

const annat = {
  renderEvents(selector) {
    const PARENT = document.querySelector(selector);

    Tabletop.init({
      key: SHEET_KEY,
      callback(models) {
        renderEvents(models.events.all(), PARENT);
      },
    });
  },
};

module.exports = annat;
