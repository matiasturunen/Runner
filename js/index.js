'use strict';
$(document).ready(() => {
  updateToplist();
});

function updateToplist() {
  ajax('GET', { m: 'toplist' }, res => {
    console.log(res);
    resetToplist();
    createToplist(res.day, '24 hours', '24h', true);
    createToplist(res.month, 'Month', 'month');
    createToplist(res.all, 'All time', 'all');
  });
}

function resetToplist() {
  $('#toplist').html('');
  $('#toplistTabs').html('');
}

function createToplist(items, type, name, active=false) {
  const maxlen = 10;
  const tl = $('#toplist');
  // Create toplist and navtab for it
  let html = `<div class="tab-pane fade ${ active ? 'show active' : '' }" id="nav-${ name }" role="tabpanel" aria-labelledby="nav-tab-${ name }"><ol>`;
  html += `<h3>${type}</h3>`;
  for (let i = 0; i < items.length; i++) {
    html += `<li> ${items[i].username} - ${items[i].score}</li>`;
  }
  for (let i = items.length; i < maxlen; i++) {
    html += '<li>---</li>';
  }
  html += '</ol></div>';
  tl.append(html);

  $('#toplistTabs').append(`<a class="nav-item nav-link ${ active ? 'active' : '' }" id="nav-tab-${ name }" data-toggle="tab"
    href="#nav-${ name }" role="tab" aria-controls="nav-${ name }" aria-selected="${ active ? true : false }">
    ${ type }</a>`);
}

function ajax(m, d, s, f) {
  $.ajax('ajax.php', {
    method: m,
    data: d,
    success: s,
    error: f
  });
}