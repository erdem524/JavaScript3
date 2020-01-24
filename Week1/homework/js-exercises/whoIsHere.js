'use strict';
function a(url) {
  axios.get(url).then(data => console.log(data));
}
const u = 'https://www.randomuser.me/api';
a(u);

let getJSON = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = () => {
    let status = xhr.status;

    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };

  xhr.send();
};

getJSON('https://www.randomuser.me/api', (err, data) => {
  if (err != null) {
    console.error(err);
  } else {
    console.log(data);
  }
});
