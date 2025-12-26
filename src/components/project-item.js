class ProjectItem extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['title', 'description'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.connectedCallback();
		}
	}

	connectedCallback() {
		const preview = this.getAttribute('preview');
		const icon = this.getAttribute('icon');
		const title = this.getAttribute('title');
		const description = this.getAttribute('description');
		const github = this.getAttribute('github');

		this.shadowRoot.innerHTML = `
            <style>
                article.project-item {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    gap: 28px;

                    img {
                        height: 150px;
                        width: 100%;
                        object-fit: cover;
                    }

                    .project-item__info {
                        display: flex;
                        gap: 28px;

                        img {
                            flex-shrink: 0;
                            width: 52px;
                            height: 52px;
                            object-fit: cover;
                        }

                        header {
                            h3 {
                                font-size: 20px;
                                font-weight: 600;
                            }

                            & > * {
                                padding: 0;
                                margin: 0;
                            }
                        }
                    }

                    a {
                        text-decoration: none;
                        font-weight: 600;
                        text-align: center;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 40px;
                        width: 100%;
                        background-color: var(--color-cta);

                        &:hover {
                            background-color: var(--color-cta-hover);
                        }
                    }
                }
            </style>

             <article class="project-item">
                <img src=${preview} alt="gif preview">
                <div class="project-item__info">
                    <img src=${icon} alt="icon/thumbnail website">
                    <header>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </header>
                </div>
                <a href=${github} aria-label="github button"><span>Source Github</span></a>
            </article>
        `;
	}
}

customElements.define('project-item', ProjectItem);
