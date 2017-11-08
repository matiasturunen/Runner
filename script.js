$(document).ready(() => {
  updateToplist();
});

function updateToplist() {
  $.ajax('ajax.php', {
    method: 'GET',
    data: {
      m: 'toplist'
    },
    success: res => {
      $('#toplist').html(res);
    }
  });
}
