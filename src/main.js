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
const cellXchart = document.querySelector('#cellX');
const boxXchart = document.querySelector('#boxX');
const lineYchart = document.querySelector('#lineY');
const areaYchart = document.querySelector('#areaY');
const rectYchart = document.querySelector('#rectY');
const dotXchart = document.querySelector('#dotX');
const lineChart = document.querySelector('#line');
const dotChart = document.querySelector('#dot');

// setup some different colors
boxXchart.style = { backgroundColor: background, color: "#3a579a" }
lineYchart.style = { backgroundColor: background, color: "#7e2453" }
areaYchart.style = { backgroundColor: background, color: "#008751" }
rectYchart.style = { backgroundColor: background, color: "#ff004d" }
dotXchart.style = { backgroundColor: background, color: "#5f574e" }
lineChart.style = { backgroundColor: background, color: "#c2c3c7" }
dotChart.style = { backgroundColor: background, color: "#ffa300" }

// find our number output areas
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

	cellXchart.chart = Plot.cellX(numbers)
	boxXchart.chart = Plot.boxX(numbers)
	lineYchart.chart = Plot.lineY(numbers)
	areaYchart.chart = Plot.areaY(numbers, {})
	rectYchart.chart = Plot.rectY(numbers)
	dotXchart.chart = Plot.dotX(numbers)

	const timeSeries = numbers.map((d, i) => {
		return [ dateArray[i], d ]
	})

	lineChart.chart = Plot.line(timeSeries)
	dotChart.chart = Plot.dot(timeSeries)

};

// just like 💎, this is forever
setInterval(randoCharts, 1000);
