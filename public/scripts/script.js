$(() => {
    $.getJSON("http://ipinfo.io/?token=ca0bf2e0b0eeac", function (data) {
        sendToDB(data);
      });
  });

const sendToDB = data => {
  $.ajax({
    url: '/authenticate/loc',
    method: 'POST',
    data: data,
  }).done(data => {
  });
};
