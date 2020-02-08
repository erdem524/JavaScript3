'use strict';
async function fetchJson(url) {
  let response = await axios.get(url);
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // why this if statement does not work?
    if (response.status === 404) {
      const err = document.createElement('div');
      document.getElementById('root').appendChild(err);
      err.innerText = 'somemething went wrong';
    }
  }
}
{
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

  function contributorDetail(url) {
    const select = document.createElement('select');
    //fetch 2
    fetchJson(
      'https://api.github.com/orgs/HackYourFuture/repos?per_page=100',
    ).then(data => {
      const byName = data;
      byName.sort((curRepo, nextRepo) =>
        curRepo.name.localeCompare(nextRepo.name),
      );
      byName.forEach((repo, index) => {
        let opt = document.createElement('option');
        opt.value = index;
        opt.innerText = repo.name;
        select.appendChild(opt);
      });
      select.addEventListener('change', () => {
        const repo = document.getElementById('repository');
        const contri = document.getElementById('contributor');
        console.log('event listener called');
        while (repo.hasChildNodes()) {
          repo.removeChild(repo.lastChild);
        }
        while (contri.hasChildNodes()) {
          contri.removeChild(contri.lastChild);
        }
        fetchJson(
          `https://api.github.com/repos/HackYourFuture/${
            byName[select.value].name
          }/contributors`,
        ).then(byName => {
          byName.forEach(user => {
            const contriDiv = document.createElement('div');
            contriDiv.setAttribute('class', 'contriDiv');
            const h5 = document.createElement('h5');
            const h4 = document.createElement('h4');
            const img = document.createElement('img');
            h5.innerText = user.login;
            h4.innerText = user.contributions;
            img.setAttribute('src', user.avatar_url);
            img.width = '100';
            contriDiv.appendChild(img);
            contriDiv.appendChild(h5);
            contriDiv.appendChild(h4);
            contri.appendChild(contriDiv);
          });
        });
        const ul = createAndAppend('ul', repo);
        repoDetails(byName[select.value], ul);
      });
    });
    const x = document.getElementById('dropdown');
    x.appendChild(select);
    const con = document.getElementById('contributor');
    while (con.hasChildNodes()) {
      con.removeChild(con.lastChild);
    }
    // con.appendChild(d);
  }
  function main(url) {
    contributorDetail(url);
  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
