function ajax(m, d, s, f) {
  $.ajax('ajax.php', {
    method: m,
    data: d,
    success: s,
    error: f
  });
}

