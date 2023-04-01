import { LitElement, css, html } from 'lit'
import { when } from 'lit/directives/when.js';
import rLogo from './assets/RLogo.svg'

export class DoubleDisplay extends LitElement {

	static properties = {
		id: { type: String },
		results: { type: String }
	};

	constructor() {
		super()
		this.results = []
	}

	render() {
		return html`
		  ${this.label} <img src=${rLogo} width="48" height="48" style="float:right; margin-right:20px;"/>
		<div class="results-output" id="${this.id}-results">
		<code>${this.results.map(d => d.toFixed(2)).join(", ")}</code>
		</div>`
	}

	static styles = [
		css`
			:host {
				display: block;
			}
			:host div.results-output {
				color: var(--results-color);
				font-family: var(--results-font-family);
				color: var(--results-color);
			}
		`
	];

}

window.customElements.define('double-display', DoubleDisplay)
