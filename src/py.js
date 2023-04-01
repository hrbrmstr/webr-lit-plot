import * as pyodide from 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.mjs'

globalThis.webPy = await pyodide.loadPyodide({
	indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
	fullStdLib: true,
});

export let webPy = globalThis.webPy;

await webPy.loadPackage([ "micropip" ]);

export const micropip = webPy.pyimport("micropip");