$(() => {
    $.getJSON("http://ipinfo.io/req.headers['x-forwarded-for']", function (data) {
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
