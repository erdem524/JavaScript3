'use strict'
function a(url) {
  axios.get(url).then(data => console.log(data));
}
const u = 'https://xkcd.now.sh/?comic=614';
a(u);

let getJSON = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = () => {
    let status = xhr.status;

    if (status == 200) {
      callback(null, xhr.response);
      console.log(xhr.response);
      const img = document.createElement('img');
      document.body.appendChild(img);
      img.src = xhr.response.img;
      img.width = '300';
      img.height = '500';
      img.style.marginLeft = '20px';
    } else {
      callback(status);
    }
  };

  xhr.send();
};

getJSON('https://xkcd.now.sh/?comic=614', (err, data) => {
  if (err != null) {
    console.error(err);
  } else {
    console.log(data);
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.src = data.img;
    img.width = '300';
    img.height = '500';
  }
});
