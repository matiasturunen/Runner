$(document).ready(() => {
  updateToplist();

  $('.userinfo').on('click', '#logoutbutton', evt => {
    evt.preventDefault();
    ajax('POST', { m: 'logout' }, res => {
      $('.userinfo').remove();
      $('#loginform').show();
    });
  });

  $('#loginform').on('submit', evt => {
    evt.preventDefault();
    ajax('POST', { 
      m: 'login',
      username: $('#input-username').val(),
      password: $('#input-password').val()
    }, res => {
      // refresh page to see new user info
      location.reload();

      // show php output
      $('#ajaxError').html(res);
    }, err => {
      console.log(err);
      $('#loginform').after('<div class="warning">' + err.statusText +'</div>');
      setTimeout(() => $('.warning').fadeOut(400), 5000); 
    });
  });

  $('#playername').on('submit', evt => evt.preventDefault());
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