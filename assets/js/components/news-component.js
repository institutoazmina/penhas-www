class NewsComponent extends HTMLElement {
  async connectedCallback() {
    this.removeAttribute('hidden');
    this.renderLoading();
    try {
      const news = await this.fetchNews();
      if (Array.isArray(news) && news.length > 0) {
        this.renderNews(news);
      } else {
        this.renderNoNews();
      }
    } catch (error) {
      this.renderError();
    }
  }

  async fetchNews() {
    try {
      const response = await fetch(
        'https://azmina.com.br/wp-json/az_mina/posts?type=az_coluna_article&az_coluna=2115&offset=6&per_page=6'
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to load news. Please try again later.');
    }
  }

  renderLoading() {
    this.innerHTML = `
      <div>
        <p>Carregando...</p>
      </div>
    `;
  }

  renderNews(news) {
    this.innerHTML = `
      <div>
        ${news.map(singleNews => `
          <a
            href="${singleNews.link}"
            target="_blank"
          >
            <article>
              <time datetime="${singleNews.iso_date}">
                ${singleNews.post_date}
              </time>
              <h3>${singleNews.title}</h3>
              <p>${singleNews.excerpt}</p>
            </article>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderNoNews() {
    this.innerHTML = `
      <div>
        <p>Nenhuma notícia disponível no momento.</p>
      </div>
    `;
  }

  renderError() {
    this.innerHTML = `
      <div>
        <p>Erro ao carregar as notícias, tente recarregar a página ou tente novamente mais tarde.</p>
      </div>
    `;
  }
}

customElements.define('news-component', NewsComponent);
