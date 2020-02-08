'use strict';
{
  const { createAndAppend } = window.Util;
  class RepoView {
    constructor(container) {
      this.container = container;
    }
    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }
    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      console.log('RepoView', repo);
      while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild);
      }
      this.div = createAndAppend('div', this.container, { class: 'info' });
      createAndAppend('h5', this.div, { text: 'Repository:' + repo.name });
      createAndAppend('h5', this.div, {
        text: 'Description:' + repo.description,
      });
      createAndAppend('h5', this.div, { text: 'Forks:' + repo.forks });
      createAndAppend('h5', this.div, { text: 'Updated:' + repo.updated_at });
    }
  }
  window.RepoView = RepoView;
}
