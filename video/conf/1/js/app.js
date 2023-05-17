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

  omnitalk.onmessage = async (evt) => {
    console.log(`Event Message: ${JSON.stringify(evt)}`);
    switch (evt.cmd) {
      case "MAKE_EVENT":
        break;
      case "RINGING_EVENT":
        break;
      case "BROADCASTING_EVENT":
        console.log(`subscribe ${evt.publish_idx}`);
        omnitalk.subscribe(evt.publish_idx);
        break;
      case "CONNECTED_EVENT":
        break;
      case "ONAIR_EVENT":
        break;
      case "REPORT_EVENT":
        break;
      case "LEAVE_EVENT":
      case "ERROR":
        break;
    }
  };

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
      // option.value = deviceInfo["deviceId"];
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

  audioInputSelect.onchange = async () => {
    await omnitalk.setAudioDevice(audioInputSelect.value);
  };

  videoSelect.onchange = async () => {
    await omnitalk.setVideoDevice(videoSelect.value);
  };

  $("#regRoomBtn").click(async () => {
    console.log("clicked");
    regiRoomFunc();
  });

  $("#title").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiRoomFunc();
    }
  });

  $("#secret").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiRoomFunc();
    }
  });

  async function regiRoomFunc() {
    if (!$("#title").val()) {
      $(".reg-box").effect("shake");
      return;
    }

    $("#regRoomBtn").html(
      '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true""></span>'
    );
    $("#regRoomBtn").attr("id", "");
    $("#title").attr("disabled", true);
    $("#secret").attr("disabled", true);

    const startTime = getCurrentTimestamp();
    const endTime = getCurrentTimestamp() + 60 * 60 * 1;
    await omnitalk.createRoom(
      "videoroom",
      $("#title").val(),
      $("#secret").val(),
      startTime,
      endTime
    );

    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }

  $("#hangupBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  function clear(reason) {
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }

  function time2str(t) {
    const date = new Date(t * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`;
    const day = `0${date.getDate()}`;
    const hour = `0${date.getHours()}`;
    const minute = `0${date.getMinutes()}`;
    const second = `0${date.getSeconds()}`;
    return `${month.substr(-2)}.${day.substr(-2)} ${hour.substr(
      -2
    )}:${minute.substr(-2)}`;
  }

  function getCurrentTimestamp() {
    const date = new Date();
    return Math.floor(date.getTime() / 1000);
  }

  $(document).on("click", ".JoinBtn", async function () {
    const index = $(this).data("index");
    const check = $(this).data("check");
    const roomId = $(this).data("room_id");
    const secretClass = `#secret-${index}`;

    if (check == true && $(secretClass).val() == undefined) {
      let room =
        '<div class="form-box reg-box secret-box" style="padding:5px;">';
      room += '<div class="box-input-wrap">';
      room += `<input style="margin-left:10px; margin-right:10px;" type="password" maxLength="6" placeholder="secret" id="secret-${index}">`;
      room += `<button type="button" class="btn button-default me-2 mb-2 JoinBtn" data-check=${check} data-index=${index} data-room_id=${roomId}>Join</Button>`;
      room += "</div>";
      room += "</div>";
      $(`.join-box-${index}`).html(room);
    } else {
      const join = await omnitalk.joinRoom(roomId, $(secretClass).val());
      if (join.result != "success") {
        $(secretClass).effect("shake");
      } else {
        $("#conferenceModal").modal("show");
        await omnitalk.publish("videocall", true);
        const partilist = await omnitalk.partiList(roomId);
        partilist.map((item, index) => {
          if (item.session != sessionId) {
            omnitalk.subscribe(item.publish_idx);
          }
        });

        // Audio Device
        const deviceList = await omnitalk.getDeviceList();
        makeSelectOption(deviceList);
      }
    }
  });

  const init = (async () => {
    const session = await omnitalk.createSession();
    sessionId = session.session;
    const roomlist = await omnitalk.roomList();
    roomlist.map((item, index) => {
      let roomType;
      if (item.sip_support == true) return;

      if (item.room_type == "videocall" || item.room_type == "videoroom") {
        roomType =
          '<i class="bi bi-person-workspace" style="font-size:1.0rem;margin-right:7px;"></i>';
        roomType +=
          '<i class="bi bi-camera-video" style="font-size:1.0rem;margin-right:7px;"></i>';
      } else {
        roomType =
          '<i class="bi bi-camera-video-off" style="font-size:1.0rem;margin-right:7px;"></i>';
      }

      if (item.secret) {
        roomType +=
          '<i class="bi bi-key" style="font-size:1.0rem;margin-right:7px;"></i>';
      }

      let room = "<div class='col'>";
      room += "<div class='card mb-3' style='max-width: 100%;'>";
      room += `<div class='card-header'>${item.subject}&nbsp;</div>`;
      room += "<div class='card-body text-secondary'>";

      room += '<ul class="list-group list-group-flush">';
      room += `<li class='list-group-item'>${time2str(
        item.start_date
      )} ~ ${time2str(item.end_date)}</p>`;
      room += `<li class='list-group-item'>${roomType}</p>`;
      room += `<li class='list-group-item'><i class="bi bi-people"style="font-size:1.0rem;margin-right:7px;"></i> ${item.count}</p>`;
      room += "</ul>";

      room += `<div class="join-box-${index}">`;
      room +=
        '<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="padding:6px;">';
      room += `<button type="button" class="btn button-default JoinBtn" data-check=${item.secret} data-index=${index} data-room_id=${item.room_id}>Join</button>`;
      room += "</div>";
      room += "</div>";

      room += "</div>";
      room += "</div>";
      room += "</div>";
      room += "</div>";
      $("#roomlist").prepend(room);
    });
  })();
});
