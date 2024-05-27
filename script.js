const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const parseBtn = document.getElementById("parse-btn");
const sampleBtn = document.getElementById("sample-btn");
const copyBtn = document.getElementById("copy-btn");
//const url = `http://localhost:3000`;
const url = `https://json-fixer.onrender.com`;

parseBtn.addEventListener("click", async () => {
	const data = inputText.value;

	// Check empty input
	if (data.length === 0) {
		outputText.value = `Please enter some JSON.`;
		return;
	}

	// Check payload size
	const payloadSize = new Blob([data]).size;
	const maxPayloadSize = 1024 * 1024; // 1MB

	if (payloadSize > maxPayloadSize) {
		outputText.value = `Payload Size is too large. Consider using API access.`;
		return;
	}

	try {
		const response = await fetch(`${url}/check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ payload: data }),
		});

		const result = await response.json();
		const aboveFlashMessage = document.getElementById(
			"above-flash-message"
		);

		if (
			result &&
			result[0] ===
				`Sorry, I couldn't parse this JSON. I'll try to fix this soon. Please let me know if this error persists.`
		) {
			aboveFlashMessage.innerHTML = ` Our Engine Couldn't parse it  :( Click <a href="https://forms.gle/AF7estQXmY82twRWA" target="_blank" class="text-blue-500 underline">here</a> to get access to our AI Parser.`;
			("The engine parser couldn't parse it, please upgrade to AI parser");
		} else {
			aboveFlashMessage.innerHTML = "";
		}
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
