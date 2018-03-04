$(() => {
    $.getJSON("http://ipinfo.io", function (data) {
        sendToDB(data);
        alert(data);
      });
  });

const sendToDB = data => {
  console.log('region --->', data);
  $.ajax({
    url: '/authenticate/loc',
    method: 'POST',
    data: data,
  }).done(data => {
    console.log('success--->', data);
  });
};
