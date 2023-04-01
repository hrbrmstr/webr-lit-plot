import { LitElement, css, html } from 'lit'
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const inspect = false

export class OBSShorthandPlot extends LitElement {

	static properties = {
		id: { type: String },
		title: { type: String },
		chart: { type: Object },
		style: { type: Object }
	};

	constructor() {

		super()

		const style = getComputedStyle(document.documentElement);
		const foreground = style.getPropertyValue('--foreground-color');
		const background = style.getPropertyValue('--background-color');

		const baseStyle = {
			backgroundColor: background,
			color: foreground
		}

		this.title = ''
		this.chart = null
		this.style = baseStyle

		this.addEventListener('chartUpdated', (e) => {
			inspect && console.log("connectedCallback event listener")
			this.title = e.detail.value.title;
			this.chart = e.detail.value.chart;
			this.style = e.detail.value.style;
		});

	}

	render() {

		const style = getComputedStyle(document.documentElement);
		const foreground = style.getPropertyValue('--foreground-color');
		const background = style.getPropertyValue('--background-color');

		return when(this.chart === null,
			() => html`<div style="color: ${foreground}"><slot></slot></div>`,
			() => html`<div style="color: ${foreground}">
			<h3>${this.title}</h3>
			${this.chart.plot({ style: this.style })}
			<slot></slot>
			</div>`
		)

	}

	async connectedCallback() {

		super.connectedCallback();
		inspect && console.log("connectedCallback")

	}

	performUpdate() {

		super.performUpdate();

		const options = {
			detail: {
				value: {
					title: this.title,
					chart: this.chart,
					style: this.style
				}
			},
			bubbles: true,
			composed: true,
		};

		inspect && console.log("performUpdate dispatching event")
		this.dispatchEvent(new CustomEvent(`chartUpdated`, options));
		inspect && console.log("performUpdate event dispatched")

	}

	static styles = [
		css`
			:host {
				display: block;
			}
			:host svg {
				background: --background-color;
			}
		`
	];

}

window.customElements.define('ojs-shorthand-plot', OBSShorthandPlot)
