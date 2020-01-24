'use strict';
const xBtn = document.getElementById('x');
const xPic = document.querySelector('#xPic');

// XML

function xDog() {
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      console.log(XHR.responseText);
      const result = JSON.parse(XHR.responseText);
      xPic.src = result.message;
    }
  };
  const url = 'https://dog.ceo/api/breeds/image/random';
  XHR.open('GET', url);
  XHR.send();
}

//  axios

const axiBtn = document.getElementById('axiBtn');
const axiPic = document.querySelector('#axiPic');

function Axios() {
  axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(data => {
      console.log(data);
      axiPic.setAttribute('src', data.data.message);
    })
    .catch(err => console.error(err));
}
