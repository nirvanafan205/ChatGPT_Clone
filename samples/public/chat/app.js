const OPENAI_KEY = "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";
const price = 0.0002/1000;

const messages = [];
let totalTokens = 0;

async function sendChat() {
	const prompt = document.querySelector("#prompt").value;
	document.querySelector("#prompt").value = "";
	document.querySelector("ul").innerHTML += `<li><b>${prompt}</b><li>`;

	// warning we are doing this client-side with a big security risk
	const data = {
		"model": "gpt-3.5-turbo",
		"messages": [
			{"role": "system", "content": "You are a computer answering questions"}, 
			{"role": "user", "content": prompt}
		]
	}

	const response = await fetch("https://api.openai.com/v1/chat/completions",
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${OPENAI_KEY}`
			},
			body: JSON.stringify(data)
		})

	const json = await response.json();
	const message = json.choices[0].message.content;
	document.querySelector("ul").innerHTML += `<li>${message}<li>`;

	document.querySelector("#prompt").value = "";
	document.querySelector("input").focus();
}
