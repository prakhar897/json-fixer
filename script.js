const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const parseBtn = document.getElementById("parse-btn");
const sampleBtn = document.getElementById("sample-btn");
const copyBtn = document.getElementById("copy-btn");
//const url = `http://localhost:3000`;
const url = `https://json-fixer.onrender.com`;

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
		if (error.message === "Failed to fetch") {
			outputText.value = `Payload Size is too large. Consider using API access.`;
		} else {
			outputText.value = `Error: ${error.message}`;
		}
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

const popup = document.getElementById("popup");

copyBtn.addEventListener("click", () => {
	outputText.select();
	document.execCommand("copy");

	// Reset the popup position
	popup.classList.remove("translate-x-full");

	// Show the popup
	popup.classList.add("-translate-x-full");

	// Hide the popup after 1 second
	setTimeout(() => {
		popup.classList.remove("-translate-x-full");
		popup.classList.add("translate-x-full");
	}, 2000);
});
