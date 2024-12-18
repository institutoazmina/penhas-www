class NewsComponent extends HTMLElement {
  async connectedCallback() {
    const noticias = await this.fetchNoticias();
    this.renderNoticias(noticias);
  }

  async fetchNoticias() {
    const response = await fetch('https://azmina.com.br/wp-json/az_mina/posts?type=az_coluna_article&az_coluna=2115&offset=6&per_page=6');
    return response.json();
  }

  renderNoticias(news) {
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
}

customElements.define('news-component', NewsComponent);
