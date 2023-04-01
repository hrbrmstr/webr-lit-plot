import { LitElement, css, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import rLogo from './assets/RLogo.svg'
	
export class ButtonWithRawResults extends LitElement {

	static properties = {
		id: { type: String },
		label: { type: String },
		onClick: { type: Function },
		results: { type: String }
	};

	async _handleClick(e) {
		if (this.onClick) {
			await this.onClick(e)
		} 
	}

	constructor() {
		super()
		this.label = ''
		this.results = '&nbsp;'
		this.action = async (e) => { }
	}

	render() {
		return html`
		<button @click="${this._handleClick}" id="${this.id}">
		  ${this.label} <img src=${rLogo} width="24" height="24" style="padding-left:4px; float:right"/>
		</button>
		<div class="results-output" id="${this.id}-results">${unsafeHTML(this.results)}</div>
		`;
	}

	static styles = [
		css`
			:host {
				display: block;
			}
			:host button {
			  border-radius: 12px;
	      padding: 0.5rem;
				margin-bottom: 1rem;
				display: inline-flex;
        align-items: center; 
	      box-shadow: 0 12px 16px 0 rgba(var(--shadow-1), 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
			}
			:host div.results-output {
				color: var(--results-color);
				font-family: var(--results-font-family);
				color: var(--results-color);
			}
		`
	];

}

window.customElements.define('button-with-raw-results', ButtonWithRawResults)
