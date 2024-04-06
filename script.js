const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const parseBtn = document.getElementById("parse-btn");
const sampleBtn = document.getElementById("sample-btn");
const copyBtn = document.getElementById("copy-btn");
const sampleData = `{ "name": "John Doe", "age": 30, "city": "New York", "hobbies": ["reading", "hiking", "coding"] }`;
const url = `http://localhost:3000`;
//const url = `https://json-fixer.onrender.com`;

parseBtn.addEventListener("click", async () => {
	const data = inputText.value;
	try {
		const response = await fetch(`${url}/check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ payload: data }),
		});
		const result = await response.json();
		outputText.value = JSON.stringify(result, null, 4);
	} catch (error) {
		outputText.value = `Error: ${error.message}`;
	}
});

sampleBtn.addEventListener("click", async () => {
	const response = await fetch(`${url}/example`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.text();
	inputText.value = result;
});

copyBtn.addEventListener("click", () => {
	outputText.select();
	document.execCommand("copy");
	alert("Output text copied to clipboard!");
});
