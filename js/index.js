$(document).ready(() => {
  updateToplist();
});

function updateToplist() {
  ajax('GET', { m: 'toplist' }, res => $('#toplist').html(res));
}

function ajax(m, d, s, f) {
  $.ajax('ajax.php', {
    method: m,
    data: d,
    success: s,
    error: f
  });
}