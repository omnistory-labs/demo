$(document).ready(() => {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const omnitalk = new Omnitalk(
    "SERVICE ID를 입력하세요",
    "SERVICE KEY를 입력하세요"
  );
  let sessionId;
  const callTimer = new Object();

  omnitalk.onmessage = async (evt) => {
    console.log(`Event Message: ${JSON.stringify(evt)}`);
    switch (evt.cmd) {
      case "MAKE_EVENT":
        if (evt.result == "success") {
          $("#sipNum").attr("value", evt.number);
          $("#sipNum").css("font-weight", "bold");
          $("#sipNum").css("color", "white");
          $("#makeSipnumBtn").attr("disabled", true);
        } else {
          $(".reg-box").effect("shake");
        }
        break;
      case "RINGING_EVENT":
        $("#answerBtn").css("display", "block");
        $("#answerBtn").attr("data-pubidx", evt.publish_idx);
        $("#answerBtn").attr("data-caller", evt.caller);
        $("#peerNumber").html(evt.caller);
        $("#callModal").modal("show");
        startTimer();
        break;
      case "ONAIR_EVENT":
      case "CONNECTED_EVENT":
        $(".callState").html("connected");
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

  $(".callBtn").click(async function () {
    const num = $(this).data("num");
    $("#peerNumber").html(num);
    $("#callModal").modal("show");
    startTimer();

    const session = await omnitalk.createSession();
    const pubidx = await omnitalk.offerSipCall("audiocall", String(num), true);
    sessionId = session.session;
  });

  $("#answerBtn").click(async () => {
    $("#answerBtn").css("display", "none");

    omnitalk.answerCall();
  });

  $("#hangupBtn").click(async () => {
    clear("Hangup");
    omnitalk.leave(sessionId);
  });

  function clear(reason) {
    stopTimer();
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

  function get_sip_status() {
    const msg = new Object();
    msg.action = "SIP_STATUS_REQ";
    $.post("https://omnitalk.io/backend/testbed.php", msg, (data) => {
      const rsp = JSON.parse(data);
      rsp.lists.map((item, index) => {
        if (item.id.startsWith("1001^")) {
          $(".status1001").html("REGISTERED");
          $(".callBtn1001")
            .attr("disabled", false)
            .removeClass("btn-outline-secondary")
            .addClass("btn-success");
        } else if (item.id.startsWith("1002^")) {
          $(".status1002").html("REGISTERED");
          $(".callBtn1002")
            .attr("disabled", false)
            .removeClass("btn-outline-secondary")
            .addClass("btn-success");
        } else if (item.id.startsWith("1003^")) {
          $(".status1003").html("REGISTERED");
          $(".callBtn1003")
            .attr("disabled", false)
            .removeClass("btn-outline-secondary")
            .addClass("btn-success");
        } else if (item.id.startsWith("1004^")) {
          $(".status1004").html("REGISTERED");
          $(".callBtn1004")
            .attr("disabled", false)
            .removeClass("btn-outline-secondary")
            .addClass("btn-success");
        } else if (item.id.startsWith("1005^")) {
          $(".status1005").html("REGISTERED");
          $(".callBtn1005")
            .attr("disabled", false)
            .removeClass("btn-outline-secondary")
            .addClass("btn-success");
        }
      });
    });
  }

  function init_status() {
    $(".status1001").html("-");
    $(".status1002").html("-");
    $(".status1003").html("-");
    $(".status1004").html("-");
    $(".status1005").html("-");
    $(".callBtn1001")
      .attr("disabled", true)
      .removeClass("btn-success")
      .addClass("btn-outline-secondary");
    $(".callBtn1002")
      .attr("disabled", true)
      .removeClass("btn-success")
      .addClass("btn-outline-secondary");
    $(".callBtn1003")
      .attr("disabled", true)
      .removeClass("btn-success")
      .addClass("btn-outline-secondary");
    $(".callBtn1004")
      .attr("disabled", true)
      .removeClass("btn-success")
      .addClass("btn-outline-secondary");
    $(".callBtn1005")
      .attr("disabled", true)
      .removeClass("btn-success")
      .addClass("btn-outline-secondary");
  }

  get_sip_status();
  setInterval(() => {
    init_status();
    get_sip_status();
  }, 1000 * 10);
});
