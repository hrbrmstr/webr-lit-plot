import './status-message.js'
import './obs-shorthand-plot.js'
import './double-display.js'
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

let webrMessage = document.getElementById("webr-status");
webrMessage.text = ""

import './r.js'

webrMessage.text = "WebR Loaded!"

// the theme defaults to system dark/light mode so we do this to try to 
// ensure the plots are readable regardless of choice
const style = getComputedStyle(document.documentElement);
const foreground = style.getPropertyValue('--foreground-color');
const background = style.getPropertyValue('--background-color');

// identify all the plot components
const chart1 = document.querySelector('#c1');
const chart2 = document.querySelector('#c2');
const chart3 = document.querySelector('#c3');
const chart4 = document.querySelector('#c4');
const chart5 = document.querySelector('#c5');
const chart6 = document.querySelector('#c6');
const chart7 = document.querySelector('#c7');
const chart8 = document.querySelector('#c8');

// setup some different colors
chart2.style = { backgroundColor: background, color: "#3a579a" }
chart3.style = { backgroundColor: background, color: "#7e2453" }
chart4.style = { backgroundColor: background, color: "#008751" }
chart5.style = { backgroundColor: background, color: "#ff004d" }
chart6.style = { backgroundColor: background, color: "#5f574e" }
chart7.style = { backgroundColor: background, color: "#c2c3c7" }
chart8.style = { backgroundColor: background, color: "#ffa300" }

// find our number output areas\
const doubleRes = document.querySelector('#r-doublres');

// we'll let R make the dates for us, mostly
const rDates = await R`
seq.Date(as.Date("2018-01-02"), as.Date("2018-02-28"), "1 day") |> 
  as.character()
`
const dateArray = rDates.map(d => new Date(d))

// go rando!
async function randoCharts() {

	const numbers = await R`runif(40, 150, 180)`

	doubleRes.results = numbers

	chart1.chart = Plot.cellX(numbers)
	chart2.chart = Plot.boxX(numbers)
	chart3.chart = Plot.lineY(numbers)
	chart4.chart = Plot.areaY(numbers, {})
	chart5.chart = Plot.rectY(numbers)
	chart6.chart = Plot.dotX(numbers)

	const timeSeries = numbers.map((d, i) => {
		return [ dateArray[i], d ]
	})

	chart7.chart = Plot.line(timeSeries)
	chart8.chart = Plot.dot(timeSeries)

};

// just like 💎, this is forever
setInterval(randoCharts, 1000);
