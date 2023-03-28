'use strict'

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const omnitalk = new Omnitalk("SERVICE ID를 입력하세요","SERVICE KEY를 입력하세요");

omnitalk.onmessage = async (evt) => {
	const log = document.querySelector("#log");
	log.insertAdjacentHTML('beforeend', `<p>${evt.cmd}</p>`);

	switch (evt.cmd) {
		case "SESSION_EVENT":
			console.log(`Create session, ${evt.user_id}, ${evt.result}`);
			break;
		case "RINGING_EVENT":
			console.log("Ringing");
			

			// In this sample, automatically answer call after 3 seconds
			setTimeout(async function(){
				let sessionId = await omnitalk.answerCall();
				console.log(sessionId);
			}, 1000*3);

			// In this sample, automatically close audio call after 30 seconds
			setTimeout(async function(){
				await omnitalk.leave();
			}, 1000*30);
			break;
		case "CONNECTED_EVENT":
			console.log("Connected");
			break;
		case "ONAIR_EVENT":
			if (evt.track_type == 1) console.log("Audio Enable");
			else if (evt.track_type == 2) console.log("Video Enable");
			break;
		case "LEAVE_EVENT":
			console.log("Disconnected");
			break;
	}
}

window.onload = function(){
	const regiBtn = document.querySelector("#regiBtn");
	const callBtn = document.querySelector("#callBtn");

	regiBtn.addEventListener("click", async function() {
		const regiNum = document.getElementById('regiNum').value;

		// start session. create web socket
		const session = await omnitalk.createSession(regiNum);
	});

	callBtn.addEventListener("click", async function() {
		const callNum = document.getElementById('callNum').value;

		// offer outgoing call
		// pair with answerCall()
		const offerCall = await omnitalk.offerCall("audiocall", callNum, false);
	});
}
