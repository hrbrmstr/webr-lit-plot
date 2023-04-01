import { LitElement, css, html } from 'lit'
import { when } from 'lit/directives/when.js';

const inspect = false

export class OBSShorthandPlot extends LitElement {

	static properties = {
		id: { type: String },
		chartTitle: { type: String },
		chart: { type: Object },
		style: { type: Object }
	};

	constructor() {

		super()

		// pesky Plot SVG background compensation
		const style = getComputedStyle(document.documentElement);
		const foreground = style.getPropertyValue('--foreground-color');
		const background = style.getPropertyValue('--background-color');

		const baseStyle = {
			backgroundColor: background,
			color: foreground
		}

		this.chart = null
		this.style = baseStyle

		this.addEventListener('chartUpdated', (e) => {
			inspect && console.log("connectedCallback event listener")
			this.chartTitle = e.detail.value.chartTitle;
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
			<h3>${this.chartTitle}</h3>
			${this.chart.plot({ style: this.style })}
			<slot></slot>
			</div>`
		)

	}

	async connectedCallback() {

		super.connectedCallback();
		inspect && console.log("connectedCallback")

		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
		prefersDarkMode.addEventListener('change', this.updateColorScheme.bind(this));

	}

	updateColorScheme(event) {
		// Update the "dark" attribute of the host element based on the user's preferred color scheme
		if (event.matches) {
			this.setAttribute('dark', '');
		} else {
			this.removeAttribute('dark');
		}
	}


	performUpdate() {

		super.performUpdate();

		const options = {
			detail: {
				value: {
					chartTitle: this.chartTitle,
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
				background: var(--light-plot-background)
			}
			:host[dark] svg {
				background: var(--dark-plot-background)
			}
		`
	];

}

window.customElements.define('ojs-shorthand-plot', OBSShorthandPlot)
