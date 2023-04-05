$(document).ready(function () {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const omnitalk = new Omnitalk(
    "SERVICE ID를 입력하세요",
    "SERVICE KEY를 입력하세요"
  );
  let sessionId;
  let callTimer = new Object();
  document.getElementById("ringbacktone").volume = 0.4;
  document.getElementById("ringtone").volume = 0.4;
  omnitalk.onmessage = async (evt) => {
    console.log("Event Message: " + JSON.stringify(evt));
    switch (evt.cmd) {
      case "MAKE_EVENT":
        if (evt["result"] == "success") {
          $("#sipNum").attr("value", evt["number"]);
          $("#sipNum").css("font-weight", "bold");
          $("#sipNum").css("color", "white");
          $("#makeSipnumBtn").attr("disabled", true);
        } else {
          $(".reg-box").effect("shake");
        }
        break;
      case "RINGING_EVENT":
        $("#ringtone").trigger("play");
        $("#answerBtn").css("display", "block");
        $("#answerBtn").attr("data-pubidx", evt["publish_idx"]);
        $("#answerBtn").attr("data-caller", evt["caller"]);
        $("#peerNumber").html(evt["caller"]);
        $("#callModal").modal("show");
        startTimer();
        break;
      case "ONAIR_EVENT":
      case "CONNECTED_EVENT":
        $("#ringbacktone").trigger("pause");
        $(".callState").html("connected");
        break;
      case "BROADCASTING_EVENT":
        break;
      case "REPORT_EVENT":
        break;
      case "LEAVE_EVENT":
      case "ERROR":
        let reason = evt["reason"] == undefined ? "disconnect" : evt["reason"];
        clear(reason);
        break;
    }
  };

  $("#makeSipnumBtn").click(async function () {
    if (sessionId == undefined) {
      const session = await omnitalk.createSession();
      sessionId = session.session;
    }

    await omnitalk.makeSipnum();
  });

  $("#answerBtn").click(async function () {
    $("#ringtone").trigger("pause");
    $("#answerBtn").css("display", "none");

    omnitalk.answerCall();
  });

  $("#hangupBtn").click(async function () {
    clear("Hangup");
    omnitalk.leave(sessionId);
  });

  function clear(reason) {
    stopTimer();
    $("#ringbacktone").trigger("pause");
    $("#ringtone").trigger("pause");
    $(".callState").html(reason);
    $(".callState").effect("pulsate");
    setTimeout(function () {
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
        "<time datetime=''>" +
          twolength(callTimer.hour) +
          ":" +
          twolength(callTimer.min) +
          ":" +
          twolength(callTimer.sec) +
          "</time>"
      );
    else
      $(".callTimer").html(
        "<time datetime=''>" +
          twolength(callTimer.min) +
          ":" +
          twolength(callTimer.sec) +
          "</time>"
      );
  }

  function startTimer() {
    callTimer.hour = 0;
    callTimer.min = 0;
    callTimer.sec = 0;
    $(".callTimer").html("<time datetime=''>00:00</time>");
    callTimer.id = setInterval(function () {
      dispTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(callTimer.id);
  }
});
