$(document).ready(() => {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const omnitalk = new Omnitalk(
    "SERVICE ID를 입력하세요",
    "SERVICE KEY를 입력하세요"
  );
  const audioInputSelect = document.querySelector("select#audioSource");
  const videoSelect = document.querySelector("select#videoSource");
  const selectors = [audioInputSelect, videoSelect];
  let sessionId;
  const callTimer = new Object();
  document.getElementById("ringbacktone").volume = 0.4;
  document.getElementById("ringtone").volume = 0.4;
  omnitalk.onmessage = async (evt) => {
    console.log(`Event Message: ${JSON.stringify(evt)}`);
    switch (evt.cmd) {
      case "RINGING_EVENT":
        $("#ringtone").trigger("play");
        $("#answerBtn").css("display", "inline-block");
        $("#answerBtn").attr("data-room_id", evt.room_id);
        $("#answerBtn").attr("data-pubidx", evt.publish_idx);
        $("#answerBtn").attr("data-caller", evt.caller);
        $("#peerNumber").html(evt.caller);
        $("#videoCallModal").modal("show");
        // Audio Device
        const deviceList = await omnitalk.getDeviceList();
        makeSelectOption(deviceList);
        startTimer();
        break;
      case "BROADCASTING_EVENT":
        omnitalk.subscribe(evt.publish_idx);
        break;
      case "CONNECTED_EVENT":
        $("#leaveBtn").css("display", "none");
        $("#ringbacktone").trigger("pause");
        $(".callState").html("connected");
        break;
      case "ONAIR_EVENT":
        break;
      case "REPORT_EVENT":
        break;
      case "LEAVE_EVENT":
      case "ERROR":
        const reason = evt.reason == undefined ? "disconnect" : evt.reason;
        clear(reason);
        break;
    }
  };

  $("#regBtn").click(async () => {
    regiFunc();
  });

  $("#regNum").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiFunc();
    }
  });

  async function regiFunc() {
    if (!$("#regNum").val()) {
      $(".reg-box").effect("shake");
      return;
    }

    const number = $("#regNum").val();
    if (sessionId == undefined) {
      const session = await omnitalk.createSession(number);
      if (session.result == "success") sessionId = session.session;
      else console.error(session);
    }

    if (sessionId != undefined) {
      $("#regNum").css("font-weight", "bold");
      $("#regNum").attr("disabled", true);
      $("#callNum").attr("disabled", false);

      $("#callNum").focus();
      $(".caller .card")
        .removeClass("text-bg-success")
        .addClass("text-bg-light");
      $(".callee .card").removeClass("text-bg-light");
      // .addClass('text-bg-success');
      $("#regBtn").attr("disabled", true);
      $("#callBtn").attr("disabled", false);
    } else {
      $(".reg-box").effect("shake");
    }
  }

  function makeSelectOption(deviceList) {
    const values = selectors.map((select) => select.value);
    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });

    for (const i in deviceList.audioinput) {
      const deviceInfo = deviceList.audioinput[i];
      const option = document.createElement("option");
      option.value = i;
      option.text =
        deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    }

    for (const i in deviceList.videoinput) {
      const deviceInfo = deviceList.videoinput[i];
      const option = document.createElement("option");
      option.value = i;
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }

    selectors.forEach((select, selectorIndex) => {
      if (
        Array.prototype.slice
          .call(select.childNodes)
          .some((n) => n.value === values[selectorIndex])
      ) {
        select.value = values[selectorIndex];
      }
    });
  }

  $("#callBtn").click(async () => {
    // Audio Device
    const deviceList = await omnitalk.getDeviceList();
    makeSelectOption(deviceList);

    audioInputSelect.onchange = async () => {
      await omnitalk.setAudioDevice(audioInputSelect.value);
    };

    videoSelect.onchange = async () => {
      await omnitalk.setVideoDevice(videoSelect.value);
    };

    callFunc();
  });

  $("#callNum").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      callFunc();
    }
  });

  async function callFunc() {
    if (!$("#callNum").val()) {
      $(".call-box").effect("shake");
      return;
    }

    if ($("#regNum").val() === $("#callNum").val()) {
      $(".call-box").effect("shake");
      return;
    }

    $("#peerNumber").html($("#callNum").val());
    $("#videoCallModal").modal("show");

    await omnitalk.offerCall("videocall", $("#callNum").val(), true);
    $("#ringbacktone").trigger("play");
    startTimer();
  }

  $("#answerBtn").click(async () => {
    $("#ringtone").trigger("pause");
    $("#answerBtn").css("display", "none");

    await omnitalk.answerCall();
  });

  $("#hangupBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  $("#leaveBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  function clear(reason) {
    stopTimer();
    $("#ringbacktone").trigger("pause");
    $("#ringtone").trigger("pause");
    $(".callState").html(reason);
    $(".callState").effect("pulsate");
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }

  function twolength(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function dispTimer() {
    if (
      callTimer.sec == undefined ||
      callTimer.min == undefined ||
      callTimer.hour == undefined
    ) {
      callTimer.hour = 0;
      callTimer.min = 0;
      callTimer.sec = 0;
    }

    callTimer.sec++;
    if (callTimer.sec >= 60) {
      callTimer.min++;
      callTimer.sec = 0;
    }
    if (callTimer.min >= 60) {
      callTimer.hour++;
      callTimer.min = 0;
    }

    if (callTimer.hour)
      $(".callTimer").html(
        `<time datetime=''>${twolength(callTimer.hour)}:${twolength(
          callTimer.min
        )}:${twolength(callTimer.sec)}</time>`
      );
    else
      $(".callTimer").html(
        `<time datetime=''>${twolength(callTimer.min)}:${twolength(
          callTimer.sec
        )}</time>`
      );
  }

  function startTimer() {
    callTimer.hour = 0;
    callTimer.min = 0;
    callTimer.sec = 0;
    $(".callTimer").html("<time datetime=''>00:00</time>");
    callTimer.id = setInterval(() => {
      dispTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(callTimer.id);
  }
});
