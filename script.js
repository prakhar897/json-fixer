const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const parseBtn = document.getElementById("parse-btn");
const sampleBtn = document.getElementById("sample-btn");
const copyBtn = document.getElementById("copy-btn");

const sampleData = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "hiking", "coding"]
}`;

const url = `http://localhost:3000/check`;
//const url = `https://json-fixer.onrender.com/check`;

parseBtn.addEventListener("click", () => {
	const data = inputText.value;
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ payload: data }),
	})
		.then((response) => response.json())
		.then((result) => {
			outputText.value = JSON.stringify(result, null, 4);
		})
		.catch((error) => {
			outputText.value = `Error: ${error.message}`;
		});
});

sampleBtn.addEventListener("click", () => {
	inputText.value = sampleData;
});

copyBtn.addEventListener("click", () => {
	outputText.select();
	document.execCommand("copy");
	alert("Output text copied to clipboard!");
});
