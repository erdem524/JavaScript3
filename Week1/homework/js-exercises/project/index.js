'use strict';
{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
          function repoDetails(repo, ul) {
            const li = createAndAppend('li', ul);
            const table = createAndAppend('table', li);

            //tr-repository
            let tr = createAndAppend('tr', table);
            createAndAppend('th', tr, { text: 'Repository: ' });
            let td = createAndAppend('td', tr);
            createAndAppend('a', td, {
              href: repo.html_url,
              text: repo.name,
              target: '_blank',
            });

            //tr-description
            tr = createAndAppend('tr', table);
            createAndAppend('th', tr, { text: 'Description: ' });
            td = createAndAppend('td', tr, { text: repo.description });

            //tr-forks
            tr = createAndAppend('tr', table);
            createAndAppend('th', tr, { text: 'Forks: ' });
            td = createAndAppend('td', tr, { text: repo.forks });

            //tr-update
            tr = createAndAppend('tr', table);
            createAndAppend('th', tr, { text: 'Updated: ' });
            td = createAndAppend('td', tr, { text: repo.updated_at });
          }

  function main(url) {
  createAndAppend('header', root, { text: 'HYF Repositories' });
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      repos.sort((curRepo, nextRepo) => curRepo.name.localeCompare(nextRepo.name)) 
      repos.forEach(repo => repoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
    
  window.onload = () => main(HYF_REPOS_URL);
}
