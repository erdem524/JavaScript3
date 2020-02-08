'use strict';
{
  const { createAndAppend } = window.Util;
  class ContributorsView {
    constructor(container) {
      this.container = container;
    }
    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }
    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      console.log('ContributorsView', contributors);
      while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild);
      }
      contributors.forEach(contributor => {
        (this.div = createAndAppend('div', this.container, {
          class: 'contriDiv',
        })),
          createAndAppend('h5', this.div, { text: contributor.login }),
          createAndAppend('h4', this.div, { text: contributor.contributions }),
          createAndAppend('img', this.div, { src: contributor.avatar_url });
      });
    }
  }
  window.ContributorsView = ContributorsView;
}
