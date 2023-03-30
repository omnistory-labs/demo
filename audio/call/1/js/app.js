$(document).ready(async () => {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const omnitalk = new Omnitalk(
    "SERVICE ID를 입력하세요",
    "SERVICE KEY를 입력하세요"
  );
  let sessionId;
  const callTimer = new Object();

  document.getElementById("ringbacktone").volume = 0.4;
  document.getElementById("ringtone").volume = 0.4;

  omnitalk.onmessage = async (evt) => {
    console.log(`Event Message: ${JSON.stringify(evt)}`);
    switch (evt.cmd) {
      case "MAKE_EVENT":
        break;
      case "TRYING_EVENT":
        break;
      case "RINGING_EVENT":
        $("#ringtone").trigger("play");
        $("#answerBtn").css("display", "block");
        $("#answerBtn").attr("data-pubidx", evt.publish_idx);
        $("#answerBtn").attr("data-caller", evt.caller);
        $("#peerNumber").html(evt.caller);
        $("#callModal").modal("show");
        startTimer();
        break;
      case "CONNECTED_EVENT":
        $("#ringbacktone").trigger("pause");
        $(".callState").html("connected");
        break;
      case "ONAIR_EVENT":
        break;
      case "BROADCASTING_EVENT":
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
      if (session.result == "success") {
        sessionId = session.session;
      } else {
        $(".reg-box").effect("shake");
        console.error(session);
      }
    }

    if (sessionId != undefined) {
      $("#regNum").css("font-weight", "bold");
      $("#regNum").attr("disabled", true);
      $("#callNum").attr("disabled", false);

      $("#callNum").focus();
      $(".caller .card").removeClass("activated").addClass("deactivated");
      $(".callee .card").removeClass("deactivated").addClass("activated");
      $("#regBtn").attr("disabled", true);
      $("#callBtn").attr("disabled", false);
    } else {
      $(".reg-box").effect("shake");
    }
  }

  $("#callBtn").click(async () => {
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
    $("#callModal").modal("show");
    $("#ringbacktone").trigger("play");
    startTimer();

    await omnitalk.offerCall("audiocall", $("#callNum").val(), true);
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
