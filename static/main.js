function prettyDuration(ms) {
	const totalSeconds = Math.floor(ms/1000);
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = Math.floor(totalSeconds % 60);
	return (
		(h < 10 ? "0" : "") + h + ":" +
		(m < 10 ? "0" : "") + m + ":" +
		(s < 10 ? "0" : "") + s
	);
}

function sendMessage(e) {
	e.preventDefault();
	const message = document.getElementById("message").value;
	document.getElementById("message-read").textContent = message;
}

function updateTimerValue() {
	const timer = document.getElementById("timer");
	const start = timer.dataset.start;
	if (!start) {
		// No timer running
		timer.innerText = prettyDuration(0);
		return;
	}
	const now = (new Date()).getTime();
	timer.innerText = prettyDuration(now - start);
}

function init() {
	document.getElementById("reset-timer").addEventListener("click", () => {
		timer.dataset.start = "";
		updateTimerValue();
	});
	document.getElementById("start-timer").addEventListener("click", () => {
		const timer = document.getElementById("timer");
		const start = timer.dataset.start;
		if (start) {
			// Timer is already running.  Do nothing.
			return;
		}
		timer.dataset.start = (new Date()).getTime();
	});
	timer.innerText = prettyDuration(0);
	setInterval(updateTimerValue, 1000);

	const cannedMessages = document.getElementById("canned-messages");
	cannedMessages.addEventListener("change", () => {
		document.getElementById("message").value = cannedMessages.value;
	});
	document.getElementById("clear-message").addEventListener("click", () => {
		document.getElementById("message").value = "";
	});

	document.getElementById("message-form").addEventListener("submit", sendMessage);
	document.getElementById("send-message").addEventListener("click", sendMessage);
}

