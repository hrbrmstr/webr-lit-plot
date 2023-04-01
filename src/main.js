import './status-message.js'
import './button-with-raw-results.js'

let webrMessage = document.getElementById("webr-status");
webrMessage.text = ""

import './r.js'

webrMessage.text = "WebR Loaded!"

// find the web component; assign the callback; enable the component
const rButton = document.querySelector('#r-button');
rButton.onClick = async () => {
	rButton.results = JSON.stringify(await R`sample(100, 5)`)
};
rButton.disabled = false


// for future use:
//
// let webPyMessage = document.getElementById("webpy-status");
// import * as Py from "./py.js"; 
// webPyMessage.text = "Pyodide Loaded!"