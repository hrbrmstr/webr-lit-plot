---
{
  "title": "🧪 Experimenting With Observable Shorthand Plots, WebR, and Lit+Vite",
  "description": "Using data from R to drive a whole lotta plottin'",
  "og" : {
    "site_name": "WebR Exeriments",
    "url": "https://rud.is/w/webr-lit-plot",
    "description": "Using data from R to drive a whole lotta plottin'",
    "image": {
      "url": "https://rud.is/w/webr-lit-plot",
      "height": "1170",
      "width": "1932",
      "alt": "example"
    }
  },
  "twitter": {
    "site": "@hrbrmstr",
    "domain": "rud.is"
  },
	"extra_header_bits": [
		"<link rel='apple-touch-icon' sizes='180x180' href='./favicon/apple-touch-icon.png'/>",
		"<link rel='icon' type='image/png' sizes='32x32' href='./favicon/favicon-32x32.png'/>",
		"<link rel='icon' type='image/png' sizes='16x16' href='./favicon/favicon-16x16.png'/>",
		"<link rel='manifest' href='./favicon/site.webmanifest'/>",
		"<link href='./src/index.css' rel='stylesheet'/>",
		"<link href='./src/components.css' rel='stylesheet'/>",
		"<script type='module' src='./src/main.js'></script>"
	],
	"extra_body_bits": [
		"<!-- extra body bits -->"
	]
}
---
# 🧪 Experimenting With Observable Shorthand Plots, WebR, and Lit+Vite

<status-message id="webr-status" text="WebR Loading…"></status-message>

## Letting R Data Drive Many Observable Plots

Experiment parameters:

- Webr
- R template tag function
- Observable Plot (shorhand version)
- Lit (web components)
- Vite (for building)
- hrbrmstr's lame CSS skills

Some data, courtesy of a sad little R function that mangles the data from the the Observable Plot example:

<double-display id="r-doublres"></double-display>

<ojs-shorthand-plot chartTitle="CellX Mark" id="cellX"></ojs-shorthand-plot>

[Observable Plot](https://observablehq.com/collection/@observablehq/plot) specifications can be just as involved and complex as the most bespoke {ggplot2} plots in R. Observable Plot still has a bunch of catching up to do to {ggplot2}, but it's absolutely getting there.

Like {ggplot2}, Plot has sensible defaults for pretty much everything. And, like {ggplot2}, you can give a geom (`mark` in Observable/Vega land) some data, and it'll do it's thing.

Plot also has a [shorthand](https://observablehq.com/@observablehq/plot-shorthand) mode for a fair number of marks, which is the subject of today's experiment. We're riffing from that notebook, so you might want to look at it before continuing, or have it up while continuing.

The data above is just random data generated by R every second-ish. We're also letting R generate some dates for us that are used in the last two plots on this page. We make a _sort of_ `data.frame` with it as such:

```js
const rDates = await R`
seq.Date(as.Date("2018-01-02"), as.Date("2018-02-28"), "1 day") |> 
  as.character()
`
const dateArray = rDates.map(d => new Date(d))
…
const timeSeries = numbers.map((d, i) => {
  return [ dateArray[i], d ]
})
```

_(If you can't tell, I'm still far more comfortable in R than in JavaScript and will likely always be.)_

It looks like what you see [in this cell](https://observablehq.com/@observablehq/plot-shorthand?collection=@observablehq/plot#timeSeries).

If you "view source" on the HTML page, all you're going to see (apart from the color commentary and source code) is this (whitespace removed and one component moved for brevity/clarity):

```html
<ojs-shorthand-plot chartTitle="BoxX Mark"  id="boxX"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="LineY Mark" id="lineY"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="AreaY Mark" id="areaY"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="RectY Mark" id="rectY"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="DotX Mark"  id="dotX"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="Line Mark"  id="line"></ojs-shorthand-plot>
<ojs-shorthand-plot chartTitle="Dot Mark"   id="dot"></ojs-shorthand-plot>
```

[Lit] Web Components keep HTML source pretty tidy.

We started off with a [`CellX`](https://observablehq.com/@observablehq/plot-cell) mark because it's colorful and I wanted a chart right up front.

We fed it that array of 40 doubles, and you should have immediately noticed that the values were encoded as the cell *fill* color. The default quantitative color scheme in Plot is called *turbo*; higher values are reddish, and lower values blueish. In this simple example we're not changing that, mostly to show you get good defaults out of the box.

I don't need to repeat the hard work of the Observable folks, so the various `mark` encoding explanations in their notebook will suffice, save for the fact that I'm using random numbers and they used a static data set.

If you look in `main.js`, you'll see how short the calls to Plot are:

```js
cellXchart.chart = Plot.cellX(numbers)
boxXchart.chart  = Plot.boxX(numbers)
lineYchart.chart = Plot.lineY(numbers)
areaYchart.chart = Plot.areaY(numbers, {})
rectYchart.chart = Plot.rectY(numbers)
dotXchart.chart  = Plot.dotX(numbers)
```

Sure, I tweaked the colors a bit, but that's also not verbose:

```js
boxXchart.style = { backgroundColor: background, color: "#3a579a" }
```

I'll blather a bit further when you get to the two-dimensional charts.

<ojs-shorthand-plot chartTitle="BoxX Mark"  id="boxX"></ojs-shorthand-plot>

<ojs-shorthand-plot chartTitle="LineY Mark" id="lineY"></ojs-shorthand-plot>

<ojs-shorthand-plot chartTitle="AreaY Mark" id="areaY"></ojs-shorthand-plot>

<ojs-shorthand-plot chartTitle="RectY Mark" id="rectY"></ojs-shorthand-plot>

<ojs-shorthand-plot chartTitle="DotX Mark"  id="dotX"></ojs-shorthand-plot>

That `timeSeries` variable is fed into the Line and Dot mark plots. It's also really short:

```js
lineChart.chart = Plot.line(timeSeries)
dotChart.chart = Plot.dot(timeSeries)
```

<ojs-shorthand-plot chartTitle="Line Mark"  id="line"></ojs-shorthand-plot>

<ojs-shorthand-plot chartTitle="Dot Mark"   id="dot"></ojs-shorthand-plot>

Notice how it handles the date scale on the X axis. You can [read more about that](https://observablehq.com/@observablehq/plot-shorthand#cell-478) in the original notebook.

## FIN

Each plot is reusing the `ojs-shorthand-plot` component defined in the semantically named `obs-shorthand-plot.js` file and they all use the same data randomly generated by WebR every second.

Note that we call the actual `.plot({…})` method in the component so it handles the rendering.

The component is really misnamed since you can use any OBS Plot in it, but I or you should do far more tweaking of it to ensure it will work for most cases.

Even if we get speedier {ggplot2} load times, I think it'd be good for R folks to take Observable Plot for a spin in JS-land, and consider leaning _heavily_ on it for displaying most fundamental charts.

Oh, and these "static" web pages [seem to do pretty well where Lighthouse is concerned](https://pagespeed.web.dev/analysis/https-rud-is-w-webr-lit-plot/4zg2reow30?form_factor=desktop).

You can find the source [on GitHub](https://github.com/hrbrmstr/webr-lit-plot).

<p style="text-align: center">Brought to you by @hrbrmstr</p>
